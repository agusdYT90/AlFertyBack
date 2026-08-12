import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const Discord = {
    async sendMessage(content) {
        try {
            const response = await fetch(process.env.DISCORD_TOKEN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content })
            });

            if (!response.ok) {
                throw new Error(`Error al notificar el pedido: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            console.error("Error en DiscordService:", err.message);
            throw err;
        }
    }
};
