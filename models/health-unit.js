const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a geolocation schema & model. Use GEOJSON (geojson.org) for geolocation
// For more details: https://mongoosejs.com/docs/geojson.html
const GeoSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: "Point",
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

// create a health unit schema & model
const healthUnitSchema = new Schema(
    {
        category: {
            type: String,
            required: [true, 'Category field is required']
        },
        name: {
            type: String,
            required: [true, 'Name field is required']
        },
        desc: {
            type: String,
            required: false
        },
        available: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            required: false
        },
        location: {
            type: GeoSchema,
            required: true
        }
       
        // add the adddress
    }
);

// Create index to allow $geoNear query
healthUnitSchema.index({ location: "2dsphere" });

// create health unit model
const healthUnit = mongoose.model('healthunit', healthUnitSchema);

module.exports = healthUnit;