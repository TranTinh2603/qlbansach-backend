const QuoteController = require("../controllers/quote.controller")


async function quote(socket, io, users) {
    socket.on('addQuote', async (data) => {
        const addQuote = await QuoteController.createSocket(data)
        const data1 = await QuoteController.findAllSocket();
        socket.emit('addQuote', addQuote)
        io.emit('getQuote', data1)
    })
    socket.on('getQuote', async () => {
        const data1 = await QuoteController.findAllSocket();
        io.emit('getQuote', data1)
    })
    socket.on('setLike', async (quote, userId) => {
        const updateLike = await QuoteController.updateLikesSocket(quote, userId)
        const quotes = await QuoteController.findAllSocket();
        const quotesLiked = quotes.filter(quote => quote.likes.includes(userId))
        socket.emit('getQuoteLiked', quotesLiked)
        io.emit('getQuote', quotes)
    })
    socket.on('editQuote', async (data) => {
        const updateQuote = await QuoteController.updateQuoteSocket(data);
        // const addQuote = await QuoteController.createSocket(data)
        const data1 = await QuoteController.findAllSocket();
        socket.emit('editQuote', updateQuote)
        io.emit('getQuote', data1)
    })
    socket.on('deleteQuote', async (data) => {
        const deleteQuote = await QuoteController.deleteSocket(data);
        const data1 = await QuoteController.findAllSocket();
        socket.emit('deleteQuote', deleteQuote)
        io.emit('getQuote', data1)
    })
    socket.on('getQuoteLiked', async (data) => {
        const quotes = await QuoteController.findAllSocket();
        const quotesLiked = quotes.filter(quote => quote.likes.includes(data))
        const data1 = await QuoteController.findAllSocket();
        socket.emit('getQuoteLiked', quotesLiked)
        io.emit('getQuote', data1)
    })

}

module.exports = quote;