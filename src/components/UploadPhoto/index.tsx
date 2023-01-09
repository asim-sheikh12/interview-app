import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from '@mui/material';
import type { ChangeEvent, SetStateAction } from 'react';
import React, { useState } from 'react';

interface IProps {
  setImage: React.Dispatch<SetStateAction<File | undefined>>;
}

export const UploadPhoto = ({ setImage }: IProps) => {
  const [preview, setPreview] = useState<string>('');
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length) {
      setImage(files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0] as Blob);
    }
  };
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              zIndex: 999,
              padding: '5px',
              borderRadius: '50%',
              right: '30%',
              cursor: 'pointer',
            }}
          >
            {/* <label htmlFor="file-input">
              <CreateTwoToneIcon sx={{ color: '#787878', cursor: 'pointer' }} />
            </label>
            <input
              id="file-input"
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
            /> */}
          </Box>
          <Avatar
            src={preview}
            sx={{
              height: 128,
              width: 128,
            }}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor="raised-button-file">
          <Button color="primary" component="span" fullWidth variant="text">
            {preview ? 'Change picture' : 'Upload picture'}
          </Button>
        </label>
        <input
          onChange={(event) => handleFileChange(event)}
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
        />
      </CardActions>
    </Card>
  );
};
