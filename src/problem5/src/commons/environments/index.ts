import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const env = {
  appPort: Number(process.env.APP_PORT),
  appName: process.env.APP_NAME,
  appUrl: process.env.APP_URL,
  appSession: String(process.env.APP_SESSION),

  compressionLevel: Number(process.env.COMPRESSION_LEVEL),
  compressionThreshold: process.env.COMPRESSION_THRESHOLD,

  bcryptSaltRound: Number(process.env.BCRYPT_SALT_ROUND),
  cryptoSecretKeyLength: Number(process.env.CRYPTO_SECRET_KEY_LENGTH),
  cryptoSecretKey: String(process.env.CRYPTO_SECRET_KEY),
  cryptoIvLength: Number(process.env.CRYPTO_IV_LENGTH),
  cryptoAlgorithm: String(process.env.CRYPTO_ALGORITHM),

  postgresqlDatabase: process.env.POSTGRESQL_DATABASE,
  postgresqlUsername: process.env.POSTGRESQL_USERNAME,
  postgresqlPassword: process.env.POSTGRESQL_PASSWORD,
  postgresqlPort: Number(process.env.POSTGRESQL_PORT),

  accessTokenSecretKey: String(process.env.ACCESS_TOKEN_SECRET_KEY),
  accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME,
  refreshTokenSecretKey: String(process.env.REFRESH_TOKEN_SECRET_KEY),
  refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME,

  mailerEmail: String(process.env.MAILER_EMAIL),
  mailerPassword: String(process.env.MAILER_PASSWORD),

  googleClientId: String(process.env.GOOGLE_CLIENT_ID),
  googleClientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
  googleSignInUrl: String(process.env.GOOGLE_SIGN_IN_URL),
  googleCallbackUrl: String(process.env.GOOGLE_CALLBACK_URL),

  cloudinaryCloudName: String(process.env.CLOUDINARY_CLOUD_NAME),
  cloudinaryApiKey: String(process.env.CLOUDINARY_API_KEY),
  cloudinaryApiSecret: String(process.env.CLOUDINARY_API_SECRET),
  cloudinaryUploadedUrl: String(process.env.CLOUDINARY_UPLOADED_URL),
};
