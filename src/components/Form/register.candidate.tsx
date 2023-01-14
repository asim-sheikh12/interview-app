import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { icons } from '@/constants';
import { registerCandidate } from '@/services';
import { registerCandidateSchema } from '@/validations';

export const RegisterCandidate = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    experience: '',
    currentCompany: '',
    currentCTC: '',
    expectedCTC: '',
  };

  const onSubmit = async (
    values: any,
    submitProps: { resetForm: any; setSubmitting: (arg0: boolean) => void }
  ) => {
    const response = await registerCandidate(values);
    if (response?.status !== 200) {
      toast.error(response.message);
    } else {
      submitProps.resetForm();
      toast.success('Registration successfull !');
    }
    submitProps.setSubmitting(false);
  };
  return (
    <Box sx={{ boxShadow: 3, borderRadius: 5 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerCandidateSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form autoComplete="off">
            <Card
              sx={{
                mt: 5,
                opacity: 0.9,
              }}
            >
              <CardHeader
                subheader="Please enter your details"
                title="Add Details"
                action={
                  <Image
                    src={icons.logoIcon}
                    height={80}
                    alt="logo"
                    width={200}
                  />
                }
              />

              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="First name"
                      name="firstName"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Last name"
                      name="lastName"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Email Address"
                      name="email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Current Comapny Name"
                      name="currentCompany"
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Experience (In Years)"
                      name="experience"
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Current CTC"
                      name="currentCTC"
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      label="Expected CTC"
                      name="expectedCTC"
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  boxShadow: 2,
                  p: 2,
                }}
              >
                <Button
                  type="submit"
                  sx={{ width: '30%', borderRadius: '50px' }}
                  disabled={!formik.isValid}
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
