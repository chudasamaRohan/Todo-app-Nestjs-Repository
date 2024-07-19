import {  Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from 'src/repository/todo.repository';
import { Todo } from 'src/entities/todo.entity';

@Injectable()
export class TodoService {
  private logger = new Logger(TodoService.name);
  constructor(private readonly todoRepository: TodoRepository) {}
  async create(todo: CreateTodoDto): Promise<Todo> {
    try {
      return this.todoRepository.store(todo);
    } catch (error) {
      this.logger.log(
        `When Create Todo Error:: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      const users = await this.todoRepository.findAll();
      if (users?.length === 0) {
        throw new Error('No record found.');
      }
      return users;
    } catch (error) {
      this.logger.log(
        `When FindAll Todo Error:: ${JSON.stringify(error.message)}`,
      );
    }
  }

  async findOne(id: string): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findById(id);
      if (!todo) {
        throw new Error('Todo not found.');
      }
      return todo;
    } catch (error) {
      this.logger.log(`When Find All Todo ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async update(id: string, todo: UpdateTodoDto): Promise<Todo | any> {
    try {
      await this.findOne(id);
      return await this.todoRepository.updateOne(id, todo);
    } catch (error) {
      this.logger.log(
        `When Update Todo Error:: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async delete(id: string) {
    try {
      return await this.todoRepository.destroy(id);
    } catch (error) {
      this.logger.log(
        `When Delete Todo Error:: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }
}
