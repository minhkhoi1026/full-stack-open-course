const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.xtct6.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const notes = [
//     new Note({
//         content: 'HTML is Medium',
//         date: new Date(),
//         important: false,
//     }),
//     new Note({
//         content: 'HTML is Super Easy',
//         date: new Date(),
//         important: false,
//     })
// ]

// notes.forEach( 
//     note => note.save().then(result => {
//         console.log('note saved!')
//         mongoose.connection.close()
//     })
// )

Note.find({ important: true }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })