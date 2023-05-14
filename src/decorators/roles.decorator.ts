import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types/role';

export const Roles = (...roles: Role[]) => {
  console.log('rolesMetadata', roles);
  return SetMetadata('roles', roles);
};
