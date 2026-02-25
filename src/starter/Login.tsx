import React, { useState } from 'react';
import '../styles/login.css';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('abhiabhu24@gmail.com');
    console.log(email);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        if(email === 'abhiabhu24@gmail.com' && password === '123456') {
            alert('Login successful!');
            navigate('/user/dashboard'); // Redirect to dashboard or home page after successful login
        } else {
            alert('Invalid email or password');
        }
    }
  return (
        <div className='contianer-fluid login-page'>
            <div className='row vh-100'>
                <div className='col-md-7 d-none d-md-block'></div>
                <div className='col-md-5 d-flex justify-content-center align-items-center'>
                    <div className='card shadow p-4' style={{width:'350px'}}>
                        <h3 className='text-center mb-4'>Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='email' className='form-label'>Email address</label>
                                <InputText id='email' type='email' value={email} className='form-control' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <InputText id='password' type='password' value={password} className='form-control' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                                <div className='d-grid'>
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                </div>
                                <div className='mt-3 text-center'>
                                    <a href='#'>Forgot password?</a>
                                </div>
                                <div className='mt-2 text-center'>
                                    <span>Don't have an account? </span><a href='/register'>Sign up</a>
                                </div>
                        </form>
                    </div>
                </div>
                </div>
        </div>
  )
}

export default Login