const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// connect to database
console.log('connecting to', url)
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
.then( result => console.log('connected to mongoDB'))
.catch( error => console.log('error connecting to MongoDB:', error.message))
// define document schema
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    date: { 
        type: Date,
        required: true
    },
    important: Boolean
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
// export constructor compiled from schema
module.exports = mongoose.model('Note', noteSchema)