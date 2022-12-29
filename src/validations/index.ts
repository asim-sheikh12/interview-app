import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter valid Email')
    .required('You must need to provide your email address'),
  password: Yup.string()
    .min(8, 'Must be atleat 8 characters.')
    .required('You must need to provide your password'),
});
