// routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointment =
    require('../models/Appointment');

// Get all appointments
router.route('/').get((req, res) =&gt; {
    Appointment.find()
        .then(appointments =&gt;
            res.json(appointments))
        .catch(err =&gt;
            res.status(400).json('Error: ' + err));
});

// Add new appointment
router.route('/add').post((req, res) =&gt; {
    const { patientName, doctorName, date } = req.body;
    const newAppointment =
        new Appointment({ patientName, doctorName, date });

    newAppointment.save()
        .then(savedAppointment =&gt; res.json(savedAppointment))
        .catch(err =&gt; res.status(400).json('Error: ' + err));
});

// Update appointment data
router.route('/update/:id').post((req, res) =&gt; {
    Appointment.findById(req.params.id)
        .then(appointment =&gt; {
            appointment.patientName =
                req.body.patientName;
            appointment.doctorName =
                req.body.doctorName;
            appointment.date =
                req.body.date;

            appointment.save()
                .then(
                    () =&gt;
                        res.json('Appointment updated!'))
                .catch(
                    err =&gt; res.status(400)
                        .json('Error: ' + err));
        })
        .catch(
            err =&gt; res.status(400)
                .json('Error: ' + err));
});

// Delete appointment
router.route('/delete/:id')
    .delete((req, res) =&gt; {
        Appointment.findByIdAndDelete(req.params.id)
            .then(
                () =&gt; res
                    .json('Appointment deleted.'))
            .catch(
                err =&gt; res
                    .status(400).json('Error: ' + err));
    });

module.exports = router;
