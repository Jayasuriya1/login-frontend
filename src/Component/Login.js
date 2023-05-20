import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { url } from '../App';
import {toast} from 'react-toastify'
import{useNavigate} from 'react-router-dom'

function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(()=>{
      sessionStorage.clear()
    },[])
    const Navigate = useNavigate()

    const login = async() => {
        const payLoad = {email,password}
        
        try {
          const res = await axios.post(`${url}/users/login`,payLoad)
          console.log(res)
          toast.success(res.data.message)
          sessionStorage.setItem('token',res.data.token)
          Navigate('/dashboard')
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }

    }
  return (
    <div className='loginContainer'>
        <h1 style={{textAlign:"center"}}>Login Here!</h1>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Button onClick={()=>login()} variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;