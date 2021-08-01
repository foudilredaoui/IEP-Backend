import { object, string, number } from 'yup';

const payload = {
  body: object({
    passionLevel: string().required('Passion level is required').oneOf(['Low', 'Medium', 'High', 'Very-High']),
    name: string().required('Name is required'),
    year: number().required('year is required'),
  }),
};

const params = {
  params: object({
    userId: string().required('userId is required'),
  }),
};

export const createHobbiesSchema = object({
  ...params,
  ...payload,
});

export const updateHobbiesSchema = object({
  ...params,
  ...payload,
});

export const deleteHobbiesSchema = object({
  ...params,
});
