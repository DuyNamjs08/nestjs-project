import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../model/post.model';
import { BaseRepository } from 'src/base.repository';
import { Model } from 'mongoose';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {
    super(postModel);
  }
}
