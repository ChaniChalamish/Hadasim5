import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';

function GenericForm({
  fields,
  onSubmit,
  validation = {},
  cardLabel = "טופס",
}) {
  const [errors, setErrors] = useState({});

  const initialData = {};
  fields.forEach((field) => {
    initialData[field.name] = field.type === "select-multiple" ? [] : "";
  });
  const [formData, setFormData] = useState(initialData);
  console.log("Rendering form with fields:", fields);
  const validateField = (name, value) => {
    const rules = validation[name];
    let error = "";

    if (rules) {
      if (rules.required && (!value || value.length === 0)) {
        error = "שדה חובה.";
      } else if (rules.minLength && value.length < rules.minLength) {
        error = `נדרשות לפחות ${rules.minLength} תווים.`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        error = "פורמט לא תקין.";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, options, multiple } = e.target;
    let newValue;

    if (type === "select-multiple" || multiple) {
      newValue = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
    } else {
      newValue = value;
    }

    const error = validateField(name, newValue);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field.name, value);
      if (error) newErrors[field.name] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <Card
      className="shadow-sm p-4"
      dir="rtl"
      style={{ maxWidth: "600px", margin: "30px auto", borderRadius: "15px" }}
    >
      <h3 className="mb-4 text-center">{cardLabel}</h3>
      <Form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <Form.Group className="mb-3" controlId={field.name} key={index}>
            <Form.Label className="fw-bold">{field.label}</Form.Label>
            {field.type === "select-multiple" ? (
            <>
              <Multiselect
                options={field.options}
                displayValue="label"
                onSelect={(selectedList) => {
                  const values = selectedList.map((item) => item.value);
                  const error = validateField(field.name, values);
                  setFormData((prev) => ({ ...prev, [field.name]: values }));
                  setErrors((prev) => ({ ...prev, [field.name]: error }));
                }}
                onRemove={(selectedList) => {
                  const values = selectedList.map((item) => item.value);
                  const error = validateField(field.name, values);
                  setFormData((prev) => ({ ...prev, [field.name]: values }));
                  setErrors((prev) => ({ ...prev, [field.name]: error }));
                }}
                className="form-control"
              />
              {errors[field.name] && (
                <div className="invalid-feedback d-block">
                  {errors[field.name]}
                </div>
              )}
            </>
            ) : (
            <Form.Control
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
            />
            )}
            <Form.Control.Feedback type="invalid">
              {errors[field.name]}
            </Form.Control.Feedback>
          </Form.Group>
        ))}
        <div className="d-grid">
          <Button variant="primary" type="submit">
            submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default GenericForm;
