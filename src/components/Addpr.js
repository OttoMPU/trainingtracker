import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';


export default function Addpr(props) {
 
    const [open, setOpen] = useState(false);
    const [pr, setPr] = useState({exercise: [], weight: '', reps: '', rpe: '', date: '' }); // exercise is an object selected from dropdown
    const [exerciselist, setExerciselist] = useState([]);
    const [exercise, setExercise] = useState([]);

    //Called when opening window
    const handleClickOpen = () => {
        setOpen(true);
        getExercises();
    }
    
    //Called when saving new entry
    const handleClose = () => {
        props.addPr(pr);
        setOpen(false);
    }

    //Called when cancelling operation
    const handleCancel = () => {
        setOpen(false);
    }

    //Reads input data
    const inputChanged = (event) => {
        setPr({...pr, [event.target.name]: event.target.value});
    }

    const selectstyle = {
      marginLeft: "5%"
  }

      //Fetch function for exercise select
      const getExercises = () => {
        fetch('https://op-trainingtrackerb.herokuapp.com/api/exercises')
        .then(response => response.json())
        .then(data => setExerciselist(data._embedded.exercises))
        .catch(err => console.error(err))
    }

    //Select menu updating
    const handleChange = (event) => {
      setExercise({...exercise, [event.target.name]: event.target.value});
  }

    //Select menu items
    const options = exerciselist.map((item) => 
            [ {value: item.name, label: item.name} ]
          )

    return(
<div>
    <Button style={{marginLeft:"50%", marginTop:"3%", marginBottom:"1%"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a pr
    </Button>
      <Dialog open={open} disableBackdropClick={true}  onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New pr</DialogTitle>
        <DialogContent>
        
        <Select 
         value={pr.exercise}
         style={selectstyle}
         options={options}
         onChange={inputChanged}
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