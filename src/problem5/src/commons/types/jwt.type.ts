export type JwtResponseType = {
  id: string;
  name: string;
  role?: string;
  strategy?: string;
};

export enum JwtSignatureEnum {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
