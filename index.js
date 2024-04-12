const app = require("./app");
const config = require("./app/config");
const http = require("http");
const socketIo = require("socket.io");
const MongoDB = require("./app/utils/mongodb.util");
// const UserController = require("./app/controllers/user.controller");
const initializeUserSockets = require("./app/socket/userSocketInitialization");
const notification = require("./app/socket/notification");
const message = require("./app/socket/message");
const quote = require("./app/socket/quote");
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


        // let users = [];
        // users = await UserController.findAllUser();
        // for (const user of users) {
        //     user['socketId'] = null
        // }
        let users = await initializeUserSockets();

        io.on('connection', async (socket) => {
            console.log('A user connected');
            socket.on('setUserId', (userId) => {
                console.log(userId);
                const user = users.find(user => user.userId === userId);
                if (user) {
                    user.socketId = socket.id;
                    console.log(`User ${user.Name} connected with socket id ${socket.id}`);
                }
            });

            notification(socket, users, io)
            message(socket, io)
            quote(socket, io, users)

            // Xử lý sự kiện khi một client ngắt kết nối
            socket.on('disconnect', () => {
                console.log('User disconnected');
                users.forEach(user => {
                    if (user.socketId === socket.id) {
                        user.socketId = null;
                        console.log(`Socket id cleared for user ${user.Name}`);
                    }
                });
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
