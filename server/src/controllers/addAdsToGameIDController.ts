import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { convertHourStringToMinutes } from "../utils/convertHourStringToMinutes";

export async function addAdsToGameIDController(req: Request, res: Response) {
  const gameId = req.params.gameId;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
}
