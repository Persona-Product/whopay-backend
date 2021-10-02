import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@src/entity';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepostiory: Repository<Comment>,
  ) {}

  // get comment
  async getComment(id: number): Promise<Comment> {
    return await this.commentRepostiory.findOne(id);
  }

  // get comments
  async getComments(): Promise<Comment[]> {
    const data = await this.commentRepostiory.find();
    return data;
  }

  // get comments by user
  async getCommentsByUser(id: string): Promise<Comment[]> {
    return await this.commentRepostiory.find({
      userId: id,
    });
  }

  // get comments by tweet
  async getCommentsByTweet(id: number): Promise<Comment[]> {
    return await this.commentRepostiory.find({
      tweetId: id,
    });
  }

  // create comment
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentRepostiory.create(createCommentDto);
    await this.commentRepostiory.save(comment);
    return comment;
  }

  // delete comment
  async deleteComment(id: number): Promise<boolean> {
    const result = await this.commentRepostiory.delete(id);
    return result.affected > 0;
  }
}
