import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Addpr(props) {
 
    const [open, setOpen] = useState(false);
    const [pr, setPr] = useState({exercise: '', weight: '', reps: '', rpe: '', date: '' });

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        props.addPr(pr);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setPr({...pr, [event.target.name]: event.target.value});
    }



    return(
<div>
    <Button style={{marginLeft:"50%", marginTop:"3%", marginBottom:"1%"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a pr
    </Button>
      <Dialog open={open} disableBackdropClick={true}  onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New pr</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="exercise"
            name="exercise"
            value= {pr.exercise}
            onChange={inputChanged}
            label="exercise"
            fullWidth
          />
        <TextField
            margin="dense"
            id="weight"
            name="weight"
            value={pr.weight}
            onChange={inputChanged}
            label="weight"
            fullWidth
          />
        <TextField
            margin="dense"
            id="reps"
            name="reps"
            value={pr.reps}
            onChange={inputChanged}
            label="reps"
            fullWidth
          />
        <TextField
            margin="dense"
            id="rpe"
            name="rpe"
            value={pr.rpe}
            onChange={inputChanged}
            label="rpe"
            fullWidth
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            value={pr.date}
            onChange={inputChanged}
            label="date"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
</div>
    )
}