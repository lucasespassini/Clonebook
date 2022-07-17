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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const result = await this.userRepository.findOneBy({
      email: email,
    });
    if (result) {
      return true;
    }
    return false;
  }

  async userNameExists(user_name: string): Promise<boolean> {
    const result = await this.userRepository.findOneBy({
      user_name: user_name,
    });
    if (result) {
      return true;
    }
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    const emailExists: boolean = await this.emailExists(newUser.email);
    const userNameExists: boolean = await this.userNameExists(
      newUser.user_name,
    );

    interface Errors {
      user_nameError: string | undefined;
      emailError: string | undefined;
    }

    const errors: Errors = {
      user_nameError: undefined,
      emailError: undefined,
    };

    if (userNameExists == true) {
      errors.user_nameError = 'Esse nome de usuário já está em uso!';
    }

    if (emailExists == true) {
      errors.emailError = 'Esse e-mail já está cadastrado!';
    }

    if (errors.user_nameError != undefined || errors.emailError != undefined) {
      throw new NotAcceptableException({ errors: errors });
    }

    await this.userRepository.save(newUser);
    return { msg: 'Usuário cadastrado com sucesso!' };
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
}
