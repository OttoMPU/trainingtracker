import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import Addpr from './Addpr';
import Updatepr from './Updatepr';

export default function Prlist(){

    const [prs, setPrs] = useState([]);
    const [prlist, setPrlist] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [exercise, setExercise] = useState('');

    //Loads table data when page is opened
    useEffect(() => {
        getPrs();
    }, [] )

    //Table data fetch
    const getPrs = () => {
        fetch('https://op-trainingtrackerb.herokuapp.com/api/pRs')
        .then(response => response.json())
        .then(data => setPrs(data._embedded.pRs))
        .catch(err => console.error(err))
    }

    //PR delete function
    const deletePR = (link) =>{
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getPrs())              
            .then(_ => {
                setMsg('Pr deleted');
                setOpen(true)
            })
            .catch(err => console.error(err))
            }
    }

    //Adding a new list object
    const addPr = (pr) => {
        fetch('https://op-trainingtrackerb.herokuapp.com/prs',
            {
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(pr)
            }
        )
        .then(_ => getPrs())
        .then(_ => {
            setMsg('New pr added!');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    //Edit existing list object
    const editPr = (link, pr) => {
        fetch(link,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pr)
        })
        .then(_ => getPrs())
        .then(_ => {
            setMsg('PR updated');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    //Sidebar closing
    const handleClose = () => {
        setOpen(false);
    }

    //Table columns
    const prcolumns = [
        {
         Header: 'Exercise',
         accessor: 'Exercise'
        },
        {
         Header: 'Weight',
         accessor: 'weight'
        },
        {
            Header: 'Reps',
            accessor: 'reps'
        },
        {
            Header: 'RPE',
            accessor: 'rpe'
        },
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Cell: row => (<Updatepr pr={row.original} editPr={editPr} />)
        },
        {
            Cell: row => (<Button onClick={() => deletePR(row.original._links.pR.href )} > Delete </Button> )
        }
    ]

    //Table style
    const columnstyle = {
        textAlign: "center",
        marginLeft: "11%",
        marginTop: "3%"
    }

    return(
        <div>

            <ReactTable defaultPageSize={10} filterable={true} data={prs} columns={prcolumns} style={columnstyle} />
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
            <Addpr addPr={addPr}/>

        </div>
    );
}