import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { comparePassword, hashPassword } from 'src/utils/password-security';
import { IGenerateTokenProps, JwtPayload } from './interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { StatusResponse } from './interfaces/status-response.interface';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `Invalid email or password!`,
      );
    }
    const isPasswordEqual = await comparePassword({
      hashedPassword: user.password,
      password,
    });
    if (!isPasswordEqual) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `Invalid email or password!`,
      );
    }
    // generate and sign token
    const token = await this._generateToken(user);
    // generate refresh token
    const refreshToken = await this._generateRefreshToken(user);
    return {
      user: plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
      accessToken: token,
      refreshToken: refreshToken,
    };
  }
  async signUp(createUserDto: CreateUserDto): Promise<StatusResponse> {
    const { password, email } = createUserDto;
    const user = await this.userService.findOne({ email });
    if (user) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `User with email ${email} is exist`,
      );
    }
    const passwordHashed = await hashPassword(password);
    await this.userService.createUser({
      ...createUserDto,
      password: passwordHashed,
    });
    return {
      success: true,
      message: 'User created successfully',
    };
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `Email: ${email} is not found!`,
      );
    }
    const token = await this._generateToken(user, 900);
    await this.mailerService.sendEmail(
      email,
      'reset password',
      `your token gonna be expired in 15 minutes ${process.env.CLIENT_URL}/auth/reset-password?token=${token}`,
    );
    return {
      success: true,
      message: 'Link to change password is sent to your email, please check it',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
    const { token, newPassword } = resetPasswordDto;
    let data: any;
    try {
      data = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      }
      throw new UnprocessableEntityException('Invalid Token');
    }
    await this.userService.updatePassword(data.email, newPassword);
    return {
      success: true,
      message: 'Your password has been updated!',
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const { email } = payload;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw BaseHttpException.generateError(ErrorStatusEnums.UNAUTHORIZED);
    }
    return user;
  }

  async getAccessTokenFromRefreshToken(refreshToken: string) {
    const privateRefreshToken = process.env.JWT_TOKEN_REFRESH_SECRET;
    const data = this.jwtService.verify(refreshToken, {
      secret: privateRefreshToken,
    });
    const accessToken = await this._generateRefreshToken(data);
    return accessToken;
  }

  private async _generateToken(
    generateToken: IGenerateTokenProps,
    exp?: any,
  ): Promise<string> {
    const { email, id } = generateToken;
    const defaultExpiresIn = process.env.EXPIRESIN
      ? Number(process.env.EXPIRESIN)
      : 1800;
    const expiresIn = exp || defaultExpiresIn;
    const user: JwtPayload = { email, id };
    const accessToken = this.jwtService.sign(user, { expiresIn: expiresIn });
    return accessToken;
  }

  private async _generateRefreshToken(
    generateToken: IGenerateTokenProps,
  ): Promise<string> {
    const { email, id } = generateToken;
    const expiresIn = process.env.EXPIRESIN;
    const tokenRefreshSecret = process.env.JWT_TOKEN_REFRESH_SECRET;
    const options = {
      expiresIn: expiresIn || '7d',
      secret: tokenRefreshSecret,
    };
    const refreshToken = this.jwtService.sign({ email, id }, options);
    return refreshToken;
  }
}
