import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import getNestedObject from '../../utils/get_nested_object';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

const EventDetailsCard = ({ fetchedEvent, ...rest }) => {
  const navigate = useNavigate();

  let button;

  const participants = getNestedObject(fetchedEvent, ['participants']);

  if (typeof participants !== 'undefined') {
    button = participants.find(
      (participant) => participant.userId == localStorage.getItem('id')
    ) ? (
      ''
    ) : (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            };

            const values = {
              userId: localStorage.getItem('id'),
              eventId: fetchedEvent.id,
              accepted: 'false',
              declined: 'false',
              explanation: ''
            };
            const response = axios
              .post('http://localhost:5000/api/participants', values, config)
              .then((text) => {
                navigate('/events', { replace: true });
              })
              .catch((error) => {});
          }}
        >
          Dolazim na događaj
        </Button>
      </Box>
    );
  }

  return (
    <Card>
      <CardHeader title="Događaj" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Naziv:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{fetchedEvent.name}</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Tip događaja:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {getNestedObject(fetchedEvent, ['eventType', 'name'])}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Organizator:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {getNestedObject(fetchedEvent, ['user', 'firstName']) +
                  ' ' +
                  getNestedObject(fetchedEvent, ['user', 'lastName'])}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Vrijeme početka
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {moment(fetchedEvent.dateFrom).format('DD/MM/YY HH:mm')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Vrijeme završetka:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {moment(fetchedEvent.dateTo).format('DD/MM/YY HH:mm')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Broj sudionika:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{fetchedEvent.limit}</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Opis:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{fetchedEvent.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      {button}
    </Card>
  );
};

export default EventDetailsCard;
