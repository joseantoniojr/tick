const prisma = require("../config/prisma.js");

const buyTicket = async (req, res) => {
	try {
		const { sectorId, type, qtyTickets } = req.body || {};

		if (!sectorId || !type || !qtyTickets) return res.status(400).json({ message: "Campos obrigatórios" });

		const qty = parseInt(qtyTickets) || 1;

		const sector = await prisma.sector.findUnique({ where: { id: sectorId } });
		if (!sector) return res.status(404).json({ message: "Setor não encontrado" });

		const session = await prisma.session.findFirst({ where: { id: sector.sessionId } });
		if (!session) return res.status(404).json({ message: "Sessão não encontrada" });

		if (sector.ticketsAvailable < qty)
			return res.status(400).json({ message: "Ingressos insuficientes disponíveis" });

		let pricePaid;

		if (type === "full") {
			pricePaid = sector.fullPrice;
		} else {
			pricePaid = sector.fullPrice / 2;
		}

		const tickets = [];
		for (let i = 0; i < qty; i++) {
			const ticket = await prisma.ticket.create({
				data: {
					type,
					pricePaid,
					status: false,
					user: {
						connect: {
							id: req.userId,
						},
					},
					event: {
						connect: {
							id: session.eventId,
						},
					},
					sector: {
						connect: {
							id: sectorId,
						},
					},
					session: {
						connect: {
							id: sector.sessionId,
						},
					},
				},
			});
			tickets.push(ticket);
		}

		await prisma.sector.update({
			where: { id: sectorId },
			data: { ticketsAvailable: { decrement: qty } },
		});

		return res.status(201).json(tickets);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

const getMyTickets = async (req, res) => {
	try {
		const userId = req.userId;
		const tickets = await prisma.ticket.findMany({ where: { userId }, include: { sector: true } });
		return res.status(200).json(tickets);
	} catch (error) {
		return res.status(500).json({ message: "Error interno do servidor" });
	}
};

module.exports = { buyTicket, getMyTickets };
