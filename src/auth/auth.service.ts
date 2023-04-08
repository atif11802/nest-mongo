import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/model/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private User: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(user: UserDto) {
    try {
      const existUser = await this.User.findOne({ email: user.email });

      if (existUser) {
        throw new HttpException('User already exist', HttpStatus.FORBIDDEN);
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new this.User({
        email: user.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      savedUser.password = undefined;

      return {
        message: 'User created successfully',
        accessToken: await this.generateToken(savedUser),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        error.status,
      );
    }
  }

  async login(user: UserDto) {
    try {
      const existUser = await this.User.findOne({ email: user.email });

      if (!existUser) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        user.password,
        existUser.password,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      existUser.password = undefined;

      return {
        message: 'User logged in successfully',
        accessToken: await this.generateToken(existUser),
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async generateToken(user: any) {
    const payload = { email: user.email, _id: user.id };

    const access_token = this.jwtService.sign(
      { ...payload, role: 'Admin' },
      {
        //expiresIn: 1 hour
        expiresIn: 3600,
        secret: this.config.get('JWT_SECRET'),
      },
    );
    return access_token;
  }
}
