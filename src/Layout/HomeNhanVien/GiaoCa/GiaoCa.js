import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceDetails = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    // Fetch all invoice data from the API
    axios.get('http://localhost:8080/gethoadon')
      .then(response => {
        setInvoiceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoice data:', error);
      });
  }, []);

  // Function to delete rental items
  const deleteRentalItem = (rentalId, invoiceId) => {
    const apiUrl = `http://localhost:8080/xoadothuehoadon/${rentalId}/${invoiceId}`;

    axios.post(apiUrl)
      .then(() => {
        // After deletion, update the local state or re-fetch the data
        alert('Rental item deleted successfully!');
        setInvoiceData(prevData =>
          prevData.map(invoice =>
            invoice.idhoadon === invoiceId
              ? {
                  ...invoice,
                  dothue: invoice.dothue.filter(item => item._id !== rentalId)
                }
              : invoice
          )
        );
      })
      .catch(error => {
        console.error('Error deleting rental item:', error);
      });
  };

  // Function to delete drink items
  const deleteDrinkItem = (drinkId, invoiceId) => {
    const apiUrl = `http://localhost:8080/xoadouonghoadon/${drinkId}/${invoiceId}`;

    axios.post(apiUrl)
      .then(() => {
        // After deletion, update the local state or re-fetch the data
        alert('Drink item deleted successfully!');
        setInvoiceData(prevData =>
          prevData.map(invoice =>
            invoice.idhoadon === invoiceId
              ? {
                  ...invoice,
                  douong: invoice.douong.filter(item => item._id !== drinkId)
                }
              : invoice
          )
        );
      })
      .catch(error => {
        console.error('Error deleting drink item:', error);
      });
  };

  return (
    <div>
      {invoiceData.length > 0 ? (
        invoiceData.map(invoice => (
          <div key={invoice.idhoadon}>
            <h2>Invoice: {invoice.mahd}</h2>
            <h3>Booking Details</h3>
            <p>Name: {invoice.booking.hovaten}</p>
            <p>Phone: {invoice.booking.phone}</p>
            <p>Field: {invoice.booking.loaisanbong}</p>
            <p>Time: {invoice.booking.begintime} - {invoice.booking.endtime}</p>
            <p>Date: {invoice.booking.ngayda}</p>

            <h3>Rented Items (Dịch vụ thuê)</h3>
            <ul>
              {invoice.dothue.length > 0 ? (
                invoice.dothue.map(item => (
                  <li key={item._id}>
                    <img src={item.image} alt={item.tendothue} width={50} />
                    <span>{item.tendothue} - {item.soluong} items - {item.thanhtien} VND</span>
                    <button onClick={() => deleteRentalItem(item._id, invoice.idhoadon)}>
                      Delete Rental Item
                    </button>
                  </li>
                ))
              ) : (
                <p>No rented items</p>
              )}
            </ul>

            <h3>Drinks (Đồ uống)</h3>
            <ul>
              {invoice.douong.length > 0 ? (
                invoice.douong.map(item => (
                  <li key={item._id}>
                    <img src={item.image} alt={item.tendouong} width={50} />
                    <span>{item.tendouong} - {item.soluong} items - {item.thanhtien} VND</span>
                    <button onClick={() => deleteDrinkItem(item._id, invoice.idhoadon)}>
                      Delete Drink Item
                    </button>
                  </li>
                ))
              ) : (
                <p>No drink items</p>
              )}
            </ul>
            
            <h3>Total Amount: {invoice.tongtien} VND</h3>
            <hr />
          </div>
        ))
      ) : (
        <p>Loading invoice data...</p>
      )}
    </div>
  );
};

export default InvoiceDetails;
