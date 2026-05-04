const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma.js");

// cadastrar usuário
const register = async (req, res) => {
	const { name, email, password } = req.body || {};

	if (!name || !email || !password) return res.status(400).json({ message: "Preencha todos os campos" });

	try {
		const emailDb = await prisma.user.findUnique({ where: { email } });
		if (emailDb) return res.status(400).json({ message: "Email já existente! Tente outro email." });

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { name, email, password: encryptedPassword },
		});

		return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erro interno do servidor" });
	}
};

// login do usuário
const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ message: "Preencha todos os campos" });

	try {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) return res.status(401).json({ message: "Usuário não existe!" });
		else {
			const passwordCompared = await bcrypt.compare(password, user.password);

			if (!passwordCompared) return res.status(401).json({ message: "Senha incorreta!" });

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
			return res.status(200).json({ token });
		}
	} catch (error) {
		return res.status(500).json({ message: "Erro interno do servidor" });
	}
};

module.exports = { register, login };
