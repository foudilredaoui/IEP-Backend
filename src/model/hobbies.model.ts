import mongoose from 'mongoose';
import uid from '@src/helpers/uuid';

export interface HobbiesDocument extends mongoose.Document {
  id: string;
  passionLevel: string;
  name: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

const HobbiesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    passionLevel: { type: String, default: true },
    name: { type: String, default: true },
    year: { type: Number, default: true },
  },
  { timestamps: true }
);

HobbiesSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let hobbies = this as HobbiesDocument;

  hobbies.id = uid({ prefix: 'HBI' });
  return next();
});

const Hobbies = mongoose.model<HobbiesDocument>('Hobbies', HobbiesSchema);

export default Hobbies;
