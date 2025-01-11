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
        _id: "677751099dd19b16dbe249fc",
        name: "Maratón de nado con aletas",
        startDate: "2025-01-10T13:00:00.000+00:00",
        endDate: "2025-01-10T15:00:00.000+00:00",
        closingOfRegistrations: "2025-01-05T12:59:59.000+00:00",
        cost: 600,
        requirements: "Saber nadar de a muertito.",
        rules: "Nadar de a muertito, si no habrá descalificación.",
        kilometers: 1,
        description: "Una carrera de 1km de a muertito bien intensa.",
    },
    {
        _id: "677484c81ceb6a653a1c76d3",
        name: "Rodada in-doors",
        startDate: "2024-05-18T02:00:00.000+00:00",
        endDate: "2024-05-28T02:00:00.000+00:00",
        closingOfRegistrations: "2024-05-15T08:00:00.000+00:00",
        cost: 200,
        requirements: "Los participantes deben tener al menos 18 años y usar aletas.",
        rules: "Se debe nadar en aguas abiertas siguiendo el recorrido marcado.",
        kilometers: 5,
        description: "Evento de maratón de nado en aguas abiertas con uso obligatorio de aletas.",
    }

];

const CompletedEvents: React.FC = () => {
    return (
        <div>
            <h1>Eventos Concluidos</h1>
            {events.map((event) => (
                <div key={event._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                    <h2>{event.name}</h2>
                    <p>
                        <strong>Fecha:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Cierre de inscripciones:</strong> {new Date(event.closingOfRegistrations).toLocaleDateString()}
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

export default CompletedEvents;