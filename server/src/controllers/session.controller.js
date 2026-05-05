const prisma = require("../config/prisma.js");

const createSession = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { scheduledAt } = req.body || {};

		if (!scheduledAt) return res.status(400).json({ message: "Data é obrigatória" });

		const event = await prisma.event.findUnique({ where: { id: eventId } });
		if (!event) return res.status(404).json({ message: "Evento não encontrado" });

		if (event.authorId !== req.userId) return res.status(403).json({ message: "Sem permissão" });

		const session = await prisma.session.create({
			data: {
				scheduledAt: new Date(scheduledAt),
				eventId,
			},
		});
		return res.status(201).json(session);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const updateSession = async (req, res) => {
	try {
		const { eventId, id } = req.params;
		const { scheduledAt } = req.body;

		const session = await prisma.session.findUnique({ where: { id } });
		if (!session) return res.status(404).json({ message: "Session não encontrado" });

		const event = await prisma.event.findUnique({ where: { id: session.eventId } });
		if (event.authorId !== req.userId) return res.status(403).json({ message: "Sem permissão" });

		const updatedSession = await prisma.session.update({
			where: { id },
			data: { scheduledAt },
		});

		return res.status(200).json(updatedSession);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const deleteSession = async (req, res) => {
	try {
		const { eventId, id } = req.params;

		const session = await prisma.session.findUnique({ where: { id } });
		if (!session) return res.status(404).json({ message: "Session não encontrado" });

		const event = await prisma.event.findUnique({ where: { id: session.eventId } });
		if (event.authorId !== req.userId) return res.status(403).json({ message: "Sem permissão" });

		await prisma.session.delete({ where: { id } });

		return res.status(200).json({ message: "Sessão deletado com sucesso" });
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

module.exports = { createSession, updateSession, deleteSession };
