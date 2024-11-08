import React, { useState } from 'react';
import './Register.scss'

function Register() {
  const [formData, setFormData] = useState({
    hovaten: '',
    email: '',
    phone: '',
    password: ''
  });

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây bạn có thể xử lý gửi dữ liệu đến server
    console.log('Dữ liệu đăng ký:', formData);
    // Ví dụ: gọi API để gửi dữ liệu form đi
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Đăng ký người dùng</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          name="hovaten"
          value={formData.hovaten}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Mật khẩu"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <input type="submit" value="Đăng ký" />
      </form>
    </div>
  );
}

export default Register;
