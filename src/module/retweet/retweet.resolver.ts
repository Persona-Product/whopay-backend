import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Retweet } from '@src/entity';
import { RetweetService } from '@retweet/retweet.service';
import { CreateRetweetDto } from '@retweet/dto/create-retweet.dto';

@Resolver((of) => Retweet)
export class RetweetResolver {
  constructor(private retweetService: RetweetService) {}

  // get retweets
  @Query((returns) => [Retweet])
  GetRetweets() {
    return this.retweetService.getRetweets();
  }

  // create retweet
  @Mutation((returns) => Retweet)
  CreateRetweet(@Args('retweetDto') createRetweetDto: CreateRetweetDto) {
    return this.retweetService.createRetweet(createRetweetDto);
  }

  // // delete retweet
  @Mutation((returns) => Boolean)
  DeleteRetweet(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.retweetService.deleteRetweet(id);
  }
}
