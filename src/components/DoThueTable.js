import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement("#root");

const DoThueTable = () => {
  const [rentals, setRentals] = useState([]); // Lưu trữ danh sách đồ thuê
  const [modalIsOpen, setModalIsOpen] = useState(false); // Trạng thái modal
  const [currentRental, setCurrentRental] = useState(null); // Lưu thông tin đồ thuê hiện tại (dùng khi sửa)

  // Lấy danh sách đồ thuê từ server
  const fetchRentals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getdothue');
      console.log("Danh sách đồ thuê:", response.data); // Kiểm tra dữ liệu nhận được từ API
      setRentals(response.data); // Cập nhật lại state với dữ liệu từ API
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đồ thuê:', error);
    }
  };

  // Mở modal để thêm đồ thuê
  const openModal = (rental = null) => {
    setCurrentRental(rental); // Cập nhật đồ thuê hiện tại (để sửa hoặc thêm mới)
    setModalIsOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentRental(null); // Reset lại khi đóng modal
  };

  // Xử lý thay đổi trong form nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRental({
      ...currentRental,
      [name]: value,
    });
  };

  // Thêm đồ thuê mới hoặc sửa đồ thuê
  const handleSubmit = async () => {
    try {
      console.log('Dữ liệu gửi lên:', currentRental); // Thêm thông tin để debug
      const rentalData = {
        tendothue: currentRental.tendothue,
        soluong: currentRental.soluong,
        price: currentRental.price,
        image: currentRental.image,
      };

      if (currentRental._id) {
        // Sửa đồ thuê nếu đã có ID
        console.log('Đang sửa đồ thuê...');
        await axios.post('http://localhost:8080/putdothue', { _id: currentRental._id, ...rentalData });
      } else {
        // Thêm đồ thuê mới
        console.log('Đang thêm đồ thuê mới...');
        await axios.post('http://localhost:8080/postdothue', rentalData);
      }

      fetchRentals(); // Cập nhật lại danh sách đồ thuê
      closeModal(); // Đóng modal
      alert('Cập nhật thành công!'); // Thêm thông báo thành công
    } catch (error) {
      console.error('Lỗi khi thêm/sửa đồ thuê:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  };

  // Xóa đồ thuê
  const handleDelete = async (id) => {
    try {
      console.log('Đang xóa đồ thuê với ID:', id); // Debug ID đang xóa
      await axios.post('http://localhost:8080/deletedothue', { _id: id });
      fetchRentals(); // Cập nhật lại danh sách đồ thuê
      alert('Đã xóa đồ thuê thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa đồ thuê:', error);
      alert('Đã xảy ra lỗi khi xóa!');
    }
  };

  // Hiển thị chi tiết đồ thuê
  const handleViewDetails = (rental) => {
    alert(`Chi tiết đồ thuê: \nTên: ${rental.tendothue}\nSố lượng: ${rental.soluong}\nGiá: ${rental.price}\nẢnh: ${rental.image}`);
  };

  useEffect(() => {
    fetchRentals(); // Lấy danh sách đồ thuê khi component được mount
  }, []);

  return (
    <div>
      <button onClick={() => openModal()}>Thêm đồ thuê</button>
      <h2>Danh sách đồ thuê</h2>
      <table>
        <thead>
          <tr>
            <th>Tên đồ thuê</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rentals && rentals.length > 0 ? (
            rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.tendothue}</td>
                <td>{rental.soluong}</td>
                <td>{rental.price}</td>
                <td>
                  <button onClick={() => openModal(rental)}>Sửa</button>
                  <button onClick={() => handleDelete(rental._id)}>Xóa</button>
                  <button onClick={() => handleViewDetails(rental)}>Xem chi tiết</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Chưa có đồ thuê</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal để thêm hoặc sửa đồ thuê */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{currentRental ? 'Sửa đồ thuê' : 'Thêm đồ thuê mới'}</h2>
        <form>
          <div>
            <label>Tên đồ thuê</label>
            <input
              type="text"
              name="tendothue"
              value={currentRental ? currentRental.tendothue : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Số lượng</label>
            <input
              type="number"
              name="soluong"
              value={currentRental ? currentRental.soluong : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Giá</label>
            <input
              type="number"
              name="price"
              value={currentRental ? currentRental.price : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Ảnh</label>
            <input
              type="text"
              name="image"
              value={currentRental ? currentRental.image : ''}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button onClick={handleSubmit}>{currentRental ? 'Cập nhật' : 'Thêm'}</button>
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>
  );
};

export default DoThueTable;
