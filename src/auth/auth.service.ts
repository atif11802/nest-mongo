import { Injectable } from '@nestjs/common';
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
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(user: UserDto) {
    try {
      const existUser = await this.userModel.findOne({ email: user.email });

      if (existUser) {
        return {
          error: 'User already exists',
        };
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new this.userModel({
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
      return {
        message: error.message,
      };
    }
  }

  async login(user: UserDto) {
    try {
      const existUser = await this.userModel.findOne({ email: user.email });

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
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
