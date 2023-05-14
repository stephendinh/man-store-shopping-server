import { UserDto } from 'src/user/dto/user.dto';

export interface ILoginResponse {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
