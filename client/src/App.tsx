// import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/haeder/Header';
// import Login from './pages/Login';
// import Home from './pages/Home';
import Footer from './components/Footer';
import Cuerpo from './components/cuerpo/Cuerpo';
import Form from './components/form/Form';
import AuthProvider from './context/AuthContextAdmin';
import ProfileSuAdmin from './pages/SuperAdmin/ProfileSuAdmin';
import ProfileAdmin from './pages/admin/ProfileAdmin';
import ProfileInstructor from './pages/instructor/ProfileInstructor';
import { ProtectedRoute } from './ProtectedRoutes';
import Logout from './libs/Logout';
import FormIns from './components/Instructor/FormIns';
import FormEvent from './components/Admin/FormEvent';
import EventsList from './components/cuerpo/EventsList';
import CompletedEvents from './components/cuerpo/CompletedEvents';
import Participantes from './components/cuerpo/Participantes';
import ReconocimientoID from './pages/admin/ReconocimientoId';

// import { Placeholder } from 'react-bootstrap';


interface Link {
  name: string;
  url: string;
}

function App() {
  const location = useLocation();

  const loginInputs = [
    { name: 'email', type: 'text', label: 'Email', placeholder: 'Email' },
    { name: 'password', type: 'text', label: 'Password', placeholder: 'Password' }
  ];

  const registerInputs = [
    { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre' },
    { name: 'lastName', type: 'text', label: 'Apellido Paterno', placeholder: 'Apellido' },
    { name: 'lastName1', type: 'text', label: 'Apellido Materno', placeholder: 'Apellido' },
    { name: 'username', type: 'text', label: 'Nombre de Usuario', placeholder: 'Username' },
    { name: 'password', type: 'password', label: 'Contraseña', placeholder: 'Password' },
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Ej: nombre@dominio.com' },
    { name: 'birthdate', type: 'date', label: 'Fecha de Nacimiento', placeholder: 'Birth' }
  ];


  const homeLinks = [
    { name: 'Admin', url: '/admin' },
    { name: 'Instructor', url: '/instructor' },
    { name: 'SuperAdmmin', url: '/superadmin' },
  ];


  // const registerLinks = [
  //   { name: 'Home', url: '/' },
  //   { name: 'Home', url: '/' },

  const adminLinks = [
    { name: 'Home', url: '/' },
    { name: 'Instructor', url: '/instructor' },
    { name: 'SuperAdmin', url: '/superadmin' },
  ]

  const suAdminLinks = [
    { name: 'Home', url: '/' },
    { name: 'Instructor', url: '/instructor' },
    { name: 'Admin', url: '/admin' },
  ]

  const instructorLinks = [
    { name: 'Home', url: '/' },
    { name: 'SuperAdmin', url: '/superadmin' },
    { name: 'Admin', url: '/admin' },
  ]

  const profileAdminLinks = [
    { name: 'RegitrarEvento', url: '/registrarEvento' },
    { name: 'Reconocimiento', url: '/generarReconocimiento' },
    { name: 'Logout', url: '/logout' }
  ]

  const profileInstrucorLinks = [
    { name: 'Registro de Sesion', url: '/registrarResultado' },
    { name: 'Logout', url: '/logout' }
  ]

  const profileSuperAdminLinks = [
    { name: 'Logout', url: '/logout' }
  ]

  const registrarEventoLinks = [
    { name: 'Regresar', url: '/profileAdmin' },
    { name: 'Logout', url: '/logout' }
  ]
  
  const registrarResultadoLinks = [
    { name: 'Regresar', url: '/profileInstructor' },
    { name: 'Logout', url: '/logout' }
  ]

  const routeLinks: { [key: string]: Link[] } = {
    '/admin': adminLinks,
    '/superadmin': suAdminLinks,
    '/instructor': instructorLinks,
    '/': homeLinks,
    '/profileAdmin': profileAdminLinks,
    '/profileInstructor': profileInstrucorLinks,
    '/profileSuperAdmind': profileSuperAdminLinks,
    '/registrarEvento': registrarEventoLinks,
    '/generarReconocimiento': registrarEventoLinks,
    '/registrarResultado': registrarResultadoLinks,
    '/registroExitoso': registrarEventoLinks,
    '/eventsList': registrarEventoLinks,
    '/completedEvents': registrarEventoLinks,
    '/participantes': registrarEventoLinks,
  }
  const links = routeLinks[location.pathname] || homeLinks;

  return (
    <>
      <Header links={links} />
      <div id='root-content'>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Cuerpo />} />
            <Route path='/eventsList' element={<EventsList />}/>
            <Route path='/completedEvents' element={<CompletedEvents />}/>
            <Route path='/participantes' element={<Participantes />}/>
            <Route path='/instructor' element={<Form inputs={loginInputs} boxHeight="560px" header='Bienvenido Instructor' />} />
            <Route path='/superadmin' element={<Form inputs={loginInputs} boxHeight="560px" header='Bienvenido SuperAdmind' />} />
            <Route path='/admin' element={<Form inputs={loginInputs} boxHeight="560px" header='Bienvenido Administrador' />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/profileSuperAdmind' element={<ProfileSuAdmin />} />
              <Route path='/logout' element={<Logout />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/profileInstructor' element={<ProfileInstructor/>} />
              <Route path='/registrarResultado' element={<FormIns />} />
              <Route path='/logout' element={<Logout />} />
              
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/profileAdmin' element={<ProfileAdmin />} />
              <Route path='/registrarEvento' element={<FormEvent />}></Route>
              <Route path='/generarReconocimiento' element={<ReconocimientoID />}></Route>
              <Route path= '/registroExitoso' element={<h1>REGISTRO EXITOSO!!!</h1>}></Route>
              <Route path='/eventos' element={<h1>Eventos</h1>} />
              <Route path='/add-evento' element={<h1>ADD Evento</h1>} />
              <Route path='/evento/:id' element={<h1>Añadir </h1>} />
              <Route path='/logout' element={<Logout />} />
            </Route>
          </Routes>
        </AuthProvider>
        {/* <Cuerpo   /> */}
      </div>

      <Footer />
    </>
  )
}

export default App
