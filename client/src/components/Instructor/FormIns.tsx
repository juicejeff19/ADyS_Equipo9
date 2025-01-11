import React from "react";
import { useForm, FieldError } from "react-hook-form";
// import './form.css';

type FormInsValues = {
  name: string;
  eventId: string;
  sessionId: string;
  category: string;
  gender: string; 
  distanceKm: number;
  time: string;
  age: number;
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
      <div className="login-box" style={{ maxHeight: "560px", overflowY: "auto" }}>
        <h1 style={{ color: "#5c7ece" }}>Registrar Resultado</h1>

        <form onSubmit={onSubmit}>
          {/* Campo de nombre */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="name">Nombre del Participante</label>
            <div className="textbox">
              <input
                id="name"
                type="name"
                placeholder="Tu nombre por favor"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre del participante es requerido"
                  },
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "El nombre del usuario es valido"
                  }
                })}
              />
              {errors.name && (
                <span className="error-message">
                  {getErrorMessage(errors.name)}
                </span>
              )}
            </div>
          </div>

          {/* Campo del ID del evento */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="eventId">EventoId</label>
            <div className="textbox">
              <input
                id="eventId"
                type="eventId"
                placeholder="Ejemplo: abc799999ancn72662d89"
                {...register("eventId", {
                  required: {
                    value: true,
                    message: "El ID del evento es requerido"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Debe incluir mayúsculas, minúsculas y números"
                  }
                })}
              />
              {errors.eventId && (
                <span className="error-message">
                  {getErrorMessage(errors.eventId)}
                </span>
              )}
            </div>
          </div>
          {/* Campo del ID de la sesión */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="sessionId">ID de la sesión</label>
            <div className="textbox">
              <input
                id="sessionId"
                type="sessionId"
                placeholder="Ejemplo: bbbc3456hbacs7768y"
                {...register("sessionId", {
                  required: {
                    value: true,
                    message: "El ID de la sesión es requerido"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Debe incluir mayúsculas, minúsculas y números"
                  }
                })}
              />
              {errors.sessionId && (
                <span className="error-message">
                  {getErrorMessage(errors.sessionId)}
                </span>
              )}
            </div>
          </div>

          {/* Campo de la categoria */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="category">Categoria</label>
            <div className="textbox">
              <input
                id="category"
                type="category"
                placeholder="(Adulto, juvenil, etc)"
                {...register("category", {
                  required: {
                    value: true,
                    message: "La categoria del competidor es requerida"
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Debe incluir mayúsculas, minúsculas"
                  }
                })}
              />
              {errors.category && (
                <span className="error-message">
                  {getErrorMessage(errors.category)}
                </span>
              )}
            </div>
          </div>

          {/* Campo del género del competidor */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="gender">Género</label>
            <div className="textbox">
              <input
                id="gender"
                type="gender"
                placeholder="Masculino/Femenino"
                {...register("gender", {
                  required: {
                    value: true,
                    message: "El género del participante es requerido"
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Debe incluir mayúsculas y minúsculas"
                  }
                })}
              />
              {errors.gender && (
                <span className="error-message">
                  {getErrorMessage(errors.gender)}
                </span>
              )}
            </div>
          </div>

          {/* Campo del rregistro de Km recorridos */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="distanceKm">Distancia en Km</label>
            <div className="textbox">
              <input
                id="distanceKm"
                type="distanceKm"
                placeholder="Ejemplo: 10"
                {...register("distanceKm", {
                  required: {
                    value: true,
                    message: "La distancia recorria es necesaria"
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Debe incluir números"
                  }
                })}
              />
              {errors.distanceKm && (
                <span className="error-message">
                  {getErrorMessage(errors.distanceKm)}
                </span>
              )}
            </div>
          </div>

          {/* Campo del tiempo */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="time">Tiempo</label>
            <div className="textbox">
              <input
                id="time"
                type="v"
                placeholder="Ejemplo: 10:09:10"
                {...register("time", {
                  required: {
                    value: true,
                    message: "El tiempo del competidor es requerido"
                  },
                  pattern: {
                    value: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
                    message: "Debe incluir números"
                  }
                })}
              />
              {errors.time && (
                <span className="error-message">
                  {getErrorMessage(errors.time)}
                </span>
              )}
            </div>
          </div>

          {/* Campo de la edad */}
          <div>
            <label style={{ color: '#5c7ece' }} htmlFor="age">Edad</label>
            <div className="textbox">
              <input
                id="age"
                type="age"
                placeholder="Ejemplo: 15"
                {...register("age", {
                  required: {
                    value: true,
                    message: "La edad del particpante es requerida"
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Debe incluir mayúsculas, minúsculas, números y caracteres especiales"
                  }
                })}
              />
              {errors.age && (
                <span className="error-message">
                  {getErrorMessage(errors.age)}
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
