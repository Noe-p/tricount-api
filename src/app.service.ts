import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getCreateDatabase(): string {
    return 'Create Database!';
  }
}
