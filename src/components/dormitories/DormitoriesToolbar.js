import { useState } from 'react';
import {
  Box,
  Button
} from '@material-ui/core';
import DialogBox from './DialogBox';

const DormitoriesToolbar = ({ ...props }) => {
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

export default DormitoriesToolbar;
