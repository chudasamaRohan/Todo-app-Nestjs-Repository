import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner,
        );
    }

    public async findAll(): Promise<User[]> {
        return this.find();
    }

    public async findById(id: string): Promise<User | null> {
        return this.findOneBy({ id: id });
    }

    public async store(user: CreateUserDto): Promise<User> {
        const newUser = this.create(user);
        return this.save(newUser);
    }

    public async updateOne(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<User | undefined> {
        const user = await this.findById(id);
        if (!user) return undefined;
        Object.assign(user, updateUserDto);
        return this.save(user);
    }

    public async destroy(id: string): Promise<void> {
        await this.delete(id);
    }
}