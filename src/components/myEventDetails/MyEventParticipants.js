import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DialogBox from './DialogBox';
import OpenDialogButton from './OpenDialogButton';
import getNestedObject from '../../utils/get_nested_object';

const MyEventParticipants = ({ fetchedEvent, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [dialogValue, setDialogValue] = useState();

  const handleExplanation = (event) => {
    setExplanation(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let data;
  const participants = getNestedObject(fetchedEvent, ['participants']);
  let status = '';

  if (typeof participants !== 'undefined') {
    const participantsQuantity = participants.filter((p) => p.accepted).length;
    data = participants.map((participant) => (
      <TableRow key={participant.userId}>
        <TableCell>
          {participant.user.firstName + ' ' + participant.user.lastName}
        </TableCell>
        <TableCell>
          {
            (status =
              participant.accepted === false
                ? participant.declined === false
                  ? 'U tijeku'
                  : 'Odbijen'
                : 'Prihvaćen')
          }
        </TableCell>
        <TableCell>
          {status === 'U tijeku' & participantsQuantity < fetchedEvent.limit ? (
            <OpenDialogButton
              onOpen={() => {
                setDialogValue(participant);
                setOpen(true);
              }}
            />
          ) : (
            ''
          )}
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
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{data}</TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <DialogBox
        open={open}
        onClose={handleClose}
        setExplanation={handleExplanation}
        explanation={explanation}
        dialogValue={dialogValue}
      />
    </Card>
  );
};

export default MyEventParticipants;
