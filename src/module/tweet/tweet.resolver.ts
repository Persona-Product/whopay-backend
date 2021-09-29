import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Tweet, Like } from '@src/entity';
import { TweetService } from '@tweet/tweet.service';
import { CreateTweetDto } from '@tweet/dto/create-tweet.dto';
import { LikeService } from '@like/like.service';

@Resolver((of) => Tweet)
export class TweetResolver {
  constructor(
    private tweetService: TweetService,
    private likeService: LikeService,
  ) {}

  // get all user, all tweet
  @Query((returns) => [Tweet])
  GetAllTweet() {
    return this.tweetService.getAllTweet();
  }

  // get tweet
  @Query((returns) => Tweet)
  GetOneTweet(@Args({ name: 'id', type: () => Int }) id: number) {
    const tweet = this.tweetService.getOneTweet(id);
    if (!tweet) {
      throw new NotFoundException(id);
    }
    return tweet;
  }

  @ResolveField(() => [Like])
  GetTweetLike(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.likeService.getTweetLike(id);
  }

  // create tweet
  @Mutation((returns) => Tweet)
  CreateTweet(@Args('tweetDto') createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }

  // // delete tweet
  @Mutation((returns) => Boolean)
  DeleteTweet(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}
