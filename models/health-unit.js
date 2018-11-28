const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a geolocation schema & model. Use GEOJSON (geojson.org) for geolocation
// For more details: https://mongoosejs.com/docs/geojson.html
const GeoSchema = new Schema({
    type: {
        default: "Point",
        type: String // Don't do `{ location: { type: String } }`
    },
    coordinates: {
        index: "2dsphere",
        type: [Number],
        required: true
    }
});
// Alternatively: GeoSchema.index({ location: "2dsphere" });
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

// create health unit model
const healthUnit = mongoose.model('healthunit', healthUnitSchema);

module.exports = healthUnit;