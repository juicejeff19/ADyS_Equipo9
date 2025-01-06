import React, { useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useAuth } from '../../context/AuthContextAdmin'
import { useNavigate } from "react-router-dom"
import './form.css';

type InputProps = {
    name: string,
    type: string,
    label: string,
    placeholder: string
}

type FormProps = {
    inputs: InputProps[];
    boxHeight?: string
    header: string
}

type FormValues = {
    email: string;
    password: string;
};


const Form: React.FC<FormProps> = ({ inputs, boxHeight, header }) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { sigin, user, isAuthenticated, errores, siginIns, siginSuAdmin } = useAuth();
    const navigation = useNavigate();
    console.log(user)

    
    // const onSubmit = handleSubmit(async (data) => {
    //     sigin({
    //         email: data.email,
    //         password: data.password,
    //     });
    // });

    const onSubmit = handleSubmit(async (data) => {
        if (header === 'Bienvenido Administrador') {
          sigin({
            email: data.email,
            password: data.password,
          });
        } else if (header === 'Bienvenido Instructor') {
            //console.log("entra aqui")
           siginIns({
            email: data.email,
            password: data.password,
          });
        } else if(header === 'Bienvenido SuperAdmind') {
            siginSuAdmin({
                email: data.email,
                password: data.password,
            });
        }

    });

 

    useEffect(() => {
        if (isAuthenticated && header === 'Bienvenido Administrador') navigation('/profileAdmin')
        else if(isAuthenticated && header === 'Bienvenido Instructor') navigation('/profileInstructor')
        else if(isAuthenticated && header === 'Bienvenido SuperAdmind') navigation('/profileSuperAdmind')
            
    }, [isAuthenticated])

    // useEffect(() => {
    //     if(!isAuthenticated) navigation('/home')
    // }, [isAuthenticated])

    const getErrorMessage = (error: FieldError | undefined) => {
        return error ? error.message : null;
    };

    return (
        
        <div className="login-container">
            <div className="error-container">
            {
                errores.map((error, i) => {
                    return (
                        <div key={i}>
                            {error}
                        </div>
                    );
                })
            }
            </div>
            
            <div className="login-box" style={{ height: boxHeight }}>
                <h1 style={{ color: "#5c7ece" }}>{header}</h1>

                <form onSubmit={onSubmit}>
                    {inputs.map((input) => (
                        <div key={input.name}>
                            <label style={{ color: '#5c7ece' }} htmlFor={input.name}>{input.label}</label>
                            <div className="textbox">
                                <input
                                    id={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    {...register(input.name, {
                                        required: input.type === "text" || input.type === "password" || input.type === "email" || input.type === "date" || input.type === "radio" ? {
                                            value: true,
                                            message: `${input.label} es requerido`
                                        } : undefined,
                                        minLength: input.type === "text" ? {
                                            value: 2,
                                            message: `${input.label} debe tener al menos 2 caracteres`
                                        } : undefined,
                                        maxLength: input.type === "text" ? {
                                            value: 25,
                                            message: `${input.label} debe tener como máximo 25 caracteres`
                                        } : undefined,
                                        pattern: input.type === "email" ? {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "Correo electrónico no es válido"
                                        } :
                                            input.type === "password" ? {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                                                message: "La contraseña debe tener entre 8 y 15 caracteres, y debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial"
                                            } : undefined,

                                    })}
                                />
                                {
                                    errors[input.name] && (
                                        <span className="error-message">
                                            {getErrorMessage(errors[input.name] as FieldError)}
                                        </span>
                                    )
                                }
                            </div>
                        </div>

                    ))}
                    <br />
                    <br />
                    <button type="submit" className="btnn">Submit</button>
                </form>
            </div>

            {/* <div className="login-box">
            <h1 style={{color: "#5c7ece"}}>Iniciar Sesión</h1>
            <form >
                <div className="textbox">
                    <input type="text" placeholder="Usuario" required />
                </div>
                <div className="textbox">
                    <input type="password" placeholder="Contraseña" required />
                </div>
                <input type="submit" className="btnn" value="Entrar" />
            </form>
        </div> */}
        </div>
    );
}

export default Form;
