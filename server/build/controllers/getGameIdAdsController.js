"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameIdAdsController = void 0;
const prisma_1 = require("../services/prisma");
const convertMinutesToHourString_1 = require("../utils/convertMinutesToHourString");
function getGameIdAdsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = req.params.id;
        const ads = yield prisma_1.prisma.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
            },
            where: {
                gameId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(ads.map((ad) => (Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(","), hourStart: (0, convertMinutesToHourString_1.convertMinutesToHourString)(ad.hourStart), hourEnd: (0, convertMinutesToHourString_1.convertMinutesToHourString)(ad.hourEnd) }))));
    });
}
exports.getGameIdAdsController = getGameIdAdsController;
