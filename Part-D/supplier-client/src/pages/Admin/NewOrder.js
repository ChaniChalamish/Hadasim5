import { useEffect, useState } from "react";
import API from "../../api";
import GenericButton from "../../components/utils/genericButton";
import GenericTable from "../../components/utils/genericTable";

const NewOrder = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [products, setProducts] = useState([]);
  console.log(products, "products");
  const [quantities, setQuantities] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    API.get("/suppliers")
      .then((res) => {
        setSuppliers(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedSupplierId) {
      setLoadingProducts(true);
      API.get(`/products/${selectedSupplierId}`)
        .then((res) => {
          const receivedProducts = res.data?.products;
          setProducts(receivedProducts);
          setQuantities({});
        })
        .catch((err) => {
          console.error(err);
          setProducts([]);
        })
        .finally(() => {
          setLoadingProducts(false);
        });
    }
  }, [selectedSupplierId]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleSubmit = async () => {
    const invalidProduct = products.find(
      (p) => quantities[p._id] && Number(quantities[p._id]) < p.minQuantity
    );

    if (invalidProduct) {
      return alert(
        `הכמות של "${invalidProduct.name}" נמוכה מהכמות המינימלית הנדרשת (${invalidProduct.minQuantity})`
      );
    }

    const selectedProducts = products
      .filter((p) => quantities[p._id])
      .map((p) => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        quantity: Number(quantities[p._id]),
      }));

    if (selectedProducts.length === 0) {
      return alert("בחר לפחות מוצר אחד עם כמות חוקית");
    }

    const orderData = {
      supplierId: selectedSupplierId,
      products: selectedProducts,
    };

    try {
      await API.post("/orders", orderData);
      alert("ההזמנה נשלחה בהצלחה!");

      
      
      setQuantities({});
    } catch (err) {
      console.error(err);
      alert("שגיאה בשליחת ההזמנה");
    }
   
  };
  const totalPrice = products.reduce((sum, product) => {
    const quantity = Number(quantities[product._id] || 0);
    if (quantity >= product.minQuantity) {
      return sum + quantity * product.price;
    }
    return sum;
  }, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", direction: "rtl" }}>
      <h2 className="text-center mb-4">יצירת הזמנה חדשה</h2>

      <div className="mb-4">
        <label className="form-label">בחר ספק</label>
        <select
          className="form-select"
          value={selectedSupplierId}
          onChange={(e) => setSelectedSupplierId(e.target.value)}
        >
          <option value="">-- בחר ספק --</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.companyName}
            </option>
          ))}
        </select>
      </div>

      {loadingProducts ? (
        <p>טוען מוצרים...</p>
      ) : products.length > 0 ? (
        <>
          <h4 className="mt-4">מוצרים זמינים</h4>
          {console.log(products, "pe3")}
          <GenericTable
            columns={[
              {
                header: "שם מוצר",
                accessor: (row) => row.name,
              },
              {
                header: "מחיר",
                accessor: (row) => `₪${row.price}`,
              },
              {
                header: "כמות מינימלית",
                accessor: (row) => row.minQuantity,
              },
              {
                header: "בחר כמות",
                accessor: (row) => (
                  <input
                    type="number"
                    className="form-control"
                    value={quantities[row._id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(row._id, e.target.value)
                    }
                    min={row.minQuantity}
                  />
                ),
              },
            ]}
            data={products}
          />
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <strong>סה"כ להזמנה: ₪{totalPrice}</strong>
            </div>
            <GenericButton
              variant="success"
              onClick={handleSubmit}
              label="שלח הזמנה"
            />
          </div>
        </>
      ) : (
        selectedSupplierId && <p>לא נמצאו מוצרים עבור ספק זה.</p>
      )}
    </div>
  );
};

export default NewOrder;
