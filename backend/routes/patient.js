// routes/patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.route('/').get((req, res) =&gt; {
    Patient.find()
        .then(patients =&gt;
            res.json(patients))
        .catch(err =&gt;
            res.status(400)
                .json('Error: ' + err));
});

// Add new patient
router.route('/add')
    .post((req, res) =&gt; {
        const { name, age, gender } = req.body;

        const newPatient =
            new Patient({ name, age, gender });

        newPatient.save()
            .then(savedPatient =&gt;
                res.json(savedPatient))
            .catch(err =&gt; res.status(400)
                .json('Error: ' + err));
    });

// Update patient data
router.route('/update/:id')
    .post((req, res) =&gt; {
        console.log('hihhhhiuhiihihiuhiuh');

        Patient.findById(req.params.id)
            .then(patient =&gt; {
                if (!patient) {
                    return res.status(404)
                        .json('Patient not found');
                }

                patient.name = req.body.name;
                patient.age = req.body.age;
                patient.gender = req.body.gender;

                patient.save()
                    .then(() =&gt; res.json('Patient updated!'))
                    .catch(err =&gt; res.status(400)
                        .json('Error: ' + err));
            })
            .catch(err =&gt; res.status(400)
                .json('Error: ' + err));
    });

// Delete patient by ID
router.route('/delete/:id')
    .delete((req, res) =&gt; {
        Patient.findByIdAndDelete(req.params.id)
            .then(patient =&gt; {
                if (!patient) {
                    return res.status(404)
                        .json('Patient not found');
                }
                res.json('Patient deleted!');
            })
            .catch(err =&gt; res.status(400)
                .json('Error: ' + err));
    });

module.exports = router;
