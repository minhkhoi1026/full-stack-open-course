const mongoose = require('mongoose')

if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('Wrong format!')
    console.log('Add new person: node mongo.js <password> <name> <number>')
    console.log('See all entries: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.xtct6.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true })

// define document schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// make an constructor function from document schema
const Person = mongoose.model('Person', personSchema)

// if argv length = 5 then add new person into database
if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`Added ${name} ${number}`)
        mongoose.connection.close()
    })
}
// if argv length = 3 then print all person of database
if (process.argv.length == 3) {
    console.log('Phonebook:')
    Person.find({}).then(
        result => {
            result.forEach( person => console.log(`${person.name} ${person.number}`) )
            mongoose.connection.close()
        }
    )
}



