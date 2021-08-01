import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Hobbies, { HobbiesDocument } from '@src/model/hobbies.model';

export async function createHobbies(input: DocumentDefinition<HobbiesDocument>) {
  try {
    return await Hobbies.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findAndUpdate(
  query: FilterQuery<HobbiesDocument>,
  update: UpdateQuery<HobbiesDocument>,
  options: QueryOptions
) {
  return Hobbies.findOneAndUpdate(query, update, options);
}

export async function deleteHobbies(query: FilterQuery<HobbiesDocument>) {
  return Hobbies.deleteOne(query);
}
