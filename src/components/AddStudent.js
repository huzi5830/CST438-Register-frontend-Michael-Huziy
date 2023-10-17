import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../App.css'

// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student,setStudent] = useState({
    id : '',
    name: '',
    email: '',
    statusCode: '',
    status: '',
  })
  const[valid,setValid] = useState(true)

  useEffect(() => {
    if (!open) {
      setValid(true)
    }
  }, [open,valid]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name +"   "  + value)
    setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));

  };

  const isValidEmail = (email) =>{
    // Define a regex pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Use the test method to check if the email matches the pattern
    return emailPattern.test(email);
  }
  const handleAdd = () =>{
    if ( isValidEmail(student.email)){
        console.log("Valid")
        setOpen(false);
        props.addStudent(student);
    }
    else{
        console.log("invalid")
        setValid(false)
        const heading = document.querySelector("#msg");

        setTimeout(() => {
            setValid(true);
          }, 3000);
    }
    //console.log(student.name)
    //const newStudent = JSON.parse(JSON.stringify(student));
    //console.log(student.name)
  };

  return (
      <div>
        <button id="custom-button"  onClick={handleClickOpen}>
          Add New Student </button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{ textAlign:'center'}}>Add student</DialogTitle>

            <DialogContent id="content" >
            <TextField className="dialog-input" label="Name" name="name" onChange={handleChange}  /><br></br> 
            <TextField className="dialog-input" label="Email" name="email"onChange={handleChange}  /> <br></br>
            <TextField className="dialog-input" label="Status Code" name="statusCode" onChange={handleChange}  /> <br></br>
            <TextField className="dialog-input" label="Status " name="status" onChange={handleChange}  /> 
            {valid ? null : <h5 id="msg"class="appear"style={{color:'red'}}>Email is of invalid format</h5>}
            </DialogContent>

            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id = "addStudentBtn"color="secondary" onClick={handleAdd}>Add Student</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;