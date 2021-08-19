import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const EventListResults = ({ eventList, eventTypeList, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
              {eventList.slice(0, limit).map((event) => (
                <TableRow hover key={event.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {event.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{eventTypeList.find((element) => element.id === event.eventTypeId) ? eventTypeList.find((element) => element.id === event.eventTypeId).name : ' '}</TableCell>
                  <TableCell>
                    {moment(event.dateFrom).format('DD/MM/YY HH:mm')}
                  </TableCell>
                  <TableCell>
                    {moment(event.dateTo).format('DD/MM/YY HH:mm')}
                  </TableCell>
                  <TableCell>{event.limit}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    <IconButton color="inherit">
                      <CheckIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={eventList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EventListResults.propTypes = {
  eventList: PropTypes.array.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default EventListResults;
