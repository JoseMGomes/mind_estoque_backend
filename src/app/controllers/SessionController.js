import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação'});
        }

        const { email, password } = req.body;
        // buscar apenas um usuario com esse email
        const user = await User.findOne({ where: { email } });
        // caso o email buscado não exista dar esse erro
        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe' });
        }
        // caso a senha não bate, dar esse erro
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Senhas diferentes' });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id, name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }

}

export default new SessionController();
