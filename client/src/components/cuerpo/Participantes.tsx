import React from "react";

const Participantes = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Participantes</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px auto",
          maxWidth: "600px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007BFF", color: "#FFF" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Campo</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Nombre</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Juan Pérez Pepito</td>
          </tr>
          <tr style={{ backgroundColor: "#f9f9f9" }}>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Edad</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>25</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Género</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Hombre</td>
          </tr>
          <tr style={{ backgroundColor: "#f9f9f9" }}>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Categoría</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Adulto</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Metros recorridos</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>2500</td>
          </tr>
          <tr style={{ backgroundColor: "#f9f9f9" }}>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Lugar</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>6to</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Destacado</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>No</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Participantes;
