function NhanCa ({ userId, khoitaoca, setkhotaocaus, setnhancaus, nhanca }) {
  const handleNhanCa = async () => {
    try {
      if (khoitaoca) {
        const response = await fetch(
          `http://localhost:8080/khoitaogiaoca/${userId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (response.ok) {
          alert('nhận ca thành công')
          setkhotaocaus(false)
        }
      }
      if (nhanca === false) {
        const response = await fetch(`http://localhost:8080/nhanca/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          alert('nhận ca thành công')
          setnhancaus(true)
        }
      }
    } catch (error) {
      alert('đã xảy ra lỗi')
      console.log(error)
    }
  }
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Nhận ca</h2>
        <p>Nhận ca trước khi thực hiện các chức năng tiếp theo</p>
        <button onClick={handleNhanCa}>Nhận ca</button>
      </div>
    </div>
  )
}

export default NhanCa
