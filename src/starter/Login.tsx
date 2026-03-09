import React, { useEffect, useRef, useState } from 'react';
import '../styles/login.css';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import CommonService from '../services/CommonService';
import { Toast } from 'primereact/toast';

const Login = () => {
    const [email, setEmail] = useState('');
    console.log(email);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);  
   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // 🔎 Basic Frontend Validation
  if (!email || !password) {
    toast.current?.show({
      severity: "warn",
      summary: "Validation Error",
      detail: "Email and Password are required",
      life: 3000,
    });
    return;
  }

  // 📧 Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.current?.show({
      severity: "warn",
      summary: "Invalid Email",
      detail: "Please enter a valid email address",
      life: 3000,
    });
    return;
  }

  try {
    const apiname = "admin/login";
    const parameters = { email, password };

    const LoginData = await CommonService.postData(parameters, apiname);

    if (LoginData.success) {
      // ✅ Store session data
      window.sessionStorage.setItem("userid", LoginData.data.id);
      window.sessionStorage.setItem("username", LoginData.data.firstName);
      window.sessionStorage.setItem("usertype", LoginData.data.userType);
      window.sessionStorage.setItem("email", LoginData.data.email);
      console.log("usertype",LoginData.data?.userType)
      if(LoginData.data?.userType == 'admin'){
      navigate("/admin/dashboard");
      }else{
        console.log('entered else')
        navigate('/manager/mdashboard');
      }
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Login Failed",
        detail: LoginData.message || "Invalid email or password",
        life: 3000,
      });
    }
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Server Error",
      detail: "Something went wrong. Please try again.",
      life: 3000,
    });
  }
};
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
                <Toast ref={toast}></Toast>
        </div>
  )
}

export default Login