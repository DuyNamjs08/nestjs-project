import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base.repository';
import { User } from '../models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }
}
