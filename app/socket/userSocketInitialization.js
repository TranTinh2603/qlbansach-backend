const UserController = require("../controllers/user.controller");

async function initializeUserSockets() {
    let users = [];
    users = await UserController.findAllUser();
    for (const user of users) {
        user['socketId'] = null;
    }
    return users;
}

module.exports = initializeUserSockets;
