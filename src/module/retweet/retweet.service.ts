import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Retweet } from '@src/entity';
import { CreateRetweetDto } from '@retweet/dto/create-retweet.dto';

@Injectable()
export class RetweetService {
  constructor(
    @InjectRepository(Retweet)
    private retweetRepostiory: Repository<Retweet>,
  ) {}

  // get retweet
  async getRetweet(id: number): Promise<Retweet> {
    return await this.retweetRepostiory.findOne(id);
  }

  // get retweets
  async getRetweets(): Promise<Retweet[]> {
    const data = await this.retweetRepostiory.find();
    return data;
  }

  // get retweets by user
  async getRetweetsByUser(id: string): Promise<Retweet[]> {
    return await this.retweetRepostiory.find({
      userId: id,
    });
  }

  // get retweets by tweet
  async getRetweetsByTweet(id: number): Promise<Retweet[]> {
    return await this.retweetRepostiory.find({
      tweetId: id,
    });
  }

  // create retweet
  async createRetweet(createRetweetDto: CreateRetweetDto): Promise<Retweet> {
    const retweet = await this.retweetRepostiory.create(createRetweetDto);
    await this.retweetRepostiory.save(retweet);
    return retweet;
  }

  // delete retweet
  async deleteRetweet(id: number): Promise<boolean> {
    const result = await this.retweetRepostiory.delete(id);
    return result.affected > 0;
  }
}
