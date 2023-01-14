const Yup = require('yup');
require('yup-phone');

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter valid Email')
    .required('You must need to provide your email address'),
  password: Yup.string()
    .min(8, 'Must be atleat 8 characters.')
    .required('You must need to provide your password'),
});

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Must be atleat 3 characters.')
    .required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .phone('IN', true, `Phone number is invalid`),
  email: Yup.string()
    .email('Please enter valid Email')
    .required('You must need to provide your email address'),
});

export const changePasswordSchema = Yup.object({
  password: Yup.string().required('New Password is Required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const registerCandidateSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Must be atleat 3 characters.')
    .required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .phone('IN', true, `Phone number is invalid`),
  email: Yup.string()
    .email('Please enter valid Email')
    .required('You must need to provide your email address'),
  experience: Yup.number()
    .max(2, 'Must be of two digits')
    .required('You must need to provide your experience'),
  currentCompany: Yup.string().required(
    'You must need to provide your company name'
  ),
  currentCTC: Yup.number().required(
    'You must need to provide your current ctc'
  ),
  expectedCTC: Yup.number()
    .required('You must need to provide your expected ctc')
    .notOneOf(
      [Yup.ref('currentCTC'), null],
      'Expected CTC should not match with Current CTC'
    ),
});
