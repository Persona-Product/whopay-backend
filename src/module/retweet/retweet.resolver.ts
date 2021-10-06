import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Retweet, User, Tweet } from '@src/entity';
import { RetweetService } from '@retweet/retweet.service';
import { CreateRetweetDto } from '@retweet/dto/create-retweet.dto';
import { UserService } from '@user/user.service';
import { TweetService } from '@tweet/tweet.service';

@Resolver((of) => Retweet)
export class RetweetResolver {
  constructor(
    private retweetService: RetweetService,
    private userService: UserService,
    private tweetService: TweetService,
  ) {}

  // get retweets
  // @Query(() => [Retweet])
  // GetRetweets() {
  //   return this.retweetService.getRetweets();
  // }

  // get retweets by user
  @Query(() => [Retweet])
  GetRetweetsByUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.retweetService.getRetweetsByUser(id);
  }

  // create retweet
  @Mutation(() => Retweet)
  CreateRetweet(@Args('retweetDto') createRetweetDto: CreateRetweetDto) {
    return this.retweetService.createRetweet(createRetweetDto);
  }

  // // delete retweet
  @Mutation(() => Boolean)
  DeleteRetweet(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.retweetService.deleteRetweet(id);
  }

  // get user by retweet
  @ResolveField(() => User)
  GetUserByRetweet(@Parent() retweet: Retweet) {
    const { userId } = retweet;
    return this.userService.getUser(userId);
  }

  // get tweet by retweet
  @ResolveField(() => Tweet)
  GetTweetByRetweet(@Parent() like: Retweet) {
    const { tweetId } = like;
    return this.tweetService.getTweet(tweetId);
  }
}
