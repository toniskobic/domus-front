import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import getNestedObject from '../../utils/get_nested_object';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

const UpcomingEventDetailsCard = ({ fetchedEvent, ...rest }) => {
  const participants = getNestedObject(fetchedEvent, ['participants']);

  let participant = '';

  let explanation = '';

  let title = 'Događaj';

  if (fetchedEvent.canceled) title = 'Događaj - OTKAZAN';

  if (typeof participants !== 'undefined') {
    participant = participants.find(
      (p) => p.userId == localStorage.getItem('id')
    );
    if (participant.explanation !== '') {
      explanation = (
        <Grid item container direction="row" spacing={1} md={6} xs={12}>
          <Grid item>
            <Typography color="textPrimary" fontWeight="fontWeightBold">
              Razlog:
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{participant.explanation}</Typography>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Card>
      <CardHeader title={title} />
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
          <Grid item container direction="row" spacing={1} md={6} xs={12}>
            <Grid item>
              <Typography color="textPrimary" fontWeight="fontWeightBold">
                Status:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {participant.accepted === false
                  ? participant.declined === false
                    ? 'U tijeku'
                    : 'Odbijen'
                  : 'Prihvaćen'}
              </Typography>
            </Grid>
          </Grid>
          {explanation}
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default UpcomingEventDetailsCard;
