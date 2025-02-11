import * as jwt from 'jsonwebtoken';

import { env, JwtResponseType, JwtSignatureEnum } from '../../commons';

export const jwtHandler = {
  async generate(payload: JwtResponseType, signature: JwtSignatureEnum): Promise<string | Error> {
    return new Promise<string | Error>((resolve, reject) => {
      const secret =
        signature === JwtSignatureEnum.ACCESS
          ? env.accessTokenSecretKey
          : env.refreshTokenSecretKey;
      const expiresIn =
        signature === JwtSignatureEnum.ACCESS
          ? env.accessTokenExpireTime
          : env.refreshTokenExpireTime;
      jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn }, (error, token) => {
        if (error) {
          return reject(error);
        }

        if (token) {
          return resolve(token);
        }
      });
    });
  },

  async certify(token: string, signature: JwtSignatureEnum): Promise<JwtResponseType | Error> {
    return new Promise<JwtResponseType | Error>((resolve, reject) => {
      const secret =
        signature === JwtSignatureEnum.ACCESS
          ? env.accessTokenSecretKey
          : env.refreshTokenSecretKey;
      jwt.verify(token, secret, { algorithms: ['HS256'] }, (error, decoded) => {
        if (error) {
          return reject(error);
        }

        if (decoded) {
          return resolve(decoded as JwtResponseType);
        }
      });
    });
  },

  async parse(token: string) {
    return new Promise<JwtResponseType>((resolve) => {
      const result = jwt.decode(token, { json: true, complete: true });
      return resolve(result as unknown as JwtResponseType);
    });
  },
};
