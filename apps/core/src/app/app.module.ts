import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { BlogsModule } from "@qa-env/blogs";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ||"mongodb://localhost:27017/blog", {
      connectionFactory: (connection) => {
        connection.plugin(mongooseAutopopulate);
        return connection;
      },
    }),
    BlogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
