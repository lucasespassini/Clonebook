import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from 'src/modules/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const post = new Post();
    const user = new User();
    const comment = new Comment();

    comment.content = createCommentDto.content;

    user.id = +createCommentDto.userId;
    post.id = +createCommentDto.postId;

    comment.user = user;
    comment.post = post;

    await this.commentRepository.save(comment);
    return { msg: 'Comentário criado com sucesso!' };
  }

  async findAll() {
    const comments = await this.commentRepository.find({
      relations: ['user', 'post'],
    });

    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: id },
      relations: ['user', 'post'],
    });

    if (!comment) {
      throw new NotFoundException();
    }

    return comment;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    return this.commentRepository.remove(comment);
  }
}
