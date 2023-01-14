import { Box, Container } from '@mui/material';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { CustomTable, Toolbar } from '@/components';
import { DashboardLayout } from '@/containers';
import type { IData, IRecruiter } from '@/interfaces';
import { getAllRecruiters } from '@/services';

const Page = ({ data }: IData<IRecruiter[]>) => {
  const [tableData, setTableData] = useState<IRecruiter[]>([]);
  useEffect(() => {
    setTableData(data);
  }, []);
  return (
    <>
      <Head>
        <title>Recruiters</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            tableData={data}
            setTableData={setTableData}
            heading="Recruiter List"
          />
          <Box sx={{ mt: 3 }}>
            <CustomTable tableData={tableData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const recruiterData = await getAllRecruiters(req);
  const { data } = recruiterData;
  return {
    props: {
      data: data ?? [],
    },
  };
};
