const app = require("./app");
const config = require("./app/config");
const http = require("http");
const socketIo = require("socket.io");
const MongoDB = require("./app/utils/mongodb.util");
const MessageController = require("./app/controllers/message.controller");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");

        const server = http.createServer(app);
        const io = socketIo(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', async (socket) => {
            console.log('A user connected');
            socket.on('getMessage', async (a, b) => {
                const getMessage = await MessageController.findBySenderIdAndReceiverId(a, b);
                socket.emit('getMessage', getMessage);
            });
            socket.on('room', async (data) => {
                const rooms = await MessageController.findBySenderIdAndReceiverId(data.senderId, data.receiverId);
                console.log(rooms);
                if (rooms.length > 0) {
                    for (const room of rooms) {
                        socket.join(room.roomId);
                        break
                    }
                } else {
                    const createRoom = await MessageController.create(data);
                    socket.join(data.roomId);
                }


            })
            // const message = await MessageController.findAll();
            // // console.log(message);
            // socket.emit('message', message);
            socket.on('chat message', async (msg) => {
                const createMessage = await MessageController.create(msg);
                const getMessage = await MessageController.findBySenderIdAndReceiverId(msg.senderId, msg.receiverId);
                socket.emit('chat message', getMessage);
                console.log(msg.roomId);
                io.to(msg.roomId).emit('chat message', getMessage);
            });


            // Xử lý sự kiện khi một client ngắt kết nối
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });

        const PORT1 = config.app.port1;
        const PORT2 = config.app.port2;
        app.listen(PORT1, () => {
            console.log(`Server is running on port ${PORT1}.`);
        });
        server.listen(PORT2, () => {
            console.log(`Server is running on port ${PORT2}.`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();
