import React, { useState } from 'react';
import Header from '../components/Header';
import { Github, Google } from 'react-bootstrap-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    loginError: '',
  });

  let github_url = `${process.env.REACT_APP_BACKEND_URL}/auth/github`;
  let google_url = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, formData, {withCredentials: true})
        .then((res) => {
          console.log(res.data);
          navigate("/")
          // where the redirect code goes
        })
        .catch((error) => {
          console.error(error);
          // setFormErrors({...formErrors, loginError: error.response.data.error})
          // navigate("/login")
        });
    }
  };

  return (
    <>
      <Header />
      <main className='center'>
        <div className='cover'>
          <h1 className="font-monospace">LOGIN</h1>
          <div className="input-group">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.password && <div className="form-error">{formErrors.password}</div>}
                {formErrors.loginError && <div className="form-error">{formErrors.loginError}</div>}
              <button onClick={handleSubmit} className='login-btn'>Login</button>
            </form>
          </div>
          <p className='text'>Or login using</p>
          <div className='alt-login'>
            <a href={github_url}><Github size={32} color="white" /></a>
            <a href={google_url}><Google size={32} color="#D24F40" /></a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
