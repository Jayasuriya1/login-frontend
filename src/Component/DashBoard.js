import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify' 
import { url } from "../App";
import axios from 'axios'
import Table from 'react-bootstrap/Table';


export default function DashBoard(){
    const [data,setData] = useState([])
    const token = sessionStorage.getItem('token')
    let navigate = useNavigate()

    const logout = () =>{
        sessionStorage.clear()
        navigate('/login')
    }

    const getData = async() =>{
        try {
            const res = await axios.get(`${url}/users`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            toast.success(res.data.message)
            setData(res.data.users)
            console.log(res.data.users)
        } catch (error) {
            if(error.response.status===402 || error.response.status===400){
                toast.error(error.response.data.message)
                logout()
            }
            
        }
    }

    useEffect(()=>{
        if(token){
            getData()
        }else{
            toast.error("Session Expired Login Again")
            logout()
        }
    },[])

    return (
      <div>
        <button onClick={()=>getData()}>refrash</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data,index)=>{
                return (
                  <tr key={data._id}>
                    <td>{index+1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.mobile}</td>
                    <td>{data.role}</td>
                  </tr>
                );
            })}
          </tbody>
        </Table>
      </div>
    );
}