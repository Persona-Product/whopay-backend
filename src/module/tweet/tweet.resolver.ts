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
import { Count } from '@src/class';
import { TweetService } from '@tweet/tweet.service';
import { CreateTweetDto } from '@tweet/dto/create-tweet.dto';
import { RetweetService } from '@retweet/retweet.service';
import { LikeService } from '@like/like.service';
import { CommentService } from '@comment/comment.service';

@Resolver((of) => Tweet)
export class TweetResolver {
  constructor(
    private tweetService: TweetService,
    private retweetService: RetweetService,
    private likeService: LikeService,
    private commentService: CommentService,
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
    if (!tweet) throw new NotFoundException(id);
    return tweet;
  }

  @ResolveField(() => [Retweet])
  GetTweetRetweet(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.retweetService.getTweetRetweet(id);
  }

  @ResolveField(() => [Like])
  GetTweetLike(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.likeService.getTweetLike(id);
  }

  @ResolveField(() => [Comment])
  GetTweetComment(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.commentService.getTweetComment(id);
  }

  // get like count
  @ResolveField(() => Count)
  GetLikeCount(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.likeService.getLikeCount(id);
  }

  // get retweet count
  @ResolveField(() => Count)
  GetRetweetCount(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.retweetService.getRetweetCount(id);
  }

  // get retweet count
  @ResolveField(() => Count)
  GetCommentCount(@Parent() tweet: Tweet) {
    const { id } = tweet;
    return this.commentService.getCommentCount(id);
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
