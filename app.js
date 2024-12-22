const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Ruta consultada: ${req.method} ${req.path}`);
  next();
});

app.use("/api", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
