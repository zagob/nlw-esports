import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function addGameController(req: Request, res: Response) {
  const { title, bannerUrl } = req.body;

  const result = await prisma.game.create({
    data: {
      title,
      bannerUrl,
    },
  });

  return res.status(201).json(result);
}
