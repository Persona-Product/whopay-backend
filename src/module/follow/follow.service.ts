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

  // get follow
  // async getFollow(id: number): Promise<Follow> {
  //   return await this.followRepostiory.findOne(id);
  // }

  // get follows
  // async getFollows(): Promise<Follow[]> {
  //   const data = await this.followRepostiory.find();
  //   return data;
  // }

  // get followings by user
  async getFollowingsByUser(id: string): Promise<Follow[]> {
    return await this.followRepostiory.find({
      userId: id,
    });
  }

  // get followers by user
  async getFollowersByUser(id: string): Promise<Follow[]> {
    return await this.followRepostiory.find({
      followingUserId: id,
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
