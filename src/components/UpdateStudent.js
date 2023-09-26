
import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../App.css'

// properties addCoure is required, function called when Add clicked.
function UpdateStudent(props) { 

  const [open, setOpen] = useState(false);
  const [id, set_id] = useState(0);
  const [student, setStudent] = useState(props.student);

  useEffect(() => {
    if (!open) {
      setStudent(props.student);
    }
  }, [open, props.student]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(name +"   "  + value)
    setStudent((prevStudent) => ({
      ...prevStudent,[name]: value,
    }));
  };

  const handleUpdate = () =>{
    //console.log(student.name)
    //const newStudent = JSON.parse(JSON.stringify(student));
    console.log(student.name)
    setOpen(false)
    props.updateStudent(student);
  };

  return (
      <div>
        <button id="updateStudent" className="custom-button"onClick={handleClickOpen}>
          Update Student
        </button>
        <Dialog open={open} onClose={handleClose}>
          {console.log("STUDENT ID: "+ student.id)}
            <DialogTitle>Update Student with ID: {student.id}</DialogTitle>

            <DialogContent id ="content">
              <TextField className="dialog-input" label="Name" name="name" value = {student.name} onChange={handleChange}/><br></br> 
              <TextField className="dialog-input" label="Email" name="email" value = {student.email} onChange={handleChange}/><br></br>
              <TextField className="dialog-input" label="Status Code" name="statusCode" value = {student.statusCode} onChange={handleChange}/><br></br> 
              <TextField className="dialog-input" label="Status" name="status" value = {student.status} onChange={handleChange}  /> 
            </DialogContent>

            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button color="secondary" onClick={handleUpdate}>Submit</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
UpdateStudent.propTypes = {
  updateStudent : PropTypes.func.isRequired
}

export default UpdateStudent;