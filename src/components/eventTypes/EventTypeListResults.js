import PropTypes from 'prop-types';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const EventTypeListResults = ({ eventTypeList, ...rest }) => {
  const [pageSize, setPageSize] = useState(5);

  const rows = eventTypeList;

  const columns = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'name', headerName: 'Ime', width: 170 },
  ];

  return (
    <div style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

EventTypeListResults.propTypes = {
  eventTypeList: PropTypes.array.isRequired
};

export default EventTypeListResults;
