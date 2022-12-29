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
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import Image from 'next/image';
import React from 'react';

import { PasswordField } from '@/components';
import { icons } from '@/constants';
import { loginSchema } from '@/validations';

const Home: React.FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (
    values: { email: string; password: string },
    submitProps: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values });
    submitProps.setSubmitting(false);
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
                      sx={{ backgroundColor: 'red' }}
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
