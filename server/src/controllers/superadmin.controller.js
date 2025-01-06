import SuAdmin from '../models/superadmin.model.js'
import bcrypt from 'bcryptjs';
import createAccessToken from '../libs/jwt.js';
import { SALT_ROUNDS } from '../config.js';

class SuAdminController {
    async register(req, res) {
        const { username, email, password, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const newSuAdmin = new SuAdmin({
                username,
                email,
                password: hashedPassword,
                role,
            })

            const SuAdminSaved = await newSuAdmin.save();

            //en el payload no asignamos contaseña 
            //o direccion para no exponer esos datos a
            //alguien que pueda acceder al token
            const token = createAccessToken({ id: SuAdminSaved._id });
            res
                .cookie('acces_token', token, {
                    httpOnly: true
                })
                .json({
                    id: SuAdminSaved._id,
                    username: SuAdminSaved.username,
                    email: SuAdminSaved.email
                });

        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const SuAdminFound = await SuAdmin.findOne({ email })
            if (!SuAdminFound) return res.status(404).json({ message: "usuario no encontrado" })

            const compareSuAdmin = await bcrypt.compare(password, SuAdminFound.password);

            if (!compareSuAdmin) return res.status(401).json({ message: "Unauthrorized" })


            const token = createAccessToken({ id: SuAdminFound._id });
            res
                .cookie('acces_token', token, {
                    httpOnly: true
                })
                .json({
                    id: SuAdminFound._id,
                    username: SuAdminFound.username,
                });

        } catch (error) {
            //console.log("entra aqui");
            res.status(500).json({ message: error.message })
        }
    }

    logout(req, res) {
        //res.status(500).json({message: "hola"})
        try {
            //console.log("intentando limpiar cookie")
            res.cookie('acces_token', "", {
                expires: new Date(0),
                httpOnly: true,
            })
            console.log("cookie bien limpiada")
            return res.status(200).json({ message: "Logout exitoso" });;
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    async profile(req, res) {
        const SuAdminFound = await SuAdmin.findById(req.admin.id);

        if (!SuAdminFound) return res.status(400).json({ message: "SuperAdmin not found" });

        return res.json({
            id: SuAdminFound._id,
            username: SuAdminFound.username,
            email: SuAdminFound.email
        })
    }

    async editar(req, res) {
        try {
            const updatedSuAdmin = await SuAdmin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedSuAdmin) return res.status(404).json({ message: "SuperAdmin not found" });
            res.status(200).json(updatedSuAdmin);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    //WRITE HERE THE CODE FOR THE CRUD OPERATIONS
    // Admin CRUD operations
    async createAdmin(req, res) {
        try {
            const newAdmin = new Admin(req.body);
            await newAdmin.save();
            res.status(201).json(newAdmin);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAdmins(req, res) {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateAdmin(req, res) {
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });
            res.status(200).json(updatedAdmin);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteAdmin(req, res) {
        try {
            const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
            if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });
            res.status(200).json({ message: "Admin deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Competidor CRUD operations
    async createCompetidor(req, res) {
        try {
            const newCompetidor = new Competidor(req.body);
            await newCompetidor.save();
            res.status(201).json(newCompetidor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCompetidores(req, res) {
        try {
            const competidores = await Competidor.find();
            res.status(200).json(competidores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCompetidor(req, res) {
        try {
            const updatedCompetidor = await Competidor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCompetidor) return res.status(404).json({ message: "Competidor not found" });
            res.status(200).json(updatedCompetidor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteCompetidor(req, res) {
        try {
            const deletedCompetidor = await Competidor.findByIdAndDelete(req.params.id);
            if (!deletedCompetidor) return res.status(404).json({ message: "Competidor not found" });
            res.status(200).json({ message: "Competidor deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Instructor CRUD operations
    async createInstructor(req, res) {
        try {
            const newInstructor = new Instructor(req.body);
            await newInstructor.save();
            res.status(201).json(newInstructor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getInstructors(req, res) {
        try {
            const instructors = await Instructor.find();
            res.status(200).json(instructors);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateInstructor(req, res) {
        try {
            const updatedInstructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedInstructor) return res.status(404).json({ message: "Instructor not found" });
            res.status(200).json(updatedInstructor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteInstructor(req, res) {
        try {
            const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
            if (!deletedInstructor) return res.status(404).json({ message: "Instructor not found" });
            res.status(200).json({ message: "Instructor deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

const controller = new SuAdminController();
//export const register = controller.register.bind(controller);
export const login = controller.login.bind(controller);
export const logout = controller.logout.bind(controller);
export const profile = controller.profile.bind(controller);
export const editar = controller.editar.bind(controller);
export const createAdmin = controller.createAdmin.bind(controller);
export const getAdmins = controller.getAdmins.bind(controller);
export const updateAdmin = controller.updateAdmin.bind(controller);
export const deleteAdmin = controller.deleteAdmin.bind(controller);

export const createCompetidor = controller.createCompetidor.bind(controller);
export const getCompetidores = controller.getCompetidores.bind(controller);
export const updateCompetidor = controller.updateCompetidor.bind(controller);
export const deleteCompetidor = controller.deleteCompetidor.bind(controller);

export const createInstructor = controller.createInstructor.bind(controller);
export const getInstructors = controller.getInstructors.bind(controller);
export const updateInstructor = controller.updateInstructor.bind(controller);
export const deleteInstructor = controller.deleteInstructor.bind(controller);