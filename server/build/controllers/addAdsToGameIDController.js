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
exports.addAdsToGameIDController = void 0;
const prisma_1 = require("../services/prisma");
const convertHourStringToMinutes_1 = require("../utils/convertHourStringToMinutes");
function addAdsToGameIDController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = req.params.gameId;
        const body = req.body;
        const ad = yield prisma_1.prisma.ad.create({
            data: {
                gameId,
                name: body.name,
                yearsPlaying: body.yearsPlaying,
                discord: body.discord,
                weekDays: body.weekDays.join(","),
                hourStart: (0, convertHourStringToMinutes_1.convertHourStringToMinutes)(body.hourStart),
                hourEnd: (0, convertHourStringToMinutes_1.convertHourStringToMinutes)(body.hourEnd),
                useVoiceChannel: body.useVoiceChannel,
            },
        });
        return res.status(201).json(ad);
    });
}
exports.addAdsToGameIDController = addAdsToGameIDController;
