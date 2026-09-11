import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';

import {
  CreateUserDto,
} from './dto/create-user.dto';

import {
  LoginDto,
} from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<User> {

    const existingUser =
      await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'El correo ya está registrado',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        createUserDto.password,
        10,
      );

    const user =
      this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

    return this.userRepository.save(user);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<User> {

    const user =
      await this.userRepository.findOne({
        where: {
          email: loginDto.email,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'Credenciales inválidas',
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );

    if (!passwordMatch) {
      throw new BadRequestException(
        'Credenciales inválidas',
      );
    }

    return user;
  }
}