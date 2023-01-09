import EmailIcon from '@mui/icons-material/Email';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import { setCookie } from 'cookies-next';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

import { PasswordField } from '@/components';
import { icons, URL, UserRole } from '@/constants';
import { handleLogin } from '@/services';
import { AppConfig } from '@/utils';
import { loginSchema } from '@/validations';

interface IFormValues {
  email: string;
  password: string;
}

const Home: React.FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const router = useRouter();
  const onSubmit = async (
    values: IFormValues,
    submitProps: { setSubmitting: (arg0: boolean) => void }
  ) => {
    const response = await handleLogin(values);
    if (response?.status && response?.status === 200) {
      setCookie(AppConfig.tokenKey, response?.data?.token);
      setCookie(AppConfig.userId, response?.data?.userId);
      router.push(
        response?.data?.role === UserRole.ADMIN
          ? URL.RECRUITER_LIST
          : URL.CANDIDATE_LIST
      );
      toast.success('Login Successfull');

      submitProps.setSubmitting(false);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F0F0F0', height: '96vh' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card sx={{ minHeight: '50%', padding: 5, borderRadius: '5%' }}>
            <CardContent>
              <Typography
                sx={{
                  fontWeight: 550,
                  textAlign: 'center',
                }}
                variant="h5"
              >
                Sign in into Account
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}
              >
                <Image src={icons.logoIcon} alt="logo" width={200} />
              </Box>
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form autoComplete="off">
                    <Box marginY={5}>
                      <Field
                        autoComplete="userEmail"
                        component={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        size="medium"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box marginY={4}>
                      <Field
                        variant="outlined"
                        autoComplete="current-password"
                        component={PasswordField}
                        label="Password"
                        name="password"
                        size="medium"
                        fullWidth
                      />
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Sign In
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>{' '}
          </Card>
        </Grid>
      </Grid>
      {/* <Box sx={{ minHeight: '100vh' }}> */}
      <Image
        src={icons.backgroundImg}
        alt="bg-image"
        width={900}
        height={700}
      />
      {/* </Box> */}
    </Box>
  );
};

export default Home;
