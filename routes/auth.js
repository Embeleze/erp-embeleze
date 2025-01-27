const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Registrar um usuário
// @access  Public
router.post('/register', [
    check('name', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('password', 'Por favor, digite uma senha com 6 ou mais caracteres').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        user = await User.create({
            name,
            email,
            password
        });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Erro ao registrar:', err);
        res.status(500).json({ msg: 'Erro no servidor ao registrar usuário' });
    }
});

// @route   POST api/auth/login
// @desc    Autenticar usuário e retornar token
// @access  Public
router.post('/login', [
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('password', 'Senha é obrigatória').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('Usuário não encontrado:', email);
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            console.log('Senha incorreta para usuário:', email);
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }

        // Atualiza último login
        user.lastLogin = Date.now();
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.error('Erro ao gerar token:', err);
                    throw err;
                }
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ msg: 'Erro no servidor ao fazer login' });
    }
});

// @route   GET api/auth/user
// @desc    Obter usuário logado
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } catch (err) {
        console.error('Erro ao obter usuário:', err);
        res.status(500).json({ msg: 'Erro no servidor ao obter usuário' });
    }
});

module.exports = router; 