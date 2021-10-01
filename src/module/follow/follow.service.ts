import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '@src/entity';
import { CreateFollowDto } from '@follow/dto/create-follow.dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepostiory: Repository<Follow>,
  ) {}

  // get all user, all follow
  async getAllFollow(): Promise<Follow[]> {
    const data = await this.followRepostiory.find();
    return data;
  }

  // get tweet
  async getUserFollow(id: string): Promise<Follow[]> {
    return await this.followRepostiory.find({
      userId: id,
    });
  }

  // create follow
  async createFollow(createFollowDto: CreateFollowDto): Promise<Follow> {
    const follow = await this.followRepostiory.create(createFollowDto);
    await this.followRepostiory.save(follow);
    return follow;
  }

  // delete follow
  async deleteFollow(id: number): Promise<boolean> {
    const result = await this.followRepostiory.delete(id);
    return result.affected > 0;
  }
}
