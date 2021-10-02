import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Count } from '@common/count/count';
import { Retweet, Like, Comment, Follow } from '@src/entity';

@Injectable()
export class CountService {
  constructor(
    @InjectRepository(Retweet)
    private retweetRepostiory: Repository<Retweet>,
    @InjectRepository(Like)
    private likeRepostiory: Repository<Like>,
    @InjectRepository(Comment)
    private commentRepostiory: Repository<Comment>,
    @InjectRepository(Follow)
    private followRepostiory: Repository<Follow>,
  ) {}

  // get retweet count on tweet
  async getRetweetCount(id: number): Promise<Count> {
    const db = this.retweetRepostiory.createQueryBuilder('retweets');
    const query = db
      .select('count(retweets.tweetId)')
      .where('retweets.tweetId = :tweetId', { tweetId: id })
      .groupBy('retweets.tweetId');
    const result = await query.getRawOne();
    if (!result) return { count: '0' };
    return result;
  }

  // get like count on tweet
  async getLikeCount(id: number): Promise<Count> {
    const db = this.likeRepostiory.createQueryBuilder('likes');
    const query = db
      .select('count(likes.tweetId)')
      .where('likes.tweetId = :tweetId', { tweetId: id })
      .groupBy('likes.tweetId');
    const result = await query.getRawOne();
    if (!result) return { count: '0' };
    return result;
  }

  // get like count on tweet
  async getCommentCount(id: number): Promise<Count> {
    const db = this.commentRepostiory.createQueryBuilder('comments');
    const query = db
      .select('count(comments.tweetId)')
      .where('comments.tweetId = :tweetId', { tweetId: id })
      .groupBy('comments.tweetId');
    const result = await query.getRawOne();
    if (!result) return { count: '0' };
    return result;
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
}
