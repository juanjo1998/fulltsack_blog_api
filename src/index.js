import app from "./app.js";
import { dbConnect } from "./database/database.js";
import dotenv from "dotenv";
dotenv.config();

// database connection

await dbConnect();

// port

const PORT = process.env.PORT;

// port

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
