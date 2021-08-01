import { object, string } from 'yup';

const createUserSchema = object({
  body: object({ name: string().required('Name is required') }),
});

export { createUserSchema as default };
