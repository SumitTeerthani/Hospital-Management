// src/components/Patients.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () =&gt; {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] =
        useState({ name: '', age: '', gender: '' });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(
        () =&gt; {
            axios.get('http://localhost:5000/patients')
                .then(response =&gt; setPatients(response.data))
                .catch(error =&gt;
                    console.error('Error fetching patients:', error));
        }, []);


    const handleAddPatient =
        (e) =&gt; {
            e.preventDefault();

            axios.post(
'http://localhost:5000/patients/add', newPatient)
                .then(response =&gt; {
                    console.log(response.data);
                    setPatients([...patients, response.data]);
                    setNewPatient({ name: '', age: '', gender: '' });
                })
                .catch(error =&gt;
                    console.error('Error adding patient:', error));
        };

    const handleUpdatePatient =
        (id, e) =&gt; {
            e.preventDefault();

            axios.post(
`http://localhost:5000/patients/update/${id}`, selectedPatient)
                .then(response =&gt; {
                    const updatePat = {
                        ...selectedPatient,
                        _id: id
                    };

                    console.log('update patient', updatePat);

                    setPatients(
                        patients.map(
                            patient =&gt;
                            (patient._id === id
                                ? updatePat : patient)));

                    setSelectedPatient(null);
                    setIsEditMode(false); // Switch back to Add mode
                })
                .catch(
                    error =&gt;
                        console.error('Error updating patient:', error));
        };

    const handleDeletePatient =
        (id) =&gt; {
            axios.delete(
`http://localhost:5000/patients/delete/${id}`)
                .then(response =&gt; {
                    console.log(response.data);
                    setSelectedPatient(null);
                    setPatients(
                        patients.filter(
                            patient =&gt; patient._id !== id));
                })
                .catch(
                    error =&gt;
                        console.error('Error deleting patient:', error));
        };

    const handleEditPatient =
        (patient) =&gt; {
            setSelectedPatient(patient);
            setIsEditMode(true); // Switch to Edit mode
        };

    return (
        &lt;div className='patient-main  '&gt;
            &lt;div className='form-sections  '&gt;
                &lt;h4&gt;
                    {
                        isEditMode ?
                            'Edit Patient' :
                            'Add New Patient'
                    }
                &lt;/h4&gt;
                &lt;form onSubmit=
                    {
                        isEditMode ?
                            (e) =&gt;
                                handleUpdatePatient(selectedPatient._id, e) :
                            handleAddPatient}&gt;
                    &lt;label&gt;Name: &lt;/label&gt;
                    &lt;input type=&quot;text&quot;
                        value={
                            isEditMode ?
                                selectedPatient.name :
                                newPatient.name
                        }
                        onChange={
                            (e) =&gt;
                                isEditMode
                                    ? setSelectedPatient(
                                        {
                                            ...selectedPatient,
                                            name: e.target.value
                                        }) :
                                    setNewPatient(
                                        {
                                            ...newPatient,
                                            name: e.target.value
                                        }
                                    )} /&gt;
                    &lt;br /&gt;
                    &lt;label&gt;Age: &lt;/label&gt;
                    &lt;input type=&quot;text&quot;
                        value=
                        {
                            isEditMode ?
                                selectedPatient.age : newPatient.age
                        }
                        onChange={
                            (e) =&gt;
                                isEditMode ?
                                    setSelectedPatient(
                                        {
                                            ...selectedPatient,
                                            age: e.target.value
                                        }) :
                                    setNewPatient(
                                        {
                                            ...newPatient,
                                            age: e.target.value
                                        }
                                    )} /&gt;
                    &lt;br /&gt;
                    &lt;label&gt;Gender: &lt;/label&gt;
                    &lt;input type=&quot;text&quot;
                        value=
                        {
                            isEditMode ?
                                selectedPatient.gender :
                                newPatient.gender
                        } onChange={
                            (e) =&gt;
                                isEditMode ?
                                    setSelectedPatient(
                                        {
                                            ...selectedPatient,
                                            gender: e.target.value
                                        }) :
                                    setNewPatient(
                                        {
                                            ...newPatient,
                                            gender: e.target.value
                                        })} /&gt;
                    &lt;br /&gt;
                    &lt;button type=&quot;submit&quot;&gt;
                        {
                            isEditMode ?
                                'Update Patient' :
                                'Add Patient'
                        }
                    &lt;/button&gt;
                &lt;/form&gt;
            &lt;/div&gt;

            &lt;div className='patients-section  '&gt;
                &lt;h3 style={{ textAlign: &quot;center&quot; }}&gt;
                    Patients
                    ({patients.length})
                &lt;/h3&gt;

                &lt;div className=&quot;patient-list&quot;&gt;
                    {patients.map(patient =&gt; (
                        &lt;PatientCard
                            key={patient._id}
                            patient={patient}
                            onEdit={handleEditPatient}
                            onDelete={handleDeletePatient}
                        /&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
};

export default Patients;
