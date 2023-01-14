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
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { ADMIN, URL } from '@/constants';
import type { IData, IRecruiter } from '@/interfaces';
import { registerSchema } from '@/validations';

export const Register = () => {
  const router = useRouter();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  const addRecruiter = async (data: any): Promise<IData<IRecruiter[]>> => {
    const requestOptions: RequestInit = {
      method: 'POST',
      body: data,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${ADMIN.ADD_RECRUITER}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => result)
      .catch((err) => {
        console.log('error', err);
      });
    return response;
  };

  const onSubmit = async (
    values: any,
    submitProps: { resetForm: any; setSubmitting: (arg0: boolean) => void }
  ) => {
    const response = await addRecruiter(values);
    if (response?.status !== 200) {
      toast.error(response.message);
    } else {
      submitProps.resetForm();
      toast.success('Email sent successfully');
      router.push(URL.CANDIDATE_LIST);
    }
    submitProps.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form autoComplete="off">
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    helperText="Please specify the first name"
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
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button
                type="submit"
                disabled={!formik.isValid}
                color="primary"
                variant="contained"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
