/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
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
import getNestedObject from '../../utils/get_nested_object';

const MyAdListResults = ({ adList, ...rest }) => (
  <Card {...rest}>
    <PerfectScrollbar>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Naziv</TableCell>
              <TableCell>Tip oglasa</TableCell>
              <TableCell>Opis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adList.map((ad) => (
              <TableRow hover key={ad.id}>
                <TableCell>{ad.name}</TableCell>
                <TableCell>
                  {getNestedObject(ad, ['user', 'firstName']) +
                    ' ' +
                    getNestedObject(ad, ['user', 'lastName'])}
                </TableCell>
                <TableCell>{ad.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);

MyAdListResults.propTypes = {
  adList: PropTypes.array.isRequired,
};

export default MyAdListResults;
