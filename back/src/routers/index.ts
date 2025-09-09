import { Request, Response, Router } from "express";
import userRoute from "../user";
import PostRoute from "../post";
import sharedRoute from "../shared";
import bannerRoute from "../banner";

const api = Router()
  .use("/user", userRoute)
  .use("/shared", sharedRoute)
  .use("/post", PostRoute)
  .use("/banner", bannerRoute);

api.use((_: Request, res: Response) => {
  res.status(404).json({ error: "API not found" });
});

export default Router().use("/site/api", api);
