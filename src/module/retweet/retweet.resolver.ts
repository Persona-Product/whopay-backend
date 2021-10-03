import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Retweet, User } from '@src/entity';
import { RetweetService } from '@retweet/retweet.service';
import { CreateRetweetDto } from '@retweet/dto/create-retweet.dto';
import { UserService } from '@user/user.service';

@Resolver((of) => Retweet)
export class RetweetResolver {
  constructor(
    private retweetService: RetweetService,
    private userService: UserService,
  ) {}

  // get retweets
  @Query(() => [Retweet])
  GetRetweets() {
    return this.retweetService.getRetweets();
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
}
