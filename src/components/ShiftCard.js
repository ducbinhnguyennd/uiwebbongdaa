import React from 'react'
import './ShiftCard.scss'

const ShiftCard = ({ shift }) => {
  const currentDate = new Date().toLocaleDateString('vi-VN')

  return (
    <div className='divshiftitem'>
      {shift.ca.map((ca, index) => (
        <div className='shift-card'>
          <div className='shift-header'>
            <input type='checkbox' />
            <div className='divheadershiftcon'>
            <h3>{ca.tenca} </h3>
            <p>Loại sân: {ca.loaisan}</p>
            </div>
          </div>
          <div className='shift-details'>
            <p>📅 {currentDate}</p>
            <p>🕒 {`${ca.begintime} - ${ca.endtime}`}</p>
            <p>💵 {ca.giaca}</p>
            <button className='status-btn'>Đang trống</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShiftCard
