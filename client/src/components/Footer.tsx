import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-5">
                <div className="row">
                    {/* About Us */}
                    <div className="col-md-3">
                        <h5>Sobre nosotros</h5>
                        <p>Somos un grupo de 4 estudiante de la Escuela Superior de Cómputo del IPN, de la carrera de Ingeniería en Sistemas Computacionales</p>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="col-md-3">
                        <h5>Refrencias rápidas</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Inicio</a></li>
                            <li><a href="#" className="text-white">Acerca de nosotros</a></li>
                            <li><a href="#" className="text-white">Conocenos</a></li>
                            <li><a href="#" className="text-white">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div className="col-md-3">
                        <h5>Contactanos</h5>
                        <ul className="list-unstyled">
                            <li><a href="mailto:info@website.com" className="text-white">Email: clubdeleones@gmail.com</a></li>
                            <li><a href="tel:+1234567890" className="text-white">Telefono: 5567896754</a></li>
                            <li><a href="#" className="text-white">Instituto Leonitecnico Nacional</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-3">
                        <h5>Siguenos</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="text-white">
                                    <i className="fab fa-github fa-2x"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-4" />

                {/* Copyright and Legal */}
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6 text-md-end">
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="#" className="text-white">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="#" className="text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;