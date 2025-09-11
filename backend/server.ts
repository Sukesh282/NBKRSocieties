import { app } from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });

  console.log("Server started");
};

startServer();
