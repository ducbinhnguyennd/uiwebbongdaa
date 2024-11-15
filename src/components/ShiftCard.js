import React, { useState } from 'react'
import './ShiftCard.scss'

const ShiftCard = ({ shift }) => {
  const currentDate = new Date().toLocaleDateString('vi-VN')


  const getButtonClass = trangthai => {
    const status =trangthai
    return status === 'Quá giờ' ? 'status-btn overdue' : 'status-btn'
  }

  const [checkedItems, setCheckedItems] = useState({})

  const handleCheckboxChange = (caId, trangthai) => {
    const status = trangthai
    if (status === 'Quá giờ') {
      alert('Ca đã quá giờ. Không thể chọn!')
    } else {
      setCheckedItems(prev => ({
        ...prev,
        [caId]: !prev[caId]
      }))
    }
  }

  return (
    <div className='divshiftitem'>
      {shift.ca.map((ca, index) => (
        <div className='shift-card' key={ca._id}>
          <div className='shift-header'>
            <input
              type='checkbox'
              onChange={() => handleCheckboxChange(ca._id, ca.trangthai)}
              checked={checkedItems[ca._id] || false}
            />
            <div className='divheadershiftcon'>
              <h3>{ca.tenca} </h3>
              <p>Loại sân: {ca.loaisan}</p>
            </div>
          </div>
          <div className='shift-details'>
            <p>📅 {currentDate}</p>
            <p>🕒 {`${ca.begintime} - ${ca.endtime}`}</p>
            <p>💵 {ca.giaca.toLocaleString()} đ</p>
            <button className={getButtonClass(ca.trangthai)}>
              {ca.trangthai}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShiftCard
