import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Updateexercise(props) {

    const [open, setOpen] = useState(false);
    const [exercise, setExercise] = useState({name: ''});


    //Called when opening the editing window, loads list object 
    const handleClickOpen = () => {
        setExercise({ 
            name: props.exercise.name,
            });
            setOpen(true);
            console.log(props.exercise._links.exercise.href)
    }

    //Called when saving changes
    const handleClose = () => {
        props.editExercise(props.exercise._links.exercise.href, exercise);
        setOpen(false);
    }

    //Cancel editing object
    const handleCancel = () => {
        setOpen(false);
    }

    //Updates textfields
    const inputChanged = (event) => {
        setExercise({...exercise, [event.target.name]: event.target.value});
    }

    return(
        <div>
        <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit exercise</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        name="name"
                        value={exercise.name}
                        onChange={inputChanged}
                        label="Name"
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