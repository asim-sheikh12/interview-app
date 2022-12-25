import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps } from 'formik-mui';
import { fieldToTextField } from 'formik-mui';
import * as React from 'react';

export const PasswordField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  const onChange = React.useCallback(
    (event: any) => {
      const { value } = event.target;
      setFieldValue(name, value);
    },
    [setFieldValue, name]
  );
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <MuiTextField
      inputProps={{
        form: {
          autoComplete: 'off',
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={showPassword ? 'text' : 'password'}
      {...fieldToTextField(props)}
      onChange={onChange}
    />
  );
};
