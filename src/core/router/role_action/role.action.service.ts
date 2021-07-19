import { Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { FilterRoleAction } from './interface.role.action';
import { CreateRoleActionDto } from './role.action.dto';
import { RoleActionDocument } from './role.action.schema';

@Injectable()
export class RoleActionService {
  constructor(
    @Inject('ROLE_ACTION_MODEL')
    private readonly roleActionModel: Model<RoleActionDocument>,
  ) {}

  async bulkCreate(createRoleActionDto: CreateRoleActionDto[]) {
    const session = await this.roleActionModel.db.startSession();
    try {
      session.startTransaction();
      const result = await this.roleActionModel.insertMany(createRoleActionDto);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      console.log(' Error bulk create RoleAction', error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getPageRoleAction(
    filter: FilterRoleAction,
    limit: number,
    skip: number,
  ) {
    Object.keys(filter).forEach((key) => {
      if (!filter[key]) delete filter[key];
    });
    return this.roleActionModel
      .find(filter)
      .sort({ update_at: -1 })
      .skip((skip - 1) * limit)
      .limit(limit)
      .exec()
      .then(async (roleAction) => {
        return this.roleActionModel
          .countDocuments(filter)
          .exec()
          .then((count) => ({ roleAction, count }));
      });
  }

  updateActiveById(_id: ObjectId, active: boolean) {
    return this.roleActionModel.updateOne({ _id }, { active }).exec();
  }

  deleteByRole(name: string) {
    return this.roleActionModel.deleteMany({ name }).exec();
  }

  deleteByActionId(action_id: number) {
    return this.roleActionModel.deleteMany({ action_id }).exec();
  }

  deleteById(_id: ObjectId) {
    return this.roleActionModel.deleteOne({ _id });
  }

  checkActionOfRole(name: string, action_id: number) {
    return this.roleActionModel.countDocuments({ name, action_id }).exec();
  }
}
