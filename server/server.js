require("dotenv").config();
const app = require("./src/app.js");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("Está rodando na porta http://localhost:" + PORT);
});
