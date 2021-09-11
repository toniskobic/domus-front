import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem } from '@material-ui/core';
import appContext from 'src/store/app_context';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const DialogBox = (props) => {
  const [ name, setName ] = useState('');
  const [ city, setCity ] = useState('');
  const { state, dispatchStore } = useContext(appContext);
  const { onClose, open } = props;

  useEffect(() => {
    const fetchCities = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspCities = await axios.get(
        'http://localhost:5000/api/cities',
        config
      );

      const fetchedCities = await rspCities.data;
      console.log(fetchedCities);
      dispatchStore({
        type: 'CHANGE_CITIES',
        payload: { cities: fetchedCities }
      });
    };
    fetchCities();
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle id="title">Novi dom:</DialogTitle>
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
        <TextField
                  select
                  fullWidth
                  label="Grad"
                  margin="normal"
                  name="CityId"
                  value={city}
                  onChange={event => setCity(event.target.value)}
                  variant="outlined"
                >
                  {state.cities.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
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

            const data = { name: name, CityId: city };
            const response = axios
              .post(
               'http://localhost:5000/api/dormitories',
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
