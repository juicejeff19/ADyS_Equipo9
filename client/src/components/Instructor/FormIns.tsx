import React from "react";
import { useForm, FieldError } from "react-hook-form";
// import './form.css';

type FormInsValues = {
  email: string;
  password: string;
};

const FormIns: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInsValues>();

  const onSubmit = handleSubmit((data) => {
    console.log("Formulario enviado con éxito:", data);
  });

  const getErrorMessage = (error: FieldError | undefined): string | null => {
    return error && error.message ? error.message : null;
  };
  

  return (
    <div className="login-container">
      <div className="login-box" style={{ height: "560px" }}>
        <h1 style={{ color: "#5c7ece" }}>Registrar Usuario</h1>

        <form onSubmit={onSubmit}>
          {/* Campo de correo */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="email">Correo Electrónico</label>
            <div className="textbox">
              <input
                id="email"
                type="email"
                placeholder="Ejemplo: usuario@dominio.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo electrónico es requerido"
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "El correo electrónico no es válido"
                  }
                })}
              />
              {errors.email && (
                <span className="error-message">
                  {getErrorMessage(errors.email)}
                </span>
              )}
            </div>
          </div>

          {/* Campo de contraseña */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="password">Contraseña</label>
            <div className="textbox">
              <input
                id="password"
                type="password"
                placeholder="Ejemplo: Contraseña123!"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida"
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                    message: "Debe incluir mayúsculas, minúsculas, números y caracteres especiales"
                  }
                })}
              />
              {errors.password && (
                <span className="error-message">
                  {getErrorMessage(errors.password)}
                </span>
              )}
            </div>
          </div>

          {/* Botón de envío */}
          <br />
          <br />
          <button type="submit" className="btnn">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default FormIns;
