import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const AdListResults = ({ adList, ...rest }) => {
  const rows = adList.map((a) => {
    return {
      ...a,
      adType: a.adType.name,
      user: a.user.firstName + ' ' + a.user.lastName
    };
  });

  const columns = [
    { field: 'name', headerName: 'Ime', width: 200 },
    { field: 'user', headerName: 'Oglašivač', width: 200 },
    { field: 'adType', headerName: 'Tip događaja', width: 200 },
    { field: 'description', headerName: 'Opis', width: 500 },
  ];

  return (
    <div style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

AdListResults.propTypes = {
  adList: PropTypes.array.isRequired
};

export default AdListResults;
