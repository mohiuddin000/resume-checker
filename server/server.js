import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import app from "./app.js";
import connectDatabase from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

async function startServer() {
    await connectDatabase();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
});
