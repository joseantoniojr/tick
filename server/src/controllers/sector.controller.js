const prisma = require("../config/prisma.js");

const createSector = async (req, res) => {
	try {
		const { eventId, sessionId } = req.params;
		const { nameSector, fullPrice, ticketsAvailable } = req.body || {};

		if (!nameSector || !fullPrice || !ticketsAvailable) {
			return res.status(400).json({ message: "Campos obrigatórios" });
		}

		const event = await prisma.event.findUnique({ where: { id: eventId } });
		if (!event) return res.status(404).json({ message: "Evento não encontrado" });
		if (event.authorId !== req.userId) return res.status(403).json({ message: "Sem permissão" });

		const session = await prisma.session.findFirst({ where: { id: sessionId, eventId } });
		if (!session) return res.status(404).json({ message: "Sessão não encontrado" });

		const sector = await prisma.sector.create({
			data: { nameSector, fullPrice, ticketsAvailable, sessionId },
		});

		return res.status(201).json(sector);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const updateSector = async (req, res) => {
	try {
		const { eventId, sessionId, id } = req.params;
		const { nameSector, fullPrice, ticketsAvailable } = req.body;

		const event = await prisma.event.findUnique({ where: { id: eventId } });
		if (!event) return res.status(404).json({ message: "Evento não encontrado" });
		if (event.authorId !== req.userId) return res.status(403).json({ message: "Sem permissão" });

		const session = await prisma.session.findFirst({ where: { id: sessionId, eventId } });
		if (!session) return res.status(404).json({ message: "Sessão não encontrado" });

		const data = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v !== undefined));

		if (Object.keys(data).length === 0)
			return res.status(400).json({ message: "Preencha o campo que deseja atualizar" });

		const updated = await prisma.sector.update({
			where: { id },
			data,
		});

		return res.status(200).json(updated);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const deleteSector = async (req, res) => {
	try {
		const { eventId, sessionId, id } = req.params;

		const event = await prisma.event.findUnique({ where: { id: eventId } });
		if (!event) return res.status(404).json({ message: "Evento não encontrado" });
		if (event.authorId !== req.userId) return res.status(403).json({ message: "Sem permissão" });

		const session = await prisma.session.findFirst({ where: { id: sessionId, eventId } });
		if (!session) return res.status(404).json({ message: "Sessão não encontrado" });

		await prisma.sector.delete({ where: { id } });

		return res.status(200).json({ message: "Deletado setor com sucesso" });
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

module.exports = { createSector, updateSector, deleteSector };
