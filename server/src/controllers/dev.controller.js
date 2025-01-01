
class DevController {
    async registerEvento(req, res) {
        console.log("hhola")
    }

    async registerSesion(req, res) {
        
    }

    async registerPremio(req, res) {
        
    }

    async registerCompetidor(req, res) {
        
    }

    async registrarResultado(req, res) {
    
    }

    a
}

const controller = new DevController();
export const Evento = controller.registerEvento.bind(controller);
export const Sesion = controller.registerSesion.bind(controller);
export const Premio = controller.registerPremio.bind(controller);
export const Resultado = controller.registrarResultado.bind(controller);
export const Competidor = controller.registerCompetidor.bind(controller);
//export const tipoEvento = controller.registarTipoEvento.bind(controller);