import React, { useState, useEffect } from 'react'
import FilterBar from '../../../components/FilterBar'
import ShiftCard from '../../../components/ShiftCard'
import MenuStatusNhanVien from '../../../components/MenuStatusNhanVien'

import './DatLich.scss'

const DatLich = () => {
  const [shifts, setShifts] = useState([])

  const fetchsanbong = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getallsanbong`)
      if (response.ok) {
        const data = await response.json()
        setShifts(data)
      } else {
        console.log('đã xảy ra lỗi')
      }
    } catch (error) {
      console.error('Error fetching shifts:', error)
    }
  }

  useEffect(() => {
    fetchsanbong()
  }, [])
  return (
    <div className='booking-screen'>
      <MenuStatusNhanVien />
      <FilterBar />

      <div className='shift-list'>
        {shifts.map((shift, index) => (
          <div className='divshifttong'>
          <div>
            <h2>{shift.tensan}</h2>
          </div>
          <ShiftCard key={index} shift={shift} />
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default DatLich
