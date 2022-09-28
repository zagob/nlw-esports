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
exports.getAdsIdController = void 0;
const prisma_1 = require("../services/prisma");
function getAdsIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const adId = req.params.id;
        const ad = yield prisma_1.prisma.ad.findUniqueOrThrow({
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
    });
}
exports.getAdsIdController = getAdsIdController;
