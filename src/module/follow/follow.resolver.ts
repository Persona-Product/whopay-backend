import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Follow } from '@src/entity';
import { FollowService } from '@follow/follow.service';
import { CreateFollowDto } from '@follow/dto/create-follow.dto';

@Resolver()
export class FollowResolver {
  constructor(private followService: FollowService) {}

  // get all user, all follow
  @Query((returns) => [Follow])
  GetAllFollow() {
    return this.followService.getAllFollow();
  }

  // create follow
  @Mutation((returns) => Follow)
  CreateFollow(@Args('followDto') createFollowDto: CreateFollowDto) {
    return this.followService.createFollow(createFollowDto);
  }

  // // delete follow
  @Mutation((returns) => Boolean)
  DeleteFollow(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.followService.deleteFollow(id);
  }
}
