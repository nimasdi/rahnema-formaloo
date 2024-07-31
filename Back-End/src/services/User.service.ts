import { IUser } from '../database/User/user.entity';
import { CreateUserInput } from '../models/User/user.model';
import { UserRepository } from '../repositories/User.repo';
import { ZodError } from 'zod';

export class UserService {

    constructor(private userRepository: UserRepository) {}

    async createUser(username: string): Promise<IUser> {
        try {
            const valid_username = CreateUserInput.parse(username)
            return this.userRepository.createUser(valid_username);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error('Invalid username');
            }
            throw new Error(`Error creating user`);
        }
    }

}
