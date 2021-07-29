import mongoose from 'mongoose';
import uid from '@src/helpers/uuid';
import { HobbiesDocument } from '@src/model/hobbies.model';

export interface UserDocument extends mongoose.Document {
  id: string;
  name: string;
  hobbies: [HobbiesDocument['id']];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobbies' }],
  },
  { timestamps: true }
);
// create a unique user Id for the
UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument;

  user.id = uid({ prefix: 'USR' });
  return next();
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
