import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  @Get('me')
  async me(@Req() req: any) {
    console.log(req.user);
    return {
      name: 'John Doe',
      email: '',
    };
  }
}
