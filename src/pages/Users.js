import { Helmet } from 'react-helmet';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import UserListResults from '../components/users/UserListResults'

const Users = (props) => {
  const navigate = useNavigate();
  const { state, dispatchStore } = useContext(appContext);

  useEffect(() => {
    if(localStorage.getItem('role') !== 'Admin') {
      navigate('/events', { replace: true });
    }
    const fetchUsers = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspUsers = await axios.get(
        'http://localhost:5000/api/users',
        config
      );

      const fetchedUsers = await rspUsers.data;

      dispatchStore({
        type: 'CHANGE_USERS',
        payload: {users: fetchedUsers}
      });

    };
    fetchUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Korisnici</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <UserListResults
              userList={state.users}
            />
        </Container>
      </Box>
    </>
  );
};

export default Users;
