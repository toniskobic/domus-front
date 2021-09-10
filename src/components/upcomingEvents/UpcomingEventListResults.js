import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const UpcomingEventListResults = ({ eventList, ...rest }) => {
  const [pageSize, setPageSize] = useState(5);

  const event = eventList.filter(e => e?.participants?.find(p => p?.userId == localStorage.getItem('id')));

  const rows = event.map((e) => { 
    return {
      ...e,
      eventType: e.eventType.name,
      details: 'Pregledaj',
      dateFrom: moment(e.dateFrom).format('DD/MM/YY HH:mm'),
      dateTo: moment(e.dateTo).format('DD/MM/YY HH:mm'),
      limit: `${e?.participants?.filter(p => p.accepted).length}/${e.limit}`
    };
  });

  const columns = [
    { field: 'name', headerName: 'Ime', width: 170 },
    { field: 'eventType', headerName: 'Tip događaja', width: 170 },
    { field: 'dateFrom', headerName: 'Datum početka', width: 170 },
    { field: 'dateTo', headerName: 'Datum završetka', width: 170 },
    { field: 'limit', headerName: 'Broj sudionika', width: 170 },
    { field: 'description', headerName: 'Opis', width: 170 },
    {
      field: 'details',
      headerName: 'Više',
      width: 170,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
          >
            Pregledaj
          </Button>
        </>
      )
    }
  ];

  return (
    <div style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        onCellClick={(params, event) => {
          if (params.field === 'details') {
            window.location.pathname = 'app/upcomingevents/' + params.id;
          }
        }}
      />
    </div>
  );
};

UpcomingEventListResults.propTypes = {
  eventList: PropTypes.array.isRequired
};

export default UpcomingEventListResults;
