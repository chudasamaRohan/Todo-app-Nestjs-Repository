import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { TodoRepository } from 'src/repository/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],

  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule { }
