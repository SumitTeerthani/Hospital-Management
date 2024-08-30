// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.route('/').get((req, res) =&gt; {
    Doctor.find()
        .then(doctors =&gt;
            res.json(doctors))
        .catch(err =&gt;
            res.status(400)
                .json('Error: ' + err));
});

// Add new doctor
router.route('/add')
    .post((req, res) =&gt; {
        const { name, specialty } = req.body;

        const newDoctor =
            new Doctor({ name, specialty });

        newDoctor.save()
            // Return the savedDoctor object
            .then(savedDoctor =&gt;
                res.json(savedDoctor))
            .catch(
                err =&gt;
                    res.status(400)
                        .json('Error: ' + err));
    });


// Update doctor data
router.route('/update/:id')
    .post((req, res) =&gt; {
        Doctor.findById(req.params.id)
            .then(doctor =&gt; {
                if (!doctor) {
                    return res.status(404)
                        .json('Doctor not found');
                }

                doctor.name = req.body.name;
                doctor.specialty = req.body.specialty;

                doctor.save()
                    .then(() =&gt; res.json('Doctor updated!'))
                    .catch(err =&gt; res.status(400)
                        .json('Error: ' + err));
            })
            .catch(err =&gt; res.status(400)
                .json('Error: ' + err));
    });

// Delete doctor by ID
router.route('/delete/:id').delete((req, res) =&gt; {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor =&gt; {
            if (!doctor) {
                return res.status(404)
                    .json('Doctor not found');
            }
            res.json('Doctor deleted!');
        })
        .catch(err =&gt; res.status(400)
            .json('Error: ' + err));
});

module.exports = router;
