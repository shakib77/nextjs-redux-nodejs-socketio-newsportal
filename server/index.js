import {Server} from "socket.io";

const io = new Server({
    cors: {
        origin: 'http://localhost:3000'
    }
})

let onlineUsers = [];

const addNewUser = (userName, socketId) => {
    !onlineUsers.some((user) => user.username === userName && onlineUsers.push({userName, socketId}))
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
}

// const getUser = (userName) => onlineUsers.find((user) => user.username === userName)

io.on('connection', (socket) => {
    socket.on('newUser', (userName) => {
        addNewUser(userName, socket.id)
    });

    socket.on('setPost', (post)=> {
        console.count(post)
        io.emit('getPost', post)
    })

    socket.on('disconnect', ()=> {
        removeUser(socket.id)
    })
})

io.listen(5000, ()=> {
    console.log('Server is running on Port: 5000')
})
