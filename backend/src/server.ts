import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import googleRoutes from "./routes/googleRoutes";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", googleRoutes);

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
