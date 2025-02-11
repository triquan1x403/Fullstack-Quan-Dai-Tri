import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { env, HashEnum } from '../../commons';

export const hashHandler = {
  async encrypt(plains: string, type: HashEnum): Promise<string> {
    let hashedPlains = '';

    if (type === HashEnum.PASSWORD) {
      const saltRound = env.bcryptSaltRound;
      const bcryptSalt = await bcrypt.genSalt(saltRound, 'a');
      hashedPlains = await bcrypt.hash(plains, bcryptSalt);
    } else {
      const key = crypto.scryptSync(env.cryptoSecretKey, 'salt', env.cryptoSecretKeyLength);

      const iv = crypto.randomBytes(env.cryptoIvLength);

      const cipher = crypto.createCipheriv(env.cryptoAlgorithm, key, iv);

      let encrypted = cipher.update(plains, 'utf8', 'base64');
      encrypted += cipher.final('base64');

      const result = Buffer.concat([iv, Buffer.from(encrypted, 'base64')]);

      hashedPlains = result.toString('base64url');
    }
    return hashedPlains;
  },

  async decrypt(hashes: string): Promise<string> {
    const encryptedBuffer = Buffer.from(hashes, 'base64url');

    const iv = encryptedBuffer.subarray(0, env.cryptoIvLength);
    const encryptedData = encryptedBuffer.subarray(env.cryptoIvLength);

    const key = crypto.scryptSync(env.cryptoSecretKey, 'salt', env.cryptoSecretKeyLength);

    const decipher = crypto.createDecipheriv(env.cryptoAlgorithm, key, iv);

    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  },

  async verify(hashes: string, plains: string, type: HashEnum) {
    let verifiedResult = false;
    if (type === HashEnum.PASSWORD) {
      verifiedResult = await bcrypt.compare(plains, hashes);
    } else {
      const decrypted = await this.decrypt(hashes);
      verifiedResult = decrypted === plains;
    }
    return verifiedResult;
  },
};
