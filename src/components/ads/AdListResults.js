/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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

const AdListResults = ({ adList, adTypeList, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (ad) => {
    setLimit(ad.target.value);
  };

  const handlePageChange = (ad, newPage) => {
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
                <TableCell>Tip oglasa</TableCell>
                <TableCell>Opis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adList.slice(0, limit).map((ad) => (
                <TableRow hover key={ad.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {ad.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{adTypeList.find((element) => element.id == ad.adTypeId) ? adTypeList.find((element) => element.id == ad.adTypeId).name : ' '}</TableCell>
                  <TableCell>{ad.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={adList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AdListResults.propTypes = {
  adList: PropTypes.array.isRequired,
  adTypeList: PropTypes.array.isRequired
};

export default AdListResults;
