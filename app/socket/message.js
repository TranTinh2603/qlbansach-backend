const MessageController = require("../controllers/message.controller");

function message(socket, io) {
    socket.on('getMessage', async (a, b) => {
        const getMessage = await MessageController.findBySenderIdAndReceiverId(a, b);
        socket.emit('getMessage', getMessage);
    });
    socket.on('room', async (data) => {
        const rooms = await MessageController.findBySenderIdAndReceiverId(data.senderId, data.receiverId);
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
        io.to(msg.roomId).emit('chat message', getMessage);
    });
}
module.exports = message