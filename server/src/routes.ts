import { Router } from "express";
import { addAdsToGameIDController } from "./controllers/addAdsToGameIDController";
import { addGameController } from "./controllers/addGameController";
import { getAdsIdController } from "./controllers/getAdsIdController";
import { getGameController } from "./controllers/getGameController";
import { getGameIdAdsController } from "./controllers/getGameIdAdsController";

export const routes = Router();

routes.get("/games", getGameController);
routes.get("/games/:id/ads", getGameIdAdsController);
routes.get("/ads/:id/discord", getAdsIdController);
routes.post("/games/:gameId/ads", addAdsToGameIDController);
routes.post("/games", addGameController);
