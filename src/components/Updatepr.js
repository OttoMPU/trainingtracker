import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Updatepr(props) {

    const [open, setOpen] = useState(false);
    const [pr, setPr] = useState({weight: '', reps: '', rpe: '', date: '' });
    const [exercise, setExercise] = useState('');


    //Called when opening the editing window, loads list object 
    const handleClickOpen = () => {
        setPr({
            weight: props.pr.weight,
            reps: props.pr.reps, 
            rpe: props.pr.rpe,
            date: props.pr.date
            });
        getExercise();
        setOpen(true);
    }

    //Called when saving changes
    const handleClose = () => {
        props.editPr(props.pr._links.pR.href , pr);
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

    //Fetch function for exercise
    const getExercise = () => {
            fetch(props.pr._links.exercise.href)
            .then(response => response.json())
            .then(data => setExercise(data.name))
            .catch(err => console.error(err))
        }

    const titlestyle = {
        marginLeft: '4%',    
    } 

    return(
        <div>
        <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit PR</DialogTitle>

                <a style={titlestyle}>
                    {exercise}
                </a>

                <DialogContent>
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