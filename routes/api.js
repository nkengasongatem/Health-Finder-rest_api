const express = require('express')
const router = express.Router()
const HealthUnit = require('../models/health-unit')

// get a list of health units from the db using URL parameters (longitude & latitude)
router.get('/health-units', (req, res, next) => {
  // HealthUnit.find({}).then(units => res.send(units));
  // Latest release of mongoose does not support Model.geoNear
  HealthUnit.geoNear(
    { 
      type: 'Point', 
      coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    {
       maxDistance: 100000,
       spherical: true
    }
  ).then(units => res.status(200).json(units));
  /*HealthUnit.find({
      location: {
        $geoWithin: {
          $center: [[parseFloat(req.query.lng), parseFloat(req.query.lat)], 100000]
        },
      }
  }).then(units => res.status(200).json(units))
  */
});

// add a new health unit to the db
router.post('/health-units', (req, res, next) => {
  // let unit = new HealthUnit(req.body);  unit.save();
  // create returns a promise
  HealthUnit.create(req.body)
    .then(unit => {
      res.send({
        type: 'POST',
        object: unit
      })
    })
    .catch(next)
})

// update a health unit in the db using a request parameter
router.put('/health-units/:id', (req, res, next) => {
  HealthUnit.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    // find and respond with the updated health unit
    HealthUnit.findOne({ _id: req.params.id }).then(unit => {
      res.send(unit)
    })
  })
})

// delete a health unit from the db using a request parameter
router.delete('/health-units/:id', (req, res, next) => {
  HealthUnit.findByIdAndRemove({ _id: req.params.id }).then(unit => {
    res.send(unit)
  })
})

module.exports = router
