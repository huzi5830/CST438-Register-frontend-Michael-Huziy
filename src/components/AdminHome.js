import React, { useState, useEffect } from 'react';
import UpdateStudent from './UpdateStudent';
import AddCourse from './AddCourse';
import AddStudent from './AddStudent';

const AdminHome = ()  => {
  const [students, setStudents] = useState([]);
    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )

    const updateStudent = (student) => {
      console.log(student)
      console.log(student.id)
      fetch(`http://localhost:8080/updateStudent/${student.id}`,
      {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
      })
      .then(res => {
          if (res.ok) {
          console.log("student Added ");
          fetchStudents()
          } else {
          console.log('error' + res.status);
          }})
      .catch(err => {
          console.error("exception addStudent"+ err);
      })
     }

    const dropStudent = (id, name) => {
      console.log("INSIDE DELETE")
      console.log(id)
      if (window.confirm("WARNING: Are you sure you want to delete \"" + name + "\" from the list?") ){
        console.log("Deleting student")
        fetch(`http://localhost:8080/deleteStudent/${id}`,
        {
        method: 'DELETE',
        }
        )
        .then(res => {
        if (res.ok) {
          console.log("drop ok");
          fetchStudents()
        } else {
          console.log("drop had an error");
        }
      })
      .catch( (err) => {
        console.log("exception dropCourse "+err);

      } );
  
    }
  }

    const fetchStudents = () => {
      fetch('http://localhost:8080/students')
      .then(response => { return response.json(); }) 
      .then(data => { 
        console.log("Data received from API:", data);
        const dataType = typeof data[0];
        //console.log(data[0].email);
        setStudents(data); })
      .catch((err) =>  { 
        console.log("exception fetchStudents"+err);
     } )

		//TODO complete this method to fetch students and display list of students
    }
    const  addCourse = (course_id) => {
     console.log("here")
    }
    const  addStudent= (newStudent) => {
      console.log(newStudent)
      fetch('http://localhost:8080/addStudent',
      { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudent),
          })
      .then(res => {
          if (res.ok) {
          console.log("addStudentok");
          fetchStudents();
          } else {
          console.log('error addStudent' + res.status);
          }})
      .catch(err => {
          console.error("exception addStudent"+ err);
      })
     }

    const headers = ['ID', 'Name', 'Email', 'Status Code', 'Status'];
    console.log()
    return (
        <div> 
        <div margin="auto" >
          <h3>Student List</h3>
          <AddStudent addStudent = {addStudent} /><br></br>
          <table className="Center"> 
                    <thead>
                    <tr>
                        {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                        <th id = "actions"> Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((row,idx) => (
                      <tr key={idx}>

                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td >{row.statusCode}</td>
                      {(row.status != null) ? <td> {row.status}</td> : <td>No Status</td>}
                      <td id = "actions"> <UpdateStudent updateStudent = {updateStudent} student = {row}/>
                      <button type="button" style={{ marginLeft: '10px' }} id="dropbtn" margin="auto"   onClick={() => dropStudent(row.id,row.name )}>Drop</button>
                      </td>

                      </tr>
                        ))}
                    </tbody>
                </table>
    
        </div>
      </div>
    )
}

export default AdminHome;
