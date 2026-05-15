const prisma = require("../config/prisma.js");

const getEvents = async (req, res) => {
	try {
		const events = await prisma.event.findMany({ include: { sessions: true } });
		return res.status(200).json(events);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const getEventById = async (req, res) => {
	try {
		const id = req.params.id;
		const event = await prisma.event.findUnique({
			where: { id },
			include: {
				sessions: {
					include: {
						sectors: {
							include: { tickets: true },
						},
					},
				},
			},
		});

		if (!event) return res.status(404).json({ message: "Evento não encontrado" });

		return res.status(200).json(event);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const getMyEvents = async (req, res) => {
	try {
		const userId = req.userId;

		const events = await prisma.event.findMany({ where: { authorId: userId } });
		if (!events) return res.status(404).json({ message: "Evento não encontrado" });

		return res.status(200).json(events);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const createEvent = async (req, res) => {
	try {
		const { title, description, indicativeRating, category, banner } = req.body;

		const userId = req.userId;

		if (!title || !description || !indicativeRating || !category || !banner) {
			return res.status(400).json({ message: "Campos obrigatórios" });
		}

		const event = await prisma.event.create({
			data: {
				title,
				description,
				indicativeRating,
				category,
				banner,
				authorId: userId,
			},
		});

		return res.status(201).json(event);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const updateEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, indicativeRating, category, banner } = req.body;

		const userId = req.userId;

		const event = await prisma.event.findUnique({ where: { id } });
		if (!event) return res.status(404).json({ message: "Evento não encontrado" });

		if (event.authorId !== userId) return res.status(403).json({ message: "Sem permissão" });

		const updatedEvent = await prisma.event.update({
			where: { id },
			data: { title, description, indicativeRating, category, banner },
		});

		return res.status(200).json(updatedEvent);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const { id } = req.params;

		const event = await prisma.event.findUnique({ where: { id } });
		if (!event) return res.status(404).json({ message: "Evento não encontrado" });

		const userId = req.userId;
		if (event.authorId !== userId) return res.status(403).json({ message: "Sem permissão" });

		await prisma.event.delete({ where: { id } });

		return res.status(200).json({ message: "Evento deletado com sucesso" });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

module.exports = { getEvents, getEventById, getMyEvents, createEvent, updateEvent, deleteEvent };
