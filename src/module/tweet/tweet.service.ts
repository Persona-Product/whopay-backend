import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from '@src/entity';
import { CreateTweetDto } from '@tweet/dto/create-tweet.dto';

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
  async getOneTweet(id: number): Promise<Tweet> {
    return await this.tweetRepostiory.findOne(id);
  }

  // get tweet
  async getUserTweet(id: string): Promise<Tweet[]> {
    return await this.tweetRepostiory.find({
      userId: id,
    });
  }

  // create tweet
  async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const tweet = await this.tweetRepostiory.create(createTweetDto);
    await this.tweetRepostiory.save(tweet);
    return tweet;
  }

  // delete tweet
  async deleteTweet(id: number): Promise<boolean> {
    const result = await this.tweetRepostiory.delete(id);
    return result.affected > 0;
  }
}
