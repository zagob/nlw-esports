import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function getGameController(req: Request, res: Response) {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
}
