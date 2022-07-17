import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  private secret = '9uj21=09rj210´rj';
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    return undefined;
  }

  async findByUserName(user_name: string) {
    const user = await this.userRepository.findOneBy({ user_name });
    if (user) {
      return user;
    }
    return undefined;
  }

  async create(createUserDto: CreateUserDto) {
    const newHash = await hash(createUserDto.password, 10);
    createUserDto.password = newHash;
    const newUser = this.userRepository.create(createUserDto);
    const emailExists = await this.findByEmail(newUser.email);
    const userNameExists = await this.findByUserName(newUser.user_name);

    interface Errors {
      user_nameError: string | undefined;
      emailError: string | undefined;
    }

    const errors: Errors = {
      user_nameError: undefined,
      emailError: undefined,
    };

    if (userNameExists != undefined) {
      errors.user_nameError = 'Esse nome de usuário já está em uso!';
    }

    if (emailExists != undefined) {
      errors.emailError = 'Esse e-mail já está cadastrado!';
    }

    if (errors.user_nameError != undefined || errors.emailError != undefined) {
      throw new NotAcceptableException({ errors: errors });
    }

    const user = await this.userRepository.save(newUser);

    const token = sign(
      {
        id: user.id,
        user_name: user.user_name,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      'teste',
    );
    return { token };
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: {
        id: true,
        user_name: true,
        name: true,
        email: true,
        password: false,
        posts: true,
        comments: true,
      },
      relations: ['posts', 'comments'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        user_name: true,
        name: true,
        email: true,
        password: false,
        posts: true,
      },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const editUser = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    await this.userRepository.save(editUser);
    return { msg: 'Usuário editado com sucesso!' };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { msg: 'Usuário deletado com sucesso!' };
  }

  async login(loginUserDto: UpdateUserDto) {
    const user = await this.findByEmail(loginUserDto.email);

    if (!user) {
      throw new NotFoundException('Esse usuário não existe!');
    }

    const result = await compare(loginUserDto.password, user.password);

    if (!result) {
      throw new NotAcceptableException('Senha incorreta!');
    }

    const token = sign(
      {
        id: user.id,
        user_name: user.user_name,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      this.secret,
      { expiresIn: '2d' },
    );
    return { token };
  }
}
