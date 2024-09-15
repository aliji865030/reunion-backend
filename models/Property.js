const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    type: String,
    amount_per_day: Number,
    name_of_property: String,
    address: String,
    no_of_beds: Number,
    no_of_bathrooms: Number,
    size_of_room: String,
    amenities: [String],
    available_from: Date,
    image_link: String,
    contact_info: {
        name: String,
        phone: String,
        email: String,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Property', PropertySchema);