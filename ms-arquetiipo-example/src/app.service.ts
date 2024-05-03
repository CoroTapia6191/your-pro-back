import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleCreated(data: any) {
    console.log(data)
    return { statusCode: 200, data };
  }
}

