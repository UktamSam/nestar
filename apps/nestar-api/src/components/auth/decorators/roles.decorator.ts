import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);   // Custom Decorator: SetMetadata'ni roles bilan boyitdik.
