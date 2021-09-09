import { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import appContext from 'src/store/app_context';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import getNestedObject from '../../utils/get_nested_object';

const MyEventListResults = ({ eventList, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Naziv</TableCell>
                <TableCell>Tip događaja</TableCell>
                <TableCell>Vrijeme početka</TableCell>
                <TableCell>Vrijeme završetka</TableCell>
                <TableCell>Broj sudionika</TableCell>
                <TableCell>Opis</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {eventList.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    {getNestedObject(event, ['eventType', 'name'])}
                  </TableCell>
                  <TableCell>
                    {moment(event.dateFrom).format('DD/MM/YY HH:mm')}
                  </TableCell>
                  <TableCell>
                    {moment(event.dateTo).format('DD/MM/YY HH:mm')}
                  </TableCell>
                  <TableCell>{event.limit}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    <RouterLink to={`${event.id}`} style={{}}>
                      <IconButton color="inherit">
                        <InfoIcon />
                      </IconButton>
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

MyEventListResults.propTypes = {
  eventList: PropTypes.array.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default MyEventListResults;
