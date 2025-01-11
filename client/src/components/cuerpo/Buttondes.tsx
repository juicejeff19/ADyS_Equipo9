import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyDropdown: React.FC = () => {
  return (
    <DropdownButton id="dropdown-basic-button" title="Información importante">
      {/* Especificamos 'as={Link}' para usar el componente Link y pasamos 'to' como ruta */}
      <Dropdown.Item as={Link} to="/eventsList">
        Próximos Eventos
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/completedEvents">
        Eventos Concluidos
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/featuredAthletes">
        Atletas Destacados
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/coaches">
        Coaches
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/contact">
        Contacto
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default MyDropdown;