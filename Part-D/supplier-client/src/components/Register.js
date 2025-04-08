import { useState } from "react";
import GenericForm from "../components/utils/genericForm";
import GenericButton from "../components/utils/genericButton";
import API from "../api";

const Register = () => {
  const [products, setProducts] = useState([
    { name: "", price: "", minQuantity: "" },
  ]);

  const baseFields = [
    { name: "name", label: "שם מלא", type: "text", placeholder: "הכנס שם מלא" },
    {
      name: "email",
      label: "אימייל",
      type: "email",
      placeholder: "הכנס אימייל",
    },
    {
      name: "password",
      label: "סיסמה",
      type: "password",
      placeholder: "בחר סיסמה",
    },
    {
      name: "companyName",
      label: "שם חברה",
      type: "text",
      placeholder: "הכנס שם חברה",
    },
    {
      name: "phoneNumber",
      label: "מספר טלפון",
      type: "text",
      placeholder: "הכנס מספר טלפון",
    },
    {
      name: "representativeName",
      label: "שם נציג",
      type: "text",
      placeholder: "הכנס שם נציג",
    },
  ];

  const validation = {
    name: { required: true },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 },
    companyName: { required: true },
    phoneNumber: { required: true },
    representativeName: { required: true },
  };

  const handleProductChange = (index, key, value) => {
    const updated = [...products];
    updated[index][key] = value;
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", price: "", minQuantity: "" }]);
  };

  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleSubmit = async (formData) => {
    try {
      const dataToSend = {
        ...formData,
        role: "supplier",
        products,
      };

      await API.post("/auth/register", dataToSend);
      alert("נרשמת בהצלחה!");
    } catch (err) {
      console.error(err);
      alert("שגיאה בהרשמה");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", direction: "rtl" }}>
      <GenericForm
        fields={baseFields}
        onSubmit={handleSubmit}
        validation={validation}
        cardLabel="רישום ספק"
      />

      <h5 className="mt-4">מוצרים</h5>
      {products.map((product, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <input
            type="text"
            placeholder="שם מוצר"
            value={product.name}
            onChange={(e) => handleProductChange(index, "name", e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="number"
            placeholder="מחיר"
            value={product.price}
            onChange={(e) =>
              handleProductChange(index, "price", e.target.value)
            }
            className="form-control mb-2"
          />
          <input
            type="number"
            placeholder="כמות מינימלית"
            value={product.minQuantity}
            onChange={(e) =>
              handleProductChange(index, "minQuantity", e.target.value)
            }
            className="form-control mb-2"
          />
          {products.length > 1 && (
            <GenericButton
              label="הסר מוצר"
              variant="danger"
              onClick={() => removeProduct(index)}
            ></GenericButton>
          )}
        </div>
      ))}

      <div className="text-end">
        <GenericButton
          label="הוסף מוצר"
          variant="secondary"
          onClick={addProduct}
        />
      </div>
    </div>
  );
};

export default Register;
