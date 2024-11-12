import React, { useState } from 'react';
import './ThanhToanNhanh.scss';

const ThanhToanNhanh = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: 1, customerName: 'TUẤN', phone: '0945525830', field: 'Sân 4 - Ca 2', time: '09:00 - 11:30', date: '11-1-2024', status: 'Đã nhận sân' },
    { id: 2, customerName: 'TUẤN', phone: '0945525830', field: 'Sân 2 - Ca 4', time: '15:00 - 17:30', date: '11-1-2024', status: 'Đã nhận sân' }
  ];

  const services = [
    { id: 1, name: 'TRÀ CHANH', price: 10000, quantity: 3 },
    { id: 2, name: 'Sting Đỏ', price: 11000, quantity: 3 },
    { id: 3, name: 'COCA LON', price: 7000, quantity: 2 }
  ];

  return (
    <div className="thanh-toan-nhanh-container">
      <h2 className="title">Danh Sách Hóa Đơn Thanh Toán</h2>
      <div className="content">
        {/* Invoice List */}
        <div className="invoice-list">
          <h3>Danh Sách Hóa Đơn</h3>
          <input type="text" placeholder="Tìm kiếm theo số điện thoại" className="search-bar"/>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên khách</th>
                <th>Số điện thoại</th>
                <th>Sân ca</th>
                <th>Thời gian</th>
                <th>Ngày đặt lịch</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} onClick={() => setSelectedInvoice(invoice)}>
                  <td>{invoice.id}</td>
                  <td>{invoice.customerName}</td>
                  <td>{invoice.phone}</td>
                  <td>{invoice.field}</td>
                  <td>{invoice.time}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Information */}
        <div className="invoice-info">
          <h3>Thông Tin Hóa Đơn</h3>
          <div className="info-group">
            <label>Tên Khách Hàng</label>
            <input type="text" value={selectedInvoice?.customerName || ''} readOnly />
          </div>
          <div className="info-group">
            <label>Số Điện Thoại</label>
            <input type="text" value={selectedInvoice?.phone || ''} readOnly />
          </div>
          <div className="info-group">
            <label>Tên Sân Ca</label>
            <input type="text" value={selectedInvoice?.field || ''} readOnly />
          </div>
          <div className="info-group">
            <label>Thời Gian Đá</label>
            <input type="text" value={selectedInvoice?.time || ''} readOnly />
          </div>
          <div className="info-group">
            <label>Thời Gian Check In</label>
            <input type="datetime" placeholder="YYYY-MM-DD HH:MM" />
          </div>
        </div>

        {/* Used Services */}
        <div className="used-services">
          <h3>Dịch Vụ Sử Dụng</h3>
          <div className="services-list">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <img src={`/images/${service.name}.jpg`} alt={service.name} />
                <h4>{service.name}</h4>
                <p>{service.price.toLocaleString()} VND</p>
                <input type="number" value={service.quantity} min="0" />
                <button>Cập Nhật</button>
                <button>Xóa</button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Thanh Toán</h3>
          <div className="summary-item">
            <label>Giá Sân</label>
            <input type="number" placeholder="VND" />
          </div>
          <div className="summary-item">
            <label>Giá Dịch Vụ</label>
            <input type="number" value="95000" readOnly />
          </div>
          <div className="summary-item">
            <label>Phí Phụ</label>
            <input type="number" placeholder="VND" />
          </div>
          <div className="summary-item">
            <label>Tiền Cọc Sân</label>
            <input type="number" value="250000" readOnly />
          </div>
          <button className="pay-button">Xác Nhận Thanh Toán</button>
        </div>
      </div>
    </div>
  );
};

export default ThanhToanNhanh;
