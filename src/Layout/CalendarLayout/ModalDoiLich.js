/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

function ModalDoiLich ({ userId, idbooking, isOpen, onClose, fetchdata }) {
  const [data, setdata] = useState(null)
  const handleHuySan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/huysan/${idbooking}/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.ok) {
        alert('Hủy sân thành công')
        fetchdata()
        onClose()
      }
    } catch (error) {
      alert('đã xảy ra lỗi')
      console.log(error)
    }
  }
  const fetchchitiet = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getchitiebooking/${idbooking}`
      )
      const data = await response.json()
      if (response.ok) {
        setdata(data)
      }
    } catch (error) {
      alert('đã xảy ra lỗi')
      console.log(error)
    }
  }

  useEffect(() => {
    if(idbooking){
        fetchchitiet()

    }
    
  }, [idbooking])

  if (!isOpen) {
    return null
  }
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <input type='text' value={data.loaisanbong} disabled/>
        <input type='text' value={data.ca} disabled/>
        <input type='text' value={data.soluongsan} disabled/>
        <input type='text' value={data.giaca}disabled/>
        <input type='text' value={data.ngaydat} disabled/>
        <button onClick={handleHuySan}>Hủy sân</button>
      </div>
    </div>
  )
}

export default ModalDoiLich
