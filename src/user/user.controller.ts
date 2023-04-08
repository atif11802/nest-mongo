import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/custom.guard';
import Role from 'src/enum/role.enum';
import { Roles } from './roles.decorator';
import { Request } from 'express';

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

  @Post('hello')
  @Roles(Role.User, Role.Admin)
  async hello(@Req() req: Request) {
    // console.log(req.body);
    // console.log(req.user);
    return req.user;
  }

  // @Get(':id')
  // findOne(@Param() params): any {
  //   return this.userService.findById();
  // }
}
