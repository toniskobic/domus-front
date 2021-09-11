import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem
} from '@material-ui/core';
import DialogBox from './DialogBox';

const CitiesToolbar = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Novi dom
        </Button>
      </Box>
      <DialogBox onClose={handleClose} open={open} />
    </Box>
  );
};

export default CitiesToolbar;
