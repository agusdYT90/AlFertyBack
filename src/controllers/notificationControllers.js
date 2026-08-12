import { Discord } from "../services/notificationService.js";

export const NotificationController = {
    async notify(req, res, next) {
        try {
            const { message } = req.body;
            const result = await Discord.sendMessage(message);
            res.status(200).json({ success: true, result });
        } catch (err) {
            next(err);
        }
    }
};
