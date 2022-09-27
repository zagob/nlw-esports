import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function getAdsIdController(req: Request, res: Response) {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
}
