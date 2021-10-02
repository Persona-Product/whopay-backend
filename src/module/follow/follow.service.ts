import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '@src/entity';
import { Count } from '@src/class';
import { CreateFollowDto } from '@follow/dto/create-follow.dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepostiory: Repository<Follow>,
  ) {}

  // get follow
  async getFollow(id: number): Promise<Follow> {
    return await this.followRepostiory.findOne(id);
  }

  // get follows
  async getFollows(): Promise<Follow[]> {
    const data = await this.followRepostiory.find();
    return data;
  }

  // get followers by user
  async getFollowserByUser(id: string): Promise<Follow[]> {
    return await this.followRepostiory.find({
      userId: id,
    });
  }

  // get followings by user
  async getFollowsingByUser(id: string): Promise<Follow[]> {
    return await this.followRepostiory.find({
      userId: id,
    });
  }

  // get following count on user
  async getFollowingCount(id: string): Promise<Count> {
    const db = this.followRepostiory.createQueryBuilder('follows');
    const query = db
      .select('count(follows.userId)')
      .where('follows.userId = :userId', { userId: id })
      .groupBy('follows.userId');
    const result = await query.getRawOne();
    if (!result) return { count: '0' };
    return result;
  }

  // get follow count on user
  async getFollowerCount(id: string): Promise<Count> {
    const db = this.followRepostiory.createQueryBuilder('follows');
    const query = db
      .select('count(follows.followingUserId)')
      .where('follows.followingUserId = :followingUserId', {
        followingUserId: id,
      })
      .groupBy('follows.followingUserId');
    const result = await query.getRawOne();
    if (!result) return { count: '0' };
    return result;
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
