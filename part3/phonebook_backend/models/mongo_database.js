const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// connect to database
console.log('Connecting to MongoDB...')
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true })
.then(result => console.log('Connected to MongoDB'))
.catch(error => console.log('Error in connected: ', error.message))


// define document schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
// change collection to more readable format
personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

// export constructor compiled from schema
module.exports = mongoose.model('Person', personSchema)