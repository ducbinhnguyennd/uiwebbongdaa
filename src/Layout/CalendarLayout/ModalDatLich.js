// Modal.js
import React, { useState, useEffect } from 'react'
import './ModalDatLich.scss'

function ModalDatLich ({ isOpen, onClose, date, userId, fetchBookingDays,fetchdatlich
 }) {
  const [dataca, setdataca] = useState([])
  const [dataloaisan, setdataloaisan] = useState([])
  const [tenLoaiSan, setTenLoaiSan] = useState('')
  const [selectedShiftId, setSelectedShiftId] = useState(null)
  const [soluongSans, setSoluongSans] = useState({})

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getCa
`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setdataca(data)
      } else {
        console.error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchloaisan = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getloaisanbong`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setdataloaisan(data)
      } else {
        console.error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchloaisan()
  }, [])

  const handleClose = () => {
    setTenLoaiSan('')
    setSelectedShiftId(null)
    setSoluongSans({})
    onClose()
  }
  const handledatlichsan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/datlichsan/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            loaisanbong: tenLoaiSan,
            ngayda: date,
            idca: selectedShiftId,
            soluongsan: soluongSans[selectedShiftId] || 1
          })
        }
      )

      if (response.ok) {
        handleClose()
        fetchBookingDays()
        fetchdatlich()
        alert('lưu đặt lịch sân thành công')
      } else {
      }
    } catch (error) {
      console.error('Lỗi khi lưu đặt lịch sân:', error)
    }
  }
  const handleShiftClick = id => {
    setSelectedShiftId(id) // Set the selected shift ID
  }
  const handleSoluongChange = (shiftId, value) => {
    setSoluongSans(prevState => ({
      ...prevState,
      [shiftId]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Lựa Chọn Ca</h2>
        <p>Ngày: {date.toLocaleDateString()}</p>
        <div className='chonloaisan'>
          <label htmlFor='loaisan-select'>Chọn loại sân:</label>
          <select
            id='loaisan-select'
            value={tenLoaiSan}
            onChange={e => setTenLoaiSan(e.target.value)}
          >
            <option value=''>--Chọn loại sân--</option>
            {dataloaisan.map(loaisan => (
              <option key={loaisan.id} value={loaisan.tenloaisan}>
                {loaisan.tenloaisan}
              </option>
            ))}
          </select>
        </div>

        <div className='shift-container'>
          {dataca.map(shift => (
            <div
              key={shift._id}
              className={`shift ${
                selectedShiftId === shift._id ? 'selected' : ''
              }`}
              onClick={() => handleShiftClick(shift._id)}
            >
              <h3>
                {shift.tenca}: {shift.begintime} - {shift.endtime}
              </h3>
              <p>Giá ca: {shift.giaca.toLocaleString()} đ</p>
              <label>
                SL Sân:
                <input
                  type='number'
                  min='1'
                  value={soluongSans[shift._id] || 1} // Nếu không có giá trị, mặc định là 1
                  onChange={e => handleSoluongChange(shift._id, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
        <button onClick={handledatlichsan}>Lưu</button>
        <button onClick={handleClose}>Hủy</button>
      </div>
    </div>
  )
}

export default ModalDatLich
