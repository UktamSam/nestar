import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { BoardModule } from './article/components/board/board.module';
import { T } from './libs/types/common';

@Module({
  imports: [ 
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
        driver: ApolloDriver,
        playground: true,
        uploads: false,
        autoSchemaFile: true,
    formatError: (error: T) => {
      const graphQLFormatError = {
        code: error?.extensions.code,
        message: error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
      };
      console.log("GraphQL Global Error:", graphQLFormatError);
      return graphQLFormatError;
    },
  }), 
  ComponentsModule, // HTTP
  DatabaseModule // TCP
],
  controllers: [AppController], // HTTP
  providers: [AppService, AppResolver],
})
export class AppModule {}
