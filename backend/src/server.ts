import app from "./app";
import connectToDB from "./config/db";
import { ENV } from "./config/env";

connectToDB().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(
      `Your server is up and running on PORT:${ENV.PORT} localhost: http://localhost:${ENV.PORT}`,
    );
  });
});
