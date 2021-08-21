/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <>
      <Helmet>
        <title>Domus | Prijava</title>
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
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required('Korisničko ime nije uneseno'),
              password: Yup.string().max(255).required('Lozinka nije unesena')
            })}
            onSubmit={(values, { resetForm }) => {
              const user = values;
              const response = axios
                .post('https://***REMOVED***/domus/api/authenticate/login', user)
                .then((text) => {
                  localStorage.setItem('id', text.data.id);
                  localStorage.setItem('dormitoryId', text.data.dormitoryId);
                  localStorage.setItem('firstname', text.data.firstname);
                  localStorage.setItem('lastname', text.data.lastname);
                  localStorage.setItem('username', text.data.username);
                  localStorage.setItem('token', text.data.token);
                  localStorage.setItem('expiration', text.data.expiration);
                  navigate('/app/events', { replace: true });
                })
                .catch((error) => {
                  setErrorMsg(
                    'Pogrešno korisničko ime ili lozinka, pokušajte ponovno.'
                  );
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
                <Typography color="textPrimary" variant="h4">
                  Administrator:
                </Typography>
                <Typography color="textSecondary" variant="h4">
                  korisničko ime: ***REMOVED***
                  <br />
                  lozinka: ***REMOVED***
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  Korisnik:
                </Typography>
                <Typography color="textSecondary" variant="h4">
                  korisničko ime: ***REMOVED***
                  <br />
                  lozinka: ***REMOVED***
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {errorMsg ? (
                    <Typography color="red" gutterBottom variant="h4">
                      {errorMsg}
                    </Typography>
                  ) : null}
                  <Typography color="textPrimary" variant="h2">
                    Prijava
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Prijavi se sa svojim korisničkim imenom
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Korisničko ime"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Lozinka"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
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
                    Prijavi se
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Nemaš korisnički račun?
                  {' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Registriraj se
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
