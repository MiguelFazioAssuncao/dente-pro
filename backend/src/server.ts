import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Teste");
});

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
