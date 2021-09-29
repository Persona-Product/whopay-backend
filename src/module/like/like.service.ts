import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '@src/entity';
import { CreateLikeDto } from '@like/dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepostiory: Repository<Like>,
  ) {}

  // get all user, all like
  async getAllLike(): Promise<Like[]> {
    const data = await this.likeRepostiory.find();
    return data;
  }

  // get tweet
  async getUserLike(id: string): Promise<Like[]> {
    return await this.likeRepostiory.find({
      userId: id,
    });
  }

  // get tweet
  async getTweetLike(id: number): Promise<Like[]> {
    return await this.likeRepostiory.find({
      tweetId: id,
    });
  }

  // create like
  async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
    const like = await this.likeRepostiory.create(createLikeDto);
    await this.likeRepostiory.save(like);
    return like;
  }

  // delete like
  async deleteLike(id: number): Promise<boolean> {
    const result = await this.likeRepostiory.delete(id);
    return result.affected > 0;
  }
}
