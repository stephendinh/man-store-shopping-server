import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async viewUserDetail(@Param('id') id: string): Promise<any> {
    return this.userService.findOne({ id });
  }
}
