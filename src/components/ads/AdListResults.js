import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AdDialogBox from './AdDialogBox';

const AdListResults = ({ adList, ...rest }) => {
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('f');

  const handleClose = () => {
    setOpen(false);
  };

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
    {
      field: 'description',
      headerName: 'Opis',
      width: 500,
      renderCell: (params) => (
        <>
            <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
            onClick={(params, event) => {
              setOpen(true);
            }}
          >
            Više
          </Button>
          {params.value}
        </>
      )
    }
  ];

  return (
    <>
      <div style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onCellClick={(params, event) => {
            setDescription(params.row.description);
          }}
        />
      </div>
      <AdDialogBox
        open={open}
        onClose={handleClose}
        description={description}
      />
    </>
  );
};

AdListResults.propTypes = {
  adList: PropTypes.array.isRequired
};

export default AdListResults;
