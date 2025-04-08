import GenericForm from "../components/utils/genericForm";
import API from '../api'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const fields = [
    {
      name: "email",
      label: "מייל",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      name: "password",
      label: "ססמא",
      type: "password",
      placeholder: "*******",
    },
  ];

  const validation = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
    },
    
  };

  const handleSubmit = async (data) => {
    try {
      const res = await API.post('/auth/login', data)
      console.log(data)
      console.log('Login successful:', res.data)
      const token = res.data.token
      localStorage.setItem('token', token)

      alert('התחברת בהצלחה!')
      navigate('/orders') // העברה לדף אחר אחרי התחברות

    } catch (err) {
      console.error('Login error:', err.response || err)
      alert('שגיאה בהתחברות: אימייל או סיסמה שגויים')
    }
  }
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <GenericForm
        fields={fields}
        onSubmit={handleSubmit}
        validation={validation}
        cardLabel="התחברות משתמש"
      />
    </div>
  );
};

export default Login;
