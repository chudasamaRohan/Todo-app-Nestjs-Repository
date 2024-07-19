import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { UpdateTodoDto } from 'src/modules/todo/dto/update-todo.dto';
import { CreateTodoDto } from 'src/modules/todo/dto/create-todo.dto';

export class TodoRepository extends Repository<Todo> {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {
    super(
      todoRepository.target,
      todoRepository.manager,
      todoRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Todo[]> {
    return this.find();
  }

  public async findById(id: string): Promise<Todo | null> {
    return this.findOneBy({ id: id });
  }

  public async store(todo: CreateTodoDto): Promise<Todo> {
    const newUser = this.create(todo);
    return this.save(newUser);
  }

  public async updateOne(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const updatedAt = new Date()
    const data = {...updateTodoDto,updatedAt}
    const todo = await this.findById(id);
    if (!todo) return undefined;
    Object.assign(todo, data);
    return this.save(todo);
  }

  public async destroy(id: string): Promise<void> {
    await this.delete(id);
  }
}
