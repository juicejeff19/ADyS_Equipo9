import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import messi from '../../assets/messi.jpeg'
import travieso from '../../assets/travis.jpg'
import ch from '../../assets/chivas.jpeg'

const ProfileAdmin = () => {
  // return <h1>Bienvenido adminnnn</h1>;

  return (
    <>
    <h1>Bienvenido Admin</h1>,
    {/* <h3>Nuevas Noticias</h3> */}
    <Carousel data-bs-theme="dark" style={{ width: '50%', margin: '0 auto',  }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ch}
          alt=""
        />
        <Carousel.Caption>
          <h5 style={{ color: '#00FFFF'}}>First slide label</h5>
          <p style={{ color: '#00FFFF'}}>Creemos en ti</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={messi}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Creemos que nuestros deportistas pueden lograr cosas impresionantes</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={travieso}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 style={{color: 'white'}}>Third slide label</h5>
          <p style={{color: 'white'}}>
          Creemos que el deporte es la clave para una válida saludable
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );

};



export default ProfileAdmin;
