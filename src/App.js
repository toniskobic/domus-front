import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import appContext, { useStore } from 'src/store/app_context';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const routing = useRoutes(routes);
  const {state, dispatchStore} = useStore();

  return (
    <ThemeProvider theme={theme}>
      <appContext.Provider value={{state, dispatchStore}}>
        <GlobalStyles />
        {routing}
      </appContext.Provider>
    </ThemeProvider>
  );
};

export default App;
