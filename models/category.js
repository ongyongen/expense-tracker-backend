const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }]
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Category', categorySchema)