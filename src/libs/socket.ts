import { Server as SocketIO} from "socket.io";
import { Server } from "http";
import User from "../models/User";

let io: SocketIO;

export const initIO = (httpServer: Server): SocketIO => {

    io = new SocketIO(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || ''
        }
    });

    io.on("connection", async (socket) => {
        const { username } = socket.handshake.query;
        console.log(`Usuário conectado: ${ username }`);

        if (username && username !== "undefined" && username !== "null") {
            const user = await User.findOne({ username });
            if (user) {
              user.status = "online";
              await user.save();
              console.log("Usuário online!");
            }
        }

    });

    return io;
};

export const getIO = (): SocketIO => {
    if (!io) {
      throw new Error("Socket IO not initialized");
    }
    return io;
};