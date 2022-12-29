import type { IUser } from '@/backend/interfaces';
import { UserModel } from '@/backend/models';

export class UserRepository {
  async find(where: object, attributes: string[] = []): Promise<IUser[]> {
    return UserModel.find(where).select(attributes.join(' ')).lean();
  }

  async create(values: object): Promise<IUser> {
    return UserModel.create(values);
  }

  async findOne(where: object, attributes: string[] = []): Promise<IUser> {
    return UserModel.findOne(where).select(attributes.join(' ')).lean();
  }

  async findOneAndUpdate(where: object, setObject: object): Promise<IUser> {
    return UserModel.findOneAndUpdate(
      where,
      { $set: setObject },
      { upsert: true, new: true }
    ).lean();
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find().lean();
  }

  async deleteOne(
    where: object
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return UserModel.deleteOne(where);
  }
}

export const userRepository = new UserRepository();
