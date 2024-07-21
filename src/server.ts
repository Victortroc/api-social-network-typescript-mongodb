import app from "./app";
import { initIO } from "./libs/socket";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI!, {
}).then(() => {

    console.log('🤖 Conectado ao MongoDB');
    const server = app.listen(process.env.PORT, () => {
        console.log(`🚀 Server está rodando na porta ${process.env.PORT}`);
    });
    initIO(server);

}).catch((error) => {
    console.error('Erro ao conectar-se com o MongoDB:', error);
});
