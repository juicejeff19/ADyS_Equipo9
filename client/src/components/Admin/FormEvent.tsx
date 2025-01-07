import React, { useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContextAdmin'
import '../form/form.css';

type FormEventValues = {
    name: string;
    startDate: Date;
    endDate: Date;
    closingOfRegistrations: Date;
    mode: string[];
    cost: number;
    requirements: string;
    rules: string;
    kilometers: number;
    description?: string;
};

const FormEvent: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormEventValues>();
    const { registerEvent } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data: FormEventValues) => {
        try {
          // Aquí llamas a la función registerEvent pasándole los datos del formulario
          await registerEvent(data);
          navigate('/registroExitoso'); // Redirige a otra página después de registrar el evento
        } catch (error) {
          console.error("Error al registrar el evento:", error);
          // Maneja cualquier error que pueda surgir al llamar a registerEvent
        }
      });

    const getErrorMessage = (error: FieldError | undefined): string | null => {
        return error && error.message ? error.message : null;
    };

    return (
        <div className="login-container">
            <div className="error-container">
                {errors.name && <div>{getErrorMessage(errors.name)}</div>}
            </div>

            <div className="login-box" style={{ height: "auto" }}>
                <h1 style={{ color: "#5c7ece" }}>Registrar Evento</h1>

                <form onSubmit={onSubmit}>
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name">Nombre del Evento</label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", { required: "El nombre del evento es requerido" })}
                        />
                        {errors.name && <span className="error-message">{getErrorMessage(errors.name)}</span>}
                    </div>

                    {/* Fecha de Inicio */}
                    <div>
                        <label htmlFor="startDate">Fecha de Inicio</label>
                        <input
                            id="startDate"
                            type="date"
                            {...register("startDate", { required: "La fecha de inicio es requerida" })}
                        />
                        {errors.startDate && <span className="error-message">{getErrorMessage(errors.startDate)}</span>}
                    </div>

                    {/* Fecha de Fin */}
                    <div>
                        <label htmlFor="endDate">Fecha de Fin</label>
                        <input
                            id="endDate"
                            type="date"
                            {...register("endDate", { required: "La fecha de fin es requerida" })}
                        />
                        {errors.endDate && <span className="error-message">{getErrorMessage(errors.endDate)}</span>}
                    </div>

                    {/* Cierre de Inscripciones */}
                    <div>
                        <label htmlFor="closingOfRegistrations">Cierre de Inscripciones</label>
                        <input
                            id="closingOfRegistrations"
                            type="date"
                            {...register("closingOfRegistrations", { required: "La fecha de cierre de inscripciones es requerida" })}
                        />
                        {errors.closingOfRegistrations && <span className="error-message">{getErrorMessage(errors.closingOfRegistrations)}</span>}
                    </div>

                    {/* Modo */}
                    <div>
                        <label htmlFor="mode">Modo</label>
                        <select
                            id="mode"
                            multiple
                            {...register("mode", { required: "Debes seleccionar al menos un modo" })}
                        >
                            <option value="relay">Relevo</option>
                            <option value="individual">Individual</option>
                        </select>
                        {/* {errors.mode && <span className="error-message">{getErrorMessage(errors.mode)}</span>} */}
                    </div>

                    {/* Costo */}
                    <div>
                        <label htmlFor="cost">Costo</label>
                        <input
                            id="cost"
                            type="number"
                            step="0.01"
                            {...register("cost", { required: "El costo es requerido", min: { value: 0, message: "El costo debe ser positivo" } })}
                        />
                        {errors.cost && <span className="error-message">{getErrorMessage(errors.cost)}</span>}
                    </div>

                    {/* Requisitos */}
                    <div>
                        <label htmlFor="requirements">Requisitos</label>
                        <textarea
                            id="requirements"
                            {...register("requirements", { required: "Los requisitos son requeridos" })}
                        ></textarea>
                        {errors.requirements && <span className="error-message">{getErrorMessage(errors.requirements)}</span>}
                    </div>

                    {/* Reglas */}
                    <div>
                        <label htmlFor="rules">Reglas</label>
                        <textarea
                            id="rules"
                            {...register("rules", { required: "Las reglas son requeridas" })}
                        ></textarea>
                        {errors.rules && <span className="error-message">{getErrorMessage(errors.rules)}</span>}
                    </div>

                    {/* Kilómetros */}
                    <div>
                        <label htmlFor="kilometers">Kilómetros</label>
                        <input
                            id="kilometers"
                            type="number"
                            step="0.1"
                            {...register("kilometers", { required: "La cantidad de kilómetros es requerida", min: { value: 0, message: "Debe ser un valor positivo" } })}
                        />
                        {errors.kilometers && <span className="error-message">{getErrorMessage(errors.kilometers)}</span>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="description">Descripción</label>
                        <textarea id="description" {...register("description")}></textarea>
                    </div>

                    {/* Publicado
          <div>
            <label htmlFor="callPublished">¿Convocatoria Publicada?</label>
            <input id="callPublished" type="checkbox" {...register("callPublished")} />
          </div> */}

                    <br />
                    <button type="submit" className="btnn">Registrar</button>
                </form>
            </div>
        </div>
    );
};

export default FormEvent;
