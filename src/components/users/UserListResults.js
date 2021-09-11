import PropTypes from 'prop-types';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const UserListResults = ({ userList, ...rest }) => {
  const [pageSize, setPageSize] = useState(5);

  const rows = userList.map((u) => {
    return {
      ...u,
      dormitory: u.dormitory.name
    };
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'firstName', headerName: 'Ime', width: 170 },
    { field: 'lastName', headerName: 'Prezime', width: 170 },
    { field: 'dormitory', headerName: 'Dom', width: 170 },
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

UserListResults.propTypes = {
  userList: PropTypes.array.isRequired
};

export default UserListResults;
