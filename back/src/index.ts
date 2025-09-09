import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

//local dependencies
import handleRedirectIndex from "./utils/handleRedirectIndex";
import Config from "./utils/config";
import translator from "./utils/i18n";
import corsOptionsDelegate from "./utils/cors";
import errorHandler from "./utils/errorHandler";
import { connectionCheck } from "./utils/db";
import routers from "./routers";

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

const startServer = async () => {
  try {
    const port = Config.PORT;

    app.use(express.json());
    app.use(cors(corsOptionsDelegate));
    app.use(errorHandler);
    app.use(translator);
    app.use(compression());
    app.use(cookieParser());
    app.use(
      fileUpload({
        limits: { fileSize: 100 * 1024 * 1024 }, // Ограничение на размер файла в байтах (100 MB)
      })
    );
    app.use(routers);

    app.use(`/`, express.static("public"));

    app.use("/", handleRedirectIndex);

    app.listen(port, async () => {
      console.log("Application listening on port: ", port);
      await connectionCheck();
    });
  } catch (error) {
    console.log("error startServer: ", error.message);
  }
};

startServer();
