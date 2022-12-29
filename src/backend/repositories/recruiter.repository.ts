import type { IRecruiter } from '@/backend/interfaces';
import { RecruiterModel } from '@/backend/models';

export class RecruiterRepository {
  async find(where: object, attributes: string[] = []): Promise<IRecruiter[]> {
    return RecruiterModel.find(where).select(attributes.join(' ')).lean();
  }

  async create(values: object): Promise<IRecruiter> {
    return RecruiterModel.create(values);
  }

  async findOne(where: object, attributes: string[] = []): Promise<IRecruiter> {
    return RecruiterModel.findOne(where).select(attributes.join(' ')).lean();
  }

  async findOneAndUpdate(
    where: object,
    setObject: object
  ): Promise<IRecruiter> {
    return RecruiterModel.findOneAndUpdate(
      where,
      { $set: setObject },
      { upsert: true, new: true }
    ).lean();
  }

  async findAll(): Promise<IRecruiter[]> {
    return RecruiterModel.find().lean();
  }

  async deleteOne(
    where: object
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return RecruiterModel.deleteOne(where);
  }
}

export const recruiterRepository = new RecruiterRepository();
