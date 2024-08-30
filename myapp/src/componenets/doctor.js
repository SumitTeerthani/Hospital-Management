//Doctors.js
import React,
{
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import './Doctors.css'

const Doctors = () =&gt; {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] =
        useState(
            {
                name: '',
                specialty: ''
            });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(
        () =&gt; {
            axios
                .get('http://localhost:5000/doctors')
                .then(
                    response =&gt;
                        setDoctors(response.data))
                .catch(
                    error =&gt;
                        console.error('Error fetching doctors:', error)
                );
        }, []);

    const handleAddDoctor =
        (e) =&gt; {
            e.preventDefault();
            axios
                .post(
'http://localhost:5000/doctors/add', newDoctor)
                .then(
                    response =&gt; {
                        console.log(&quot;doc&quot;, response.data);
                        setDoctors(
                            [
                                ...doctors,
                                response.data
                            ]
                        );
                        setNewDoctor(
                            {
                                name: '',
                                specialty: ''
                            });
                    })
                .catch(
                    error =&gt;
                        console.error('Error adding doctor:', error));
        };

    const handleUpdateDoctor =
        (id, e) =&gt; {
            e.preventDefault();
            axios
                .post(
`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
                .then(response =&gt; {
                    const updateDoc = {
                        ...selectedDoctor,
                        _id: id
                    };

                    console.log('update doc', updateDoc);

                    setDoctors(
                        doctors.map(
                            doctor =&gt;
                                (doctor._id === id ? updateDoc : doctor)));

                    setSelectedDoctor(null);
                    setIsEditMode(false); // Switch back to Add mode
                })
                .catch(
                    error =&gt;
                        console.error('Error updating doctor:', error));
        };

    const handleDeleteDoctor = (id) =&gt; {
        axios.delete(
`http://localhost:5000/doctors/delete/${id}`)
            .then(response =&gt; {
                console.log(response.data);
                setDoctors(
                    doctors
                        .filter(doctor =&gt; doctor._id !== id)
                );
            })
            .catch(
                error =&gt;
                    console.error('Error deleting doctor:', error));
    };

    const handleEditDoctor =
        (doctor) =&gt; {
            setSelectedDoctor(doctor);
            setIsEditMode(true); // Switch to Edit mode
        };

    return (
        &lt;div className='main-doc-container  '&gt;
            &lt;div className='form-sections  '&gt;
                &lt;h4&gt;
                    {
                        isEditMode ?
                            'Edit Doctor' :
                            'Add New Doctor'
                    }
                &lt;/h4&gt;
                &lt;form
                    onSubmit={
                        isEditMode ?
                            (e) =&gt;
                                handleUpdateDoctor(selectedDoctor._id, e) :
                            handleAddDoctor}&gt;
                    &lt;label&gt;Name: &lt;/label&gt;
                    &lt;input
                        type=&quot;text&quot;
                        value={
                            isEditMode ?
                                selectedDoctor.name :
                                newDoctor.name
                        }
                        onChange={
                            (e) =&gt;
                                isEditMode ?
                                    setSelectedDoctor(
                                        {
                                            ...selectedDoctor,
                                            name: e.target.value
                                        }) :
                                    setNewDoctor(
                                        {
                                            ...newDoctor,
                                            name: e.target.value
                                        })} /&gt;
                    &lt;br /&gt;
                    &lt;label&gt;Specialty: &lt;/label&gt;
                    &lt;input type=&quot;text&quot;
                        value=
                        {
                            isEditMode ?
                                selectedDoctor.specialty :
                                newDoctor.specialty
                        }
                        onChange={
                            (e) =&gt;
                                isEditMode ?
                                    setSelectedDoctor(
                                        {
                                            ...selectedDoctor,
                                            specialty: e.target.value
                                        }
                                    ) :
                                    setNewDoctor(
                                        {
                                            ...newDoctor,
                                            specialty: e.target.value
                                        }
                                    )} /&gt;
                    &lt;br /&gt;
                    &lt;button type=&quot;submit&quot;&gt;
                        {
                            isEditMode ?
                                'Update Doctor' :
                                'Add Doctor'
                        }&lt;/button&gt;
                &lt;/form&gt;
            &lt;/div&gt;
            &lt;div className='doctors-section  '&gt;
                &lt;h3&gt;Doctors({doctors.length}) &lt;/h3&gt;
                &lt;div className=&quot;doctor-list&quot;&gt;
                    {doctors.map(doctor =&gt; (
                        &lt;DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                            onEdit={handleEditDoctor}
                            onDelete={handleDeleteDoctor}
                        /&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;

        &lt;/div&gt;
    );
};

export default Doctors;
