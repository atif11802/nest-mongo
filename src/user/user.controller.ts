import { Controller, Get, UseGuards, Param, SetMetadata } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/custom.guard';
import Role from 'src/enum/role.enum';
import { Roles } from './roles.decorator';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @Roles(Role.Admin)
  async me(@GetUser() user: any) {
    return user;
  }

  @Get('me*w')
  async getCombination() {
    return 'meow';
  }

  // @Get(':id')
  // findOne(@Param() params): any {
  //   return this.userService.findById();
  // }
}
