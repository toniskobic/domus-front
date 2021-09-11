import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem
} from '@material-ui/core';
import DialogBox from './DialogBox';

const EventTypesToolbar = ({ ...props }) => {
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
          Novi tip događaja
        </Button>
      </Box>
      <DialogBox onClose={handleClose} open={open} />
    </Box>
  );
};

EventTypesToolbar.propTypes = {
  input: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default EventTypesToolbar;
