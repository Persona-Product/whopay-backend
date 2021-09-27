import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Tweet } from '@/tweet/entity/tweet.entity';
import { TweetService } from '@/tweet/tweet.service';
import { CreateTweetDto } from '@/tweet/dto/create-tweet.dto';
// import { UpdateTweetDto } from '@/tweet/dto/update-tweet.dto';

@Resolver((of) => Tweet)
export class TweetResolver {
  constructor(private tweetService: TweetService) {}

  // get all user, all tweet
  @Query((returns) => [Tweet])
  getAllTweet() {
    return this.tweetService.getAllTweet();
  }

  // get user, all tweet
  @Query((returns) => [Tweet])
  getUserTweet(@Args({ name: 'userId', type: () => String }) userId: string) {
    const tweet = this.tweetService.getUserTweet(userId);
    if (!tweet) {
      throw new NotFoundException(userId);
    }
    return tweet;
  }

  // get tweet
  @Query((returns) => Tweet)
  getOneTweet(@Args({ name: 'tweetId', type: () => String }) tweetId: string) {
    const tweet = this.tweetService.getOneTweet(tweetId);
    if (!tweet) {
      throw new NotFoundException(tweetId);
    }
    return tweet;
  }

  // create tweet
  @Mutation((returns) => Tweet)
  createTweet(@Args('tweetDto') createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }

  // delete tweet
  @Mutation((returns) => Boolean)
  deleteTweet(@Args({ name: 'tweetId', type: () => String }) tweetId: string) {
    return this.tweetService.deleteTweet(tweetId);
  }
}
