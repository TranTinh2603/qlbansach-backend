function notification(socket, users, io) {
    socket.on('sendNotification', ({ userId, message }) => {
        console.log(userId, message);
        const user = users.find(user => user.userId === userId);
        if (user && user.socketId) {
            io.to(user.socketId).emit('notification', message);
            console.log(`Notification sent to ${user.Name}: ${message}`);
        }
    });

}
module.exports = notification; 