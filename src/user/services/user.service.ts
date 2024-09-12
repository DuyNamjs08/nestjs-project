import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositories';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly useRepository: UserRepository) {}
  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const userIndb = await this.useRepository.findByCondition({
      email: userDto.email,
    });
    if (userIndb) {
      throw new HttpException('User already exist ', HttpStatus.BAD_REQUEST);
    }
    return this.useRepository.create(userDto);
  }
  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.useRepository.findByCondition({
      email,
    });
    if (!user) {
      throw new HttpException('User not found ', HttpStatus.UNAUTHORIZED);
    }
    const is_equal = await bcrypt.compareSync(password, user.password);
    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async findByEmail(email) {
    return await this.useRepository.findByCondition({
      email,
    });
  }
}
