export interface IGenerateTokenProps {
  email: string;
  id: number;
}

export interface JwtPayload {
  exp?: number;
  email: string;
  id: number;
}
