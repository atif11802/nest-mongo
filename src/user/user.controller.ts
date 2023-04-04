import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
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
