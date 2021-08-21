import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <Typography color="#FFFFFF" variant="h2">
          Domus
        </Typography>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
