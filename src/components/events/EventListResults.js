import PropTypes from 'prop-types';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';

const EventListResults = ({ eventList, ...rest }) => {

  const rows = eventList.map((e) => {
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
    { field: 'details', headerName: 'Više', width: 170 }
  ];

  return (
    <div style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={(params, event) => {
          if (params.field === 'details') {
            window.location.pathname = 'app/events/' + params.id;
          }
        }}
      />
    </div>
  );
};

EventListResults.propTypes = {
  eventList: PropTypes.array.isRequired
};

export default EventListResults;
