import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { UserDocument } from '@src/model/user.model';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUser(query: FilterQuery<UserDocument>) {
  try {
    return await User.find(query).populate('hobbies');
  } catch (error) {
    throw new Error(error);
  }
}
export async function findOneUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export async function findAllUsers(query: FilterQuery<UserDocument>) {
  return User.find(query).lean();
}
export async function updateHobbies(query: FilterQuery<UserDocument>, update: UpdateQuery<any>) {
  return User.updateOne(query, { $push: { hobbies: update.hobbies } });
}

export async function deleteUserHobbies(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<any>,
  options: QueryOptions
) {
  return User.findOneAndUpdate(
    query,
    {
      $pull: update,
    },
    options
  );
}
