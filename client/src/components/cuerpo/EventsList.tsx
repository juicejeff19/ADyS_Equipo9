import React from "react";

interface Event {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  closingOfRegistrations: string;
  cost: number;
  requirements: string;
  rules: string;
  kilometers: number;
  description: string;
}

const events: Event[] = [
  {
    _id: "6776e936468d9a6fd361a599",
    name: "Carrera Anual 2025",
    startDate: "2025-05-10T08:00:00.000+00:00",
    endDate: "2025-05-10T12:00:00.000+00:00",
    closingOfRegistrations: "2025-05-05T23:59:59.000+00:00",
    cost: 500,
    requirements: "Ser mayor de 18 años y estar en buen estado físico.",
    rules: "No usar vehículos motorizados ni recibir ayuda externa.",
    kilometers: 10,
    description: "Una carrera de 10 km en la ciudad para corredores aficionados y profesionales.",
  },
  {
    _id: "6779edc980a3c2829fa722b9",
    name: "Super carrerota 2025",
    startDate: "2025-07-10T08:00:00.000+00:00",
    endDate: "2025-07-10T12:00:00.000+00:00",
    closingOfRegistrations: "2025-07-05T07:59:59.000+00:00",
    cost: 450,
    requirements: "Ser mayor de 18 años y estar en buen estado físico.",
    rules: "No usar vehículos motorizados ni recibir ayuda externa.",
    kilometers: 5,
    description: "Una carrera de 5 km en la ciudad para corredores aficionados y profesionales.",
  },
];

const EventsList: React.FC = () => {
  return (
    <div>
      <h1>Eventos Destacados</h1>
      {events.map((event) => (
        <div
          key={event._id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        >
          <h2>{event.name}</h2>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(event.startDate).toLocaleDateString()} -{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Cierre de inscripciones:</strong>{" "}
            {new Date(event.closingOfRegistrations).toLocaleDateString()}
          </p>
          <p>
            <strong>Costo:</strong> ${event.cost}
          </p>
          <p>
            <strong>Requisitos:</strong> {event.requirements}
          </p>
          <p>
            <strong>Reglas:</strong> {event.rules}
          </p>
          <p>
            <strong>Kilómetros:</strong> {event.kilometers} km
          </p>
          <p>
            <strong>Descripción:</strong> {event.description}
          </p>
          <button
            onClick={() => (window.location.href = "/Participantes")}
            style={{
              backgroundColor: "#007BFF",
              color: "#FFF",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Ver participantes inscritos
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
