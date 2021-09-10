import {
    Button,
  } from '@material-ui/core';

const OpenDialogButton = (props) => {
    const { onOpen } = props;
  
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          onOpen();
        }}
      >
        Odgovori
      </Button>
    );
  };

export default OpenDialogButton;
