import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '@/contexts/auth-context';
import { changePassword } from '@/services';
import { changePasswordSchema } from '@/validations';

import { PasswordField } from '../Input';

export const ChangePassword = () => {
  const { userData } = React.useContext(AuthContext);

  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const onSubmit = async (
    values: { password: string; confirmPassword: string },
    submitProps: {
      resetForm: any;
      setSubmitting: (arg0: boolean) => void;
    }
  ) => {
    const response = await changePassword(userData?._id, values.password);
    if (response?.status && response?.status === 200) {
      toast.success('Password updated successfully');
      submitProps.setSubmitting(false);
      submitProps.resetForm();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changePasswordSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form autoComplete="off">
          {' '}
          <Card>
            <CardHeader subheader="Update password" title="Password" />
            <Divider />
            <CardContent>
              <Field
                component={PasswordField}
                fullWidth
                label="New Password"
                margin="normal"
                name="password"
                variant="outlined"
              />
              <Field
                component={PasswordField}
                fullWidth
                label="Confirm password"
                margin="normal"
                name="confirmPassword"
                variant="outlined"
              />
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
                Update
              </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
