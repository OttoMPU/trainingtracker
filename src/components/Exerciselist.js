import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Updateexercise from './Updateexercise'
import Addexercise from './Addexercise'

export default function Exerciselist(){

    const [exercises, setExercises] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getExercises();
    }, [] )

    const getExercises = () => {
        fetch('https://op-trainingtrackerb.herokuapp.com/api/exercises')
        .then(response => response.json())
        .then(data => setExercises(data._embedded.exercises))
        .catch(err => console.error(err))
    }

    //Edit existing list object
    const editExercise = (link, exercise) => {
        fetch(link,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(exercise)
        })
        .then(_ => getExercises())
        .then(_ => {
            setMsg('Exercise updated');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

        //Adding a new list object
        const addExercise = (exercise) => {
            fetch('https://op-trainingtrackerb.herokuapp.com/api/exercises',
                {
                    method: 'POST', 
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(exercise)
                }
            )
            .then(_ => getExercises())
            .then(_ => {
                setMsg('New exercise added!');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }

    //Close message box
    const handleClose = () => {
        setOpen(false);
    }

    const exercisecolumns = [
        {
            Header: 'Exercise',
            accessor: 'name'
        },
        {
            Cell: row => (<Updateexercise exercise={row.original} editExercise={editExercise} />)
        }
    ]

    const columnstyle = {
        textAlign: "center",
        marginLeft: "11%",
        marginTop: "3%"
    }

    return(

        <div>
        <ReactTable defaultPageSize={10} filterable={true} data={exercises} columns={exercisecolumns} style={columnstyle} />
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
            }}
        /> 
        <Addexercise addExercise={addExercise} />

    </div>

    );
}