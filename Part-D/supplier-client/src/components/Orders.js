import { useEffect, useState } from 'react'
import API from '../api'

function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    API.get('/supplier/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleApprove = async (id) => {
    try {
      await API.put(`/supplier/orders/${id}/approve`)
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status: 'בתהליך' } : order))
      )
    } catch (err) {
      console.error(err)
      alert('שגיאה באישור הזמנה')
    }
  }

  return (
    <div>
      <h2>ההזמנות שלי</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <p>מוצר: {order.productName}</p>
          <p>כמות: {order.quantity}</p>
          <p>סטטוס: {order.status}</p>
          {order.status === 'ממתין לאישור' && (
            <button onClick={() => handleApprove(order._id)}>אשר הזמנה</button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Orders
