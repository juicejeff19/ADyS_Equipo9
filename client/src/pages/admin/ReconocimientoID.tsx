import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContextAdmin';
import { useForm } from "react-hook-form";

type FormEventValues = {
  id: string;
};

const ReconocimientoID: React.FC = () => {
  const { register, handleSubmit } = useForm<FormEventValues>();
  const { getUserById } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: FormEventValues) => {
    try {
      if (!data.id.trim()) {
        console.error("El ID está vacío o no es válido.");
        return;
      }
  
      // Llama a la función que realiza la solicitud al servidor
      const response = await getUserById(data.id);
  
      // Crea un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reconocimiento.pdf'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
  
      // Limpia el enlace temporal
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      // Manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    }
  });
  

  return (
    <Form onSubmit={onSubmit}>
      <h1>Ingresa ID del competidor</h1>
      <br />
      <br />
      <FloatingLabel
        controlId="floatingInput"
        label="ID del competidor"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Ingresa el ID del competidor"
          {...register('id', { required: true })} // Vincula el input al campo 'id'
        />
      </FloatingLabel>
      <Button type="submit" variant="dark">Enviar</Button> {/* Botón con tipo submit */}
    </Form>
  );
};

export default ReconocimientoID;
