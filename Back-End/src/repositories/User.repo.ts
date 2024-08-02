import mongoose, { Model, Types } from "mongoose";
import User, { IUser } from "../database/User/user.entity";
import { CreateUser } from "../models/User/user.model";


export class UserRepository {
    constructor(private model: Model<IUser>) {}

    async createUser({ username }: CreateUser): Promise<IUser> {
        try {
            const existingUser = await this.model.findOne({ username });
            if (existingUser) {
                throw new Error('Username already exists');
            }

            const newUser = new this.model({
                username,
                forms: [],
            });

            await newUser.save();
            return newUser;
        } catch (e) {
            throw new Error(`Error creating user`);
        }
    }

    async findOneByUsername(username: string): Promise<IUser | null> {
        return this.model.findOne({ username }).exec();
    }
}
