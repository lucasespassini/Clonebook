import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, {
    message: 'O nome de usuário deve ter no mínimo 3 caracteres!',
  })
  user_name: string;

  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres!' })
  name: string;

  @IsEmail({}, { message: 'O e-mail é inválido!' })
  email: string;

  @MinLength(5, { message: 'A senha deve ter no mínimo 5 caracteres!' })
  password: string;
}
