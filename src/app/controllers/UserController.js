import User from "../models/User";
import * as Yup from "yup";

class UserController {
    async store(req, res) {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "falha na validação" });
            }

            const userExists = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExists) {
                return res.status(400).json({ error: "Esse usuário já existe" });
            }

            const user = await User.create(req.body);

            return res.json({...user.dataValues});
        }catch(err){
            return res.status(500).json({ error: "erro no servidor" });
        }
    }
}

export default new UserController();

