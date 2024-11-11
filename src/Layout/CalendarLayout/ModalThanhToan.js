import './ModalThanhToan.scss'

function ModalThanhToan ({
  isOpen,
  onClose,
  tennguoidat,
  phone,
  datadatlich,
  tiencoc,
  tennganhang
}) {
  if (!isOpen) return null

  return (
    <>
      <div className='modal-overlay2'>
        <div className='modal-content2'>
          <img src='/logovnpay.png' alt='' className='imgvnpay' />
          <hr style={{ width: '100%' ,borderColor: 'gray'}}/>
          <div className='bodythanhtoan'>
            <div className='divthongtinthanhtoan'>
                <p>Thông tin đơn hàng</p>
                <hr style={{ width: '100%' ,borderColor: 'gray'}}/>

                <p>Số tiền thanh toán</p>
                <h3>{tiencoc} VND</h3>

                <p>Giá trị đơn hàng</p>
                <h3>{tiencoc} VND</h3>

                <p>Phí giao dịch</p>
                <h3>0 VND</h3>
            </div>
          </div>
          <div>
            <button
              style={{
                width: '100%',
                marginTop: '10px',
                fontSize: '20px',
                backgroundColor: 'red'
              }}
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalThanhToan
