import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repository/user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) { }

  async create(user: User): Promise<User> {
    try {
      return this.userRepository.store(user);
    } catch (error) {
      this.logger.log(`When Create User Error:: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      if (users?.length === 0) {
        throw new Error('No record found.');
      }
      return users;
    } catch (error) {
      this.logger.log(
        `When FindAll User Error:: ${JSON.stringify(error.message)}`,
      );
    }
  }


  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `When Find All User ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<User | any> {
    try {
      return await this.userRepository.updateOne(id, user);
    } catch (error) {
      this.logger.log(`When Update User Error:: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async delete(id: string) {
    try {
      return await this.userRepository.destroy(id);
    } catch (error) {
      this.logger.log(`When delete User Error:: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }


}
