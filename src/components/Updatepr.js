import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Updatepr(props) {

    const [open, setOpen] = useState(false);
    const [pr, setPr] = useState({exercise: '', weight: '', reps: '', rpe: '', date: '' });


    //Called when opening the editing window, loads list object 
    const handleClickOpen = () => {
        setPr({
            exercise: props.pr.exercise.name, 
            weight: props.pr.weight,
            reps: props.pr.reps, 
            rpe: props.pr.rpe,
            date: props.pr.date
            });
            setOpen(true);
    }

    //Called when saving changes
    const handleClose = () => {
        props.editPr('https://op-trainingtrackerb.herokuapp.com/prs', pr);
        setOpen(false);
    }

    //Cancel editing object
    const handleCancel = () => {
        setOpen(false);
    }

    //Updates textfields
    const inputChanged = (event) => {
        setPr({...pr, [event.target.name]: event.target.value});
    }



    return(
        <div>
        <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit PR</DialogTitle>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="exercise"
                        name="exercise"
                        value={pr.exercise.name}
                        onChange={inputChanged}
                        label="Exercise"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="weight"
                        name="weight"
                        value={pr.weight}
                        onChange={inputChanged}
                        label="Weight"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="reps"
                        name="reps"
                        value={pr.reps}
                        onChange={inputChanged}
                        label="Reps"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="rpe"
                        name="rpe"
                        value={pr.rpe}
                        onChange={inputChanged}
                        label="RPE"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="date"
                        name="date"
                        value={pr.date}
                        onChange={inputChanged}
                        label="Date"
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