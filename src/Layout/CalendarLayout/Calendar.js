// Calendar.js
import React, { useState } from 'react'
import './Calendar.scss'
import ModalDatLich from './ModalDatLich'
import { useLocation } from 'react-router-dom'

function Calendar () {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const location = useLocation()
  const userId = location.state?.userId || ''


  const renderCalendar = () => {
    const monthDays = []
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    )
    const startDay = startOfMonth.getDay()
    const totalDays = endOfMonth.getDate()

    for (let i = 0; i < startDay; i++) {
      monthDays.push(<div className='day empty' key={`empty-${i}`}></div>)
    }

    for (let day = 1; day <= totalDays; day++) {
      monthDays.push(
        <div className='day' key={day} onClick={() => handleDayClick(day)}>
          {day}
        </div>
      )
    }

    return monthDays
  }

  const handleDayClick = day => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
    setSelectedDate(clickedDate)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={prevMonth}>Previous</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className='weekdays'>
        {['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'].map(day => (
          <div className='weekday' key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className='days'>{renderCalendar()}</div>

      {/* Modal Component */}
      <ModalDatLich
        isOpen={isModalOpen}
        onClose={closeModal}
        date={selectedDate}
        userId={userId}
      />
    </div>
  )
}

export default Calendar
