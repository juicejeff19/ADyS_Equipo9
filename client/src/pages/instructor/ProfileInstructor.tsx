import Card from 'react-bootstrap/Card';
import './ProfileInstructor.css';

function ProfileInstructor() {
  const frasesInspiracion = [
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'La mejor manera de predecir el futuro es creándolo.',
    'No tengas miedo de renunciar a lo bueno para ir por lo grandioso.',
    'El único lugar donde el éxito viene antes que el trabajo es en el diccionario.',
    'No te rindas, el principio siempre es la parte más difícil.',
    'El fracaso es simplemente la oportunidad de comenzar de nuevo, esta vez con más inteligencia.',
    'Cree en ti mismo y en todo lo que eres.',
    'Cada día es una nueva oportunidad para cambiar tu vida.',
  ];

  return (
    <div className="profile-instructor-container">
      <h1>Bienvenido Instructor</h1>
      <div className="card-row">
        {[
          'Primary',
          'Secondary',
          'Success',
          'Danger',
          'Warning',
          'Info',
          'Light',
          'Dark',
        ].map((variant, index) => (
          <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem' }}
          >
            <Card.Header>Frase Inspiradora</Card.Header>
            <Card.Body>
              <Card.Title>{variant} Inspiración</Card.Title>
              <Card.Text>
                {frasesInspiracion[index % frasesInspiracion.length]}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProfileInstructor;