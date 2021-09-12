import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import MyAdDialogBox from './MyAdDialogBox';

const MyAdListResults = ({ adList, ...rest }) => {
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const rows = adList.map((a) => {
    return {
      ...a,
      adType: a.adType.name
    };
  });

  const columns = [
    { field: 'name', headerName: 'Ime', width: 200 },
    { field: 'adType', headerName: 'Tip događaja', width: 200 },
    {
      field: 'description',
      headerName: 'Opis',
      width: 550,
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
    },
    {
      field: 'delete',
      headerName: 'Obriši',
      width: 200,
      renderCell: (params) => (
        <>
            <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
            onClick={(params, event) => {
            }}
          >
            Obriši
          </Button>
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
            if (params.field === 'description') {
              setOpen(true);
              setDescription(params.row.description);
            }
            if (params.field === 'delete') {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              };
  
              const response = axios
                .delete(
                  `http://localhost:5000/api/ads/${params.row.id}`,
                  config
                )
                .then((text) => {
                  window.location.reload(true);
                })
                .catch((error) => {
                  window.location.reload(true);
                });
            }
          }}
        />
      </div>
      <MyAdDialogBox
        open={open}
        onClose={handleClose}
        description={description}
      />
    </>
  );
};

MyAdListResults.propTypes = {
  adList: PropTypes.array.isRequired
};

export default MyAdListResults;
