import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const DialogContent = withStyles(() => ({
  root: {
    maxWidth: '400px'
  },
}))(MuiDialogContent);

const MyAdDialogBox = (props) => {
  const { onClose, open, description } = props;

  return (
    <Dialog open={open} maxWidth="lg">
      <DialogTitle id="title">Opis oglasa:</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onClose();
          }}
        >
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyAdDialogBox;
