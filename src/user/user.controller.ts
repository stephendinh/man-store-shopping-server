import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('filter')
  async filterUser(@Query() queryDto: any) {
    return this.userService.getAllUsers(queryDto);
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async viewUserDetail(@Param('id') id: string): Promise<any> {
    return this.userService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Post('address')
  async addUserAddress(
    @Req() req: any,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    const user = req.user as UserDto;
    return this.userService.addUserAddress(createUserAddressDto, user.id);
  }
}
