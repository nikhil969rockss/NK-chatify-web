import connectToDB from "./config/db";
import { ENV } from "./config/env";
import { app, server } from "./config/socket";

connectToDB().then(() => {
  server.listen(ENV.PORT, () => {
    console.log(
      `Your server is up and running on PORT:${ENV.PORT} localhost: http://localhost:${ENV.PORT}`,
    );
  });
});
