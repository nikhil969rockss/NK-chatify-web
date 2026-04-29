import app from "./app";
import connectToDB from "./config/db";
import { PORT } from "./config/env";

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Your server is up and running on PORT:${PORT} localhost: http://localhost:${PORT}`,
    );
  });
});
