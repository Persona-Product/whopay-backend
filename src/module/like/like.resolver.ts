import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Like } from '@src/entity';
import { LikeService } from '@like/like.service';
import { CreateLikeDto } from '@like/dto/create-like.dto';

@Resolver((of) => Like)
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  // get likes
  @Query((returns) => [Like])
  GetLikes() {
    return this.likeService.getLikes();
  }

  // create like
  @Mutation((returns) => Like)
  CreateLike(@Args('likeDto') createLikeDto: CreateLikeDto) {
    return this.likeService.createLike(createLikeDto);
  }

  // // delete like
  @Mutation((returns) => Boolean)
  DeleteLike(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.likeService.deleteLike(id);
  }
}
