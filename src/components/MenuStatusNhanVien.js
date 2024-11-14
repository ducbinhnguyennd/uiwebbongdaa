import React, { useEffect, useState } from 'react'
import './MenuStatusNhanVien.scss'

const MenuStatusNhanVien = () => {
  const [data, setdata] = useState({})
  const fetchSoluongca = async () => {
    try {
      const response = await fetch(`http://localhost:8080/soluongsan`)
      if (response.ok) {
        const data = await response.json()
        setdata(data)
        console.log(data)
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchSoluongca()
  }, [])
  return (
    <div className='menu-status'>
      <div className='status-item'>
        <span className='status-icon all-icon'>{data.soluongCaTong}</span>
        <p>Tất cả</p>
      </div>
      <div className='status-item'>
        <span className='status-icon available-icon'>
          {data.soluongCaTrong}
        </span>
        <p>Đang trống</p>
      </div>
      <div className='status-item'>
        <span className='status-icon waiting-icon'>
          {data.soluongCaChoNhanSan}
        </span>
        <p>Chờ nhận sân</p>
      </div>
      <div className='status-item'>
        <span className='status-icon payment-icon'>0</span>
        <p>Chờ thanh toán</p>
      </div>
      <div className='status-item'>
        <span className='status-icon active-icon'>
          {data.soluongCaHoatDong}
        </span>
        <p>Đang hoạt động</p>
      </div>
      <div className='status-item'>
        <span className='status-icon quagio-icon'>{data.soluongCaQuaGio}</span>
        <p>Quá giờ</p>
      </div>
    </div>
  )
}

export default MenuStatusNhanVien
