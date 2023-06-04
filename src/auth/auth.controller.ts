import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ILoginResponse } from './interfaces/login-response.interface';
import { StatusResponse } from './interfaces/status-response.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //public
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<StatusResponse> {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPassword: ForgotPasswordDto,
  ): Promise<any> {
    const { email } = forgotPassword;
    await this.authService.forgotPassword(email);
    return {
      message: `The link was sent to your email: ${email}`,
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() params: ResetPasswordDto) {
    return this.authService.resetPassword(params);
  }

  @Post('refreshToken')
  async getAccessToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    const { refreshToken } = refreshTokenDto;
    const accessToken = await this.authService.getAccessTokenFromRefreshToken(
      refreshToken,
    );
    return {
      accessToken,
    };
  }
}
