import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import googleRoutes from "./routes/googleRoutes";
import userModel from "./models/UserModel";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", googleRoutes);

(async () => {
  try {
    await userModel.createTable();
    console.log("Tabela users criada ou já existente");
  } catch (error) {
    console.error("Erro ao criar tabela users:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
