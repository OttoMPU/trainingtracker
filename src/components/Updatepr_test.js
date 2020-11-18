import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropdown from 'react-bootstrap/Dropdown';


export default function Updatepr(props) {

    const [open, setOpen] = useState(false);
    const [pr, setPr] = useState({weight: '', reps: '', rpe: '', date: '' });
    const [exerciselist, setExerciselist] = useState([]);


    //Called when opening the editing window, loads list object 
    const handleClickOpen = () => {
        setPr({ 
            weight: props.pr.weight,
            reps: props.pr.reps, 
            rpe: props.pr.rpe,
            date: props.pr.date
            });
            setOpen(true);
            getExercises();
    }

    //Fetch function for exercise dropdown data
    const getExercises = () => {
        fetch('https://op-trainingtrackerb.herokuapp.com/exercises')
        .then(response => response.json)
        .then(responseData => {
            setExerciselist(responseData._embedded.exercises)
        })
        .catch(err => console.error(err))
    }

    //Dropdown menu item list 
    const dropdownitems = exerciselist.map((exercise) => 
      <tr key={exercise.exerciseid}>  <Dropdown.Item > {exercise.name} </Dropdown.Item> </tr>
    )

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

    const dropdownstyle = {
        marginLeft: "5%"
    }

    return(
        <div>
        <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit PR</DialogTitle>
                <Dropdown style={dropdownstyle}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Exercises
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropdownitems}
                        </Dropdown.Menu>
                </Dropdown>
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