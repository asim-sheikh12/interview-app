import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';

import { DashboardLayout } from '@/containers';
import type { IUser } from '@/interfaces';
import { getCandidateById } from '@/services';
import { registerCandidateSchema } from '@/validations';

const Page = (candidate: IUser) => {
  const initialValues = {
    firstName: candidate?.firstName || '',
    lastName: candidate?.lastName || '',
    email: candidate?.email || '',
    phoneNumber: candidate?.phoneNumber || '',
    experience: candidate?.experience || '',
    currentCompany: candidate?.currentCompany || '',
    currentCTC: candidate?.currentCTC || '',
    expectedCTC: candidate?.expectedCTC || '',
  };

  const onSubmit = () => {
    console.log('>>>>>>');
  };
  return (
    <>
      <Head>
        <title>{`${candidate?.firstName} ${candidate?.lastName} | Candidate Details`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={8} md={6} xs={12}>
              <Box>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={registerCandidateSchema}
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
                          title={`${candidate?.firstName} ${candidate?.lastName}`}
                          subheader="Edit Details"
                          action={
                            <Button color="primary" variant="contained">
                              Schedule Interview
                            </Button>
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
                                style={{ cursor: 'not-allowed' }}
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { req } = context;
  const candidateDetails = await getCandidateById(id as string, req);
  return {
    props: candidateDetails?.data ?? {},
  };
};
