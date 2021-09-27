import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from '@/tweet/entity/tweet.entity';
import { CreateTweetDto } from '@/tweet/dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepostiory: Repository<Tweet>,
  ) {}

  // get all user, all tweet
  async getAllTweet(): Promise<Tweet[]> {
    const data = await this.tweetRepostiory.find();
    return data;
  }

  // get user, all tweet
  async getOneTweet(tweetId: string): Promise<Tweet> {
    return await this.tweetRepostiory.findOne(tweetId);
  }

  // get tweet
  async getUserTweet(userId: string): Promise<Tweet[]> {
    return await this.tweetRepostiory.find({
      userId: userId,
    });
  }

  // create tweet
  async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const tweet = await this.tweetRepostiory.create(createTweetDto);
    await this.tweetRepostiory.save(tweet);
    return tweet;
  }

  // delete tweet
  async deleteTweet(tweetId: string): Promise<boolean> {
    const result = await this.tweetRepostiory.delete(tweetId);
    return result.affected > 0;
  }
}
