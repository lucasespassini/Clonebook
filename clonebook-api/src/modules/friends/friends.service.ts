import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createFriendDto: CreateFriendDto) {
    const user = new User();
    const friend = new Friend();

    user.id = +createFriendDto.userId;
    friend.seguidorId = +createFriendDto.seguidorId;
    friend.user = user;
    return this.friendRepository.save(friend);
  }

  async findAll() {
    const friends = await this.friendRepository.find({
      relations: ['user'],
    });

    return friends;
  }

  async findSeguidor(idSeguidor: number) {
    const seguidores = await this.userRepository.find({
      where: { id: idSeguidor },
      relations: ['friends'],
    });

    return seguidores;
  }

  async findOne(id: number) {
    const friend = await this.friendRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!friend) {
      throw new NotFoundException();
    }

    // return friend;
    console.log(friend.user.id);
    return this.findSeguidor(friend.user.id);
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
