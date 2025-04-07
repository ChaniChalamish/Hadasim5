import GenericForm from "../components/utils/genericForm";

const Login = () => {
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
    roles: {
      required: true,
    },
  };

  const handleSubmit = (data) => {
    console.log("Submitted form data:", data);
  };

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
