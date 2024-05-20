import app from "./app.js";
import colors from "colors";
import dotenv from "dotenv";
import { dbConnect } from "./database/database.js";
dotenv.config();

// database connection

await dbConnect();

// port

const PORT = process.env.PORT;

// port

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`.bgBlue));
