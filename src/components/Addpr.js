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
    const [pr, setPr] = useState({exercise: '', weight: '', reps: '', rpe: '', date: '' });
    const [exerciselist, setExerciselist] = useState([]);
    const [exercise, setExercise] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        getExercises();
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

    const selectstyle = {
      marginLeft: "5%"
  }

      //Fetch function for exercise select
      const getExercises = () => {
        fetch('https://op-trainingtrackerb.herokuapp.com/exercises')
        .then(response => response.json())
        .then(data => setExerciselist(data))
        .catch(err => console.error(err))
    }

    //Select menu updating
    const handleChange = (event) => {
      setExercise({...exercise, [event.target.name]: event.target.value});
  }

    //Select menu items
    const options = exerciselist.map((exercise) => 
            [ {value: exercise.exerciseid, label: exercise.name} ]
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
         style={selectstyle}
         options={options}
         onChange={handleChange}
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