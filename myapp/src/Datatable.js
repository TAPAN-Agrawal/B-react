import React, { useEffect, useState } from 'react'
import './Datatable.css'
import { useNavigate } from 'react-router-dom'

function Datatable() {
const navigate = useNavigate();
    const [data,setData]=useState([])
    
  
    useEffect(() => {
        if(localStorage.getItem("token")){
            const token = localStorage.getItem("token")
            console.log(token)

            fetch("https://login-reactapi.onrender.com/api/admin/getAdmin",{
            headers: {
                Authorization: token
            }
        }
            ).then((res) => {
                return res.json();
      
            }).then((resp) => {
               setData(resp.data.adminData)
            }).catch((err) => {
                console.log(err.message);
            })
        }else{
            navigate("/login")
        }}, [])
    

  return (
    <div>
        <button onClick={()=>{localStorage.removeItem("token");navigate("/login")}}>Logout</button>
    <table>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
           <td>{item.email}</td>
           <td>{new Date(item.dob).toLocaleDateString()}</td>
           <td><button>Edit</button>
           <button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Datatable