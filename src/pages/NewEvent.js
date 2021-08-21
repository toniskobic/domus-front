/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';

const NewEvent = () => {
  const navigate = useNavigate();

  const [eventTypes, setEventTypes] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchEventTypes = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rsp = await axios.get(
        'https://***REMOVED***/domus/api/eventType',
        config
      );

      const list = await rsp.data;
      setEventTypes(list);
    };

    fetchEventTypes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Novi događaj</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: '',
              datefrom: '',
              dateto: '',
              limit: '',
              description: '',
              eventTypeID: ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required('Naziv događaja nije unesen'),
              datefrom: Yup.date()
                .max(
                  Yup.ref('dateto'),
                  'Vrijeme početka ne može biti poslije vremena završetka događaja'
                )
                .required('Vrijeme početka nije uneseno'),
              dateto: Yup.date()
                .min(
                  Yup.ref('datefrom'),
                  'Vrijeme završetka ne može biti prije vremena početka događaja'
                )
                .required('Vrijeme završetka nije uneseno'),
              limit: Yup.number()
                .required('Broj sudionika nije unesen')
                .test(
                  'Is positive?',
                  'Broj sudionika mora biti veći od 0',
                  (value) => value > 0
                ),
              description: Yup.string().max(255).required('Opis nije unesen'),
              eventTypeID: Yup.string()
                .max(255)
                .required('Tip događaja nije odabran')
            })}
            onSubmit={(values, { resetForm }) => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              };

              const data = values;
              data.userId = localStorage.getItem('id');
              data.dormitoryId = localStorage.getItem('dormitoryId');

              const response = axios
                .post('https://***REMOVED***/domus/api/event', data, config)
                .then((text) => {
                  navigate('/app/events', { replace: true });
                })
                .catch((error) => {
                  setErrorMsg('Dogodila se greška kod kreiranja događaja, pokušajte opet.');
                  resetForm();
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  { errorMsg ? <Typography color="red" gutterBottom variant="h4">{errorMsg}</Typography> : null}
                  <Typography color="textPrimary" variant="h2">
                    Novi događaj
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Kreiraj novi događaj
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Naziv događaja"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  select
                  error={Boolean(touched.eventTypeID && errors.eventTypeID)}
                  fullWidth
                  helperText={touched.eventTypeID && errors.eventTypeID}
                  label="Tip događaja"
                  margin="normal"
                  name="eventTypeID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.eventTypeID}
                  variant="outlined"
                >
                  {eventTypes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="datetime-local"
                  error={Boolean(touched.datefrom && errors.datefrom)}
                  fullWidth
                  helperText={touched.datefrom && errors.datefrom}
                  label="Vrijeme početka"
                  margin="normal"
                  name="datefrom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.datefrom}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="datetime-local"
                  error={Boolean(touched.dateto && errors.dateto)}
                  fullWidth
                  helperText={touched.dateto && errors.dateto}
                  label="Vrijeme završetka"
                  margin="normal"
                  name="dateto"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateto}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="number"
                  error={Boolean(touched.limit && errors.limit)}
                  fullWidth
                  helperText={touched.limit && errors.limit}
                  label="Broj sudionika"
                  margin="normal"
                  name="limit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.limit}
                  variant="outlined"
                />
                <TextField
                  multiline
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Opis"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Kreiraj događaj
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default NewEvent;
