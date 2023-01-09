import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import type { SetStateAction } from 'react';
import { useState } from 'react';

import type { IRecruiter } from '@/interfaces';
import { getInitials } from '@/utils';

export const CustomTable = ({ tableData }: any) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement | any>
  ) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (_event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((data: IRecruiter) => (
              <TableRow hover key={data._id}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Avatar src={data.photo} sx={{ mr: 2 }}>
                      {getInitials(`${data.firstName} ${data?.lastName}`)}
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {`${data.firstName} ${data?.lastName}`}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phoneNumber}</TableCell>
                <TableCell>
                  <DeleteSweepTwoToneIcon />
                  {/* {format(customer.createdAt, 'dd/MM/yyyy')} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={tableData?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
