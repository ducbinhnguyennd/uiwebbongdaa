import React, { useState, useEffect } from 'react'
import './FilterBar.scss'
import ModalDatSan from '../Layout/CalendarLayout/ModalDatSan'

const FilterBar = ({datadatlich, setdatadatlich,fetchdatlich,userId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }


  useEffect(() => {
    fetchdatlich()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='filter-bar'>
      <button className='filter-btn'>Filter</button>
      <button className='select-btn'>Chọn Sân</button>
      <button className='info-btn' onClick={handleOpenModal}>
        Điền Thông Tin
      </button>

      {isModalOpen && (
        <ModalDatSan
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={userId}
          datadatlich={datadatlich}
          fetchdatlich={fetchdatlich}
        />
      )}
    </div>
  )
}

export default FilterBar
