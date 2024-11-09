import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Login () {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [passwordError, setpasswordError] = useState('')
  const [emailError, setemailError] = useState('')

  const location = useLocation()
  const role = location.state?.role || 'defaultRole'

  const navigate = useNavigate()
  const validateInputs = () => {
    let valid = true

    if (!email) {
      setemailError('Vui lòng nhập email')
      valid = false
    } else {
      setemailError('')
    }

    if (!password) {
      setpasswordError('vui lòng nhập mật khẩu')
      valid = false
    } else {
      setpasswordError('')
    }

    return valid
  }

  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        const response = await fetch(`http://localhost:8080/loginfull`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            role:role
          })
        })
        const data = await response.json()
        if (data.message) {
          window.confirm(data.message)
        }
        else{
            window.confirm('đăng nhập thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='register-container'>
      <h2 className='register-title'>Đăng nhập</h2>
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={e => setemail(e.target.value)}
      />
      <br />

      <input
        type='password'
        placeholder='Mật khẩu'
        name='password'
        value={password}
        onChange={e => setpassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  )
}

export default Login
