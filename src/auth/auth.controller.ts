import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  signup(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }
}
