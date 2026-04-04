import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'Welcome to Nestar REST API server is RUNNING!';
  }
}
