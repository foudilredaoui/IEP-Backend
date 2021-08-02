import mongoose from 'mongoose';
import User from '@src/model/user.model';
import Hobbies from '@src/model/hobbies.model';

const hobbiesOneId = new mongoose.Types.ObjectId();
export const hobbiesOne = {
  _id: hobbiesOneId,
  id: 'HBI16278518DjQ4K513159',
  passionLevel: 'Low',
  name: 'football',
  year: 2006,
};
const hobbiesTwoId = new mongoose.Types.ObjectId();
export const hobbiesTwo = {
  _id: hobbiesTwoId,
  id: 'HBI1627852qRHkzf624848',
  passionLevel: 'High',
  name: 'cooking',
  year: 2006,
};

const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  id: 'USR1595172ymMUP7612215',
  name: 'Foudil',
  hobbies: [hobbiesOneId, hobbiesTwoId],
};

export const setupDatabase = async () => {
  await User.deleteMany();
  await Hobbies.deleteMany();

  await new User(userOne).save();
  await new Hobbies(hobbiesOne).save();
  await new Hobbies(hobbiesTwo).save();
};
