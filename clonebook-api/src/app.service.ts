import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AppService {
  async validate(authToken: string) {
    const token = authToken.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);

    return decoded;
  }
}
