import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Addpr(props) {
 
    const [open, setOpen] = useState(false);
    const [exercise, setExercise] = useState({name: ''});

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    //Called when saving exercise
    const handleClose = () => {
        props.addExercise(exercise);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    //Text field updating
    const inputChanged = (event) => {
        setExercise({...exercise, [event.target.name]: event.target.value});
    }

    return(
<div>
    <Button style={{marginLeft:"50%", marginTop:"3%", marginBottom:"1%"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add an exercise
    </Button>
      <Dialog open={open} disableBackdropClick={true}  onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New exercise</DialogTitle>
        <DialogContent>   

        <TextField
            margin="dense"
            id="name"
            name="name"
            value={exercise.name}
            onChange={inputChanged}
            label="Exercise name"
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