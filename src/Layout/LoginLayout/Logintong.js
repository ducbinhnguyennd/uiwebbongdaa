import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logintong.scss'
// import { publicRoutes } from '../../router'

function Logintong  ()  {
const navigate = useNavigate();
  return (
    <div>
      <div className="tieudebongda">
        <img
          src={require('../../assets/images/bongda2.png')}
          alt="Logo"
          className="imgbongda"
        />
        <div className="texttieude">
          <h1 className="h1bongda">HELLO</h1>
          <h1 className="h2bongda">STADIUM</h1>
        </div>
      </div>
      
      <div className="loichao">
        <h1 className="h1loichao">Chào mừng bạn đến với sân bóng Hello</h1>
        <h1 className="h2loichao">Bạn là ai?</h1>
      </div>
      
      <div className="divbtnlogin">
      <button 
      className="btnlogin" 
      onClick={() => navigate('/register')} 
    >
      Người dùng
    </button>
        <form action="/loginstaff">
          <button className="btnlogin" type="submit">Nhân viên</button>
        </form>
        <form action="/loginadmin">
          <button className="btnlogin" type="submit">Chủ sân</button>
        </form>
      </div>
    </div>
  );
};

export default Logintong;

