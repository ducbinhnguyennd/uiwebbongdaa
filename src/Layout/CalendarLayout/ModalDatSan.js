/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './ModalDatSan.scss'
import ModalNganHang from './ModalNganHang'

function ModalDatSan ({ isOpen, onClose, userId }) {
  const [datadatlich, setdatadatlich] = useState([])
  const [isModalNganHangOpen, setisModalNganHangOpen] = useState(false)
  const [tennguoidat, settennguoidat] = useState('')
  const [phone, setphone] = useState('')
  const [tennguoidatError, settennguoidatError] = useState('')
  const [phoneError, setphoneError] = useState('')

  const validateInputs = () => {
    let valid = true

    if (!tennguoidat) {
      settennguoidatError('Vui lòng nhập họ và tên')
      valid = false
    } else {
      settennguoidatError('')
    }

    if (!phone) {
      valid = false
      setphoneError('Vui lòng nhập số điện thoại')
    } else {
      setphoneError('')
    }
    return valid
  }
  const fetchdatlich = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getbooking/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setdatadatlich(data)
      } else {
        console.error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchdatlich()
  }, [])

  const handelxoabooking = async idbooking => {
    try {
      const response = await fetch(
        `http://localhost:8080/deletebooking/${idbooking}/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.ok) {
        fetchdatlich()
        alert('xóa lịch thành công')
      } else {
        console.error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Lỗi khi lưu đặt lịch sân:', error)
    }
  }

  const tongTienCoc = datadatlich.reduce(
    (total, item) => total + (item.tiencoc || 0),
    0
  )

  if (!isOpen) return null

  return (
    <>
      <div className='modal-overlay1'>
        <div className='modal-content1'>
          <h2>Đặt sân</h2>
          <div className='bodydatsan'>
            <div className='divinputdatsan'>
              <div className='input-group'>
                <label htmlFor='inputdatsan'>Họ và tên</label>
                <input
                  type='text'
                  placeholder='họ và tên'
                  className='inputdatsan'
                  value={tennguoidat}
                  onChange={e => {
                    settennguoidat(e.target.value)
                    settennguoidatError('')
                  }}
                />
                {tennguoidatError && (
                  <p className='error'>{tennguoidatError}</p>
                )}
              </div>
              <div className='input-group'>
                <label htmlFor='inputdatsan'>Số điện thoại</label>
                <input
                  type='text'
                  placeholder='số điện thoại'
                  className='inputdatsan'
                  value={phone}
                  onChange={e => {
                    setphone(e.target.value)
                    setphoneError('')
                  }}
                />
                {phoneError && <p className='error'>{phoneError}</p>}
              </div>
            </div>

            <div className='divtabledatsan'>
              <table className='tabledatsan'>
                <thead>
                  <tr>
                    <th>Ca</th>
                    <th>Ngày</th>
                    <th>Giá sân</th>
                    <th>Số lượng sân</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {datadatlich.map(item => (
                    <tr key={item._id}>
                      <td>{`${item.ca} (${item.begintime} - ${item.endtime})`}</td>
                      <td>{item.ngayda}</td>
                      <td>{item.soluongsan}</td>
                      <td>{item.giaca.toLocaleString()} đ</td>
                      <td>
                        <button onClick={() => handelxoabooking(item._id)}>
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ borderColor: 'black', width: '100%' }} />
              <div className='divtongtien'>
                <div className='item'>
                  <h3>Tổng tiền sân:</h3>
                  <h2>
                    {datadatlich
                      .reduce((total, item) => total + item.giaca, 0)
                      .toLocaleString()}{' '}
                    đ
                  </h2>
                </div>
                <div className='item'>
                  <h3>Tham số tiền cọc:</h3>
                  <h2>50%</h2>
                </div>
                <div className='item'>
                  <h3>Tổng tiền cọc:</h3>
                  <h2>{tongTienCoc.toLocaleString()} đ</h2>
                </div>
              </div>
              <hr style={{ borderColor: 'black', width: '100%' }} />
            </div>
          </div>
          <div className='divbtndatsan'>
            <button
              style={{ backgroundColor: 'green', color: 'white' }}
              onClick={() => {
                if (datadatlich > 0) {
                  if (validateInputs()) {
                    setisModalNganHangOpen(true)
                  }
                }
                else {
                  alert('Bạn chưa có lịch đặt sân nào!')
                }
              }}
            >
              Đặt lịch và thanh toán
            </button>
            <button
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
      <ModalNganHang
        isOpen={isModalNganHangOpen}
        onClose={() => setisModalNganHangOpen(false)}
        tennguoidat={tennguoidat}
        phone={phone}
        datadatlich={datadatlich}
        tiencoc={tongTienCoc}
      />
    </>
  )
}

export default ModalDatSan
