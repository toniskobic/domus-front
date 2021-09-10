import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import getNestedObject from '../../utils/get_nested_object';

const EventParticipants = ({ fetchedEvent, ...rest }) => {
  let data;
  
  let participants = getNestedObject(fetchedEvent, ['participants']);

  if (typeof participants !== 'undefined') {
    participants = participants.filter((participant) => participant.accepted == true)
    data = participants.map((participant) => (
      <TableRow key={participant.userId}>
        <TableCell>
          {participant.user.firstName + ' ' + participant.user.lastName}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sudionici</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default EventParticipants;
