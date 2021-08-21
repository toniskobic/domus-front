/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();

  const [dormitories, setDormitories] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchDormitories = async () => {
      const rsp = await axios.get('https://***REMOVED***/domus/api/dormitory');
      const list = await rsp.data;
      setDormitories(list);
    };
    fetchDormitories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Registracija</title>
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
              email: '',
              firstname: '',
              lastname: '',
              username: '',
              password: '',
              DormitoryID: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('E-pošta nije valjana')
                .max(255)
                .required('E-pošta nije unesena'),
              firstname: Yup.string().max(255).required('Ime nije uneseno'),
              lastname: Yup.string().max(255).required('Prezime nije uneseno'),
              password: Yup.string().max(255).required('Lozinka nije unesena'),
              username: Yup.string()
                .max(255)
                .required('Korisničko ime nije uneseno'),
              DormitoryID: Yup.string()
                .max(255)
                .required('Studentski dom nije odabran')
            })}
            onSubmit={(
              values, { resetForm }
            ) => {
              console.log(values);
              const response = axios
                .post('https://***REMOVED***/domus/api/authenticate/register', values)
                .then((text) => {
                  console.log(values);
                  console.log(text.data);
                  navigate('/login', { replace: true });
                }).catch((error) => {
                  setErrorMsg('Dogodila se greška kod registracije, pokušajte opet.');
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
                    Registracija
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Registriraj se svojom e-poštom
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstname && errors.firstname)}
                  fullWidth
                  helperText={touched.firstname && errors.firstname}
                  label="Ime"
                  margin="normal"
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastname && errors.lastname)}
                  fullWidth
                  helperText={touched.lastname && errors.lastname}
                  label="Prezime"
                  margin="normal"
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Korisničko ime"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  select
                  error={Boolean(touched.DormitoryID && errors.DormitoryID)}
                  fullWidth
                  helperText={touched.DormitoryID && errors.DormitoryID}
                  label="Studentski dom"
                  margin="normal"
                  name="DormitoryID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.DormitoryID}
                  variant="outlined"
                >
                  {dormitories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="E-pošta"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
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
                    Registriraj se
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Već imaš račun?
                  {' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Prijavi se
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

export default Register;
