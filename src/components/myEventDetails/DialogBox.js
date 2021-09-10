import { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const DialogBox = (props) => {
  const [alert, setAlert] = useState('');
  const { onClose, open, setExplanation, explanation, dialogValue } = props;

  return (
    <Dialog open={open}>
      <DialogTitle id="title">Prihvati/odbij korisnika:</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Unesite objašnjenje ako odbijate korisnika.
        </DialogContentText>
        <DialogContentText id="alert">{alert}</DialogContentText>
        <TextField
          onChange={setExplanation}
          value={explanation}
          multiline
          margin="dense"
          label="Razlog odbijanja"
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

            const data = { accepted: true };
            const response = axios
              .patch(
                `http://localhost:5000/api/participants/${dialogValue.eventId}/${dialogValue.userId}`,
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
          Prihvati
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (explanation.length < 1) {
              setAlert('Niste unijeli objašnjenje.');
            } else {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              };

              const data = { declined: true, explanation: explanation };
              const response = axios
                .patch(
                  `http://localhost:5000/api/participants/${dialogValue.eventId}/${dialogValue.userId}`,
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
            }
          }}
        >
          Odbij
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
