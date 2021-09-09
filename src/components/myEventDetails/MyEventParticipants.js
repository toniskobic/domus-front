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

const MyEventParticipants = ({ fetchedEvent, ...rest }) => {
  let data;
  
  const participants = getNestedObject(fetchedEvent, ['participants']);

  if (typeof participants !== 'undefined') {
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
                <TableCell>Korisnici</TableCell>
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

export default MyEventParticipants;
