import { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const DialogBox = (props) => {
  const [ name, setName ] = useState('');
  const { onClose, open } = props;

  return (
    <Dialog open={open}>
      <DialogTitle id="title">Novi grad:</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert">{alert}</DialogContentText>
        <TextField
          value={name}
          name="name"
          onChange={event => setName(event.target.value)}
          margin="dense"
          type="text"
          label="Naziv"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            };

            const data = { name: name };
            const response = axios
              .post(
               'http://localhost:5000/api/cities',
                data,
                config
              )
              .then((text) => {
                onClose();
                window.location.reload(true);
              })
              .catch((error) => {
                onClose();
                window.location.reload(true);
              });
          }}
        >
          Kreiraj
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onClose();
          }}
        >
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
