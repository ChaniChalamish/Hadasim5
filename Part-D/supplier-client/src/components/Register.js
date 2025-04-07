
import GenericForm from '../components/utils/genericForm'; 
import API from '../api';

const Register = () => {
  const goodsOptions = [
    { value: 'fruits', label: 'פירות' },
    { value: 'vegetables', label: 'ירקות' },
    { value: 'meat', label: 'בשר' },
    { value: 'dairy', label: 'מוצרי חלב' },
    { value: 'beverages', label: 'משקאות' },
  ];

  const fields = [
    { name: 'name', label: 'שם מלא', type: 'text', placeholder: 'הכנס שם מלא' },
    { name: 'email', label: 'אימייל', type: 'email', placeholder: 'הכנס אימייל' },
    { name: 'password', label: 'סיסמה', type: 'password', placeholder: 'בחר סיסמה' },
    { name: 'companyName', label: 'שם חברה', type: 'text', placeholder: 'הכנס שם חברה' },
    { name: 'phoneNumber', label: 'מספר טלפון', type: 'text', placeholder: 'הכנס מספר טלפון' },
    { name: 'representativeName', label: 'שם נציג', type: 'text', placeholder: 'הכנס שם נציג' },
    { name: 'goods', label: 'בחר סחורות', type: 'select-multiple', options: goodsOptions },
  ];

  const validation = {
    name: { required: true },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 },
    companyName: { required: true },
    phoneNumber: { required: true },
    representativeName: { required: true },
    goods: { required: true },
  };

  const handleSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        role: 'supplier',
      };
      const res = await API.post('/auth/register', dataToSend);
      alert('נרשמת בהצלחה!');
    } catch (err) {
      console.error(err);
      alert('שגיאה בהרשמה');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', direction: 'rtl' }}>
      
      <GenericForm fields={fields} onSubmit={handleSubmit} validation={validation} cardLabel=" רישום" />
    </div>
  );
};

export default Register;
