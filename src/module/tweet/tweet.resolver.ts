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
import { Tweet, Retweet, Like, Comment } from '@src/entity';
import { Count } from '@common/count/count';
import { TweetService } from '@tweet/tweet.service';
import { CreateTweetDto } from '@tweet/dto/create-tweet.dto';
import { RetweetService } from '@retweet/retweet.service';
import { LikeService } from '@like/like.service';
import { CommentService } from '@comment/comment.service';
import { CountService } from '@common/count/count.service';

@Resolver((of) => Tweet)
export class TweetResolver {
  constructor(
    private tweetService: TweetService,
    private retweetService: RetweetService,
    private likeService: LikeService,
    private commentService: CommentService,
    private countService: CountService,
  ) {}

  // get tweets by users
  @Query((returns) => [Tweet])
  GetTweets() {
    return this.tweetService.getTweets();
  }

  // get tweet by user
  @Query((returns) => Tweet)
  GetTweet(@Args({ name: 'id', type: () => Int }) id: number) {
    const tweet = this.tweetService.getTweet(id);
    if (!tweet) throw new NotFoundException(id);
    return tweet;
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

  // get retweets on this tweet
  @ResolveField(() => [Retweet])
  GetRetweetsByTweet(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.retweetService.getRetweetsByTweet(id);
  }

  // get likes on this tweet
  @ResolveField(() => [Like])
  GetLikesByTweet(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.likeService.getLikesByTweet(id);
  }

  // get comments on this tweet
  @ResolveField(() => [Comment])
  GetCommentsByTweet(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.commentService.getCommentsByTweet(id);
  }

  // get like count on this tweet
  @ResolveField(() => Count)
  GetLikeCount(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.countService.getLikeCount(id);
  }

  // get retweet count on this tweet
  @ResolveField(() => Count)
  GetRetweetCount(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.countService.getRetweetCount(id);
  }

  // get comment count on this tweet
  @ResolveField(() => Count)
  GetCommentCount(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.countService.getCommentCount(id);
  }
}
