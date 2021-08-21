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

const NewAd = () => {
  const navigate = useNavigate();

  const [adTypes, setAdTypes] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchAdTypes = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rsp = await axios.get(
        'http://***REMOVED***/domus/api/adType',
        config
      );

      const list = await rsp.data;
      setAdTypes(list);
    };
    fetchAdTypes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Novi oglas</title>
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
              description: '',
              adTypeID: ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required('Naziv oglasa nije unesen'),
              description: Yup.string().max(255).required('Opis nije unesen'),
              adTypeID: Yup.string()
                .max(255)
                .required('Tip oglasa nije odabran')
            })}
            onSubmit={(values, { resetForm }) => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              };
              const data = values;
              data.userId = localStorage.getItem('id');

              const response = axios
                .post('http://***REMOVED***/domus/api/ad', data, config)
                .then((text) => {
                  navigate('/app/ads', { replace: true });
                })
                .catch((error) => {
                  setErrorMsg('Dogodila se greška kod kreiranja oglasa, pokušajte opet.');
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
                    Novi oglas
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Kreiraj novi oglas
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Naziv oglasa"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  select
                  error={Boolean(touched.adTypeID && errors.adTypeID)}
                  fullWidth
                  helperText={touched.adTypeID && errors.adTypeID}
                  label="Tip oglasa"
                  margin="normal"
                  name="adTypeID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.adTypeID}
                  variant="outlined"
                >
                  {adTypes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                    Kreiraj oglas
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

export default NewAd;
