//Appointments.js
import React,
{
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import AppointmentCard
    from './AppointmentCard';
import './Appointment.css'

const Appointments = () =&gt; {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] =
        useState(
            {
                patientName: '',
                doctorName: '', date: ''
            });
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() =&gt; {
        axios
            .get(
'http://localhost:5000/appointments')
            .then(
                response =&gt;
                    setAppointments(response.data))
            .catch(
                error =&gt;
                    console.error('Error fetching appointments:', error)
            );
    }, []);

    const handleAddAppointment =
        (e) =&gt; {
            e.preventDefault();

            axios
                .post(
'http://localhost:5000/appointments/add', newAppointment)
                .then(response =&gt; {
                    console.log(response.data);
                    setAppointments(
                        [
                            ...appointments,
                            response.data]);
                    setNewAppointment(
                        {
                            patientName: '',
                            doctorName: '', date: ''
                        });
                })
                .catch(error =&gt;
                    console.error('Error adding appointment:', error));
        };

    const handleUpdateAppointment =
        (id, e) =&gt; {
            e.preventDefault();
            axios
                .post(
`http://localhost:5000/appointments/update/${id}`, selectedAppointment)
                .then(response =&gt; {
                    console.log(response.data);
                    const updateApp = {
                        ...selectedAppointment,
                        _id: id
                    };
                    setAppointments(
                        appointments.map(
                            appointment =&gt;
                            (appointment._id === id
                                ? updateApp :
                                appointment)
                        ));
                    setSelectedAppointment(null);
                    setIsEditMode(false); // Switch back to Add mode
                })
                .catch(
                    error =&gt;
                        console.error('Error updating appointment:', error));
        };

    const handleDeleteAppointment =
        (id) =&gt; {
            axios
                .delete(
`http://localhost:5000/appointments/delete/${id}`)
                .then(response =&gt; {
                    console.log(response.data);
                    setAppointments(
                        appointments.filter(
                            appointment =&gt;
                                appointment._id !== id)
                    );
                })
                .catch(error =&gt;
                    console.error('Error deleting appointment:', error));
        };

    const handleEditAppointment =
        (appointment) =&gt; {
            setSelectedAppointment(appointment);
            setIsEditMode(true); // Switch to Edit mode
        };

    return (
        &lt;div className='flex-row' style={{ width: &quot;100%&quot; }}&gt;
            &lt;div className='flex-column'&gt;
                &lt;div className='add-form'&gt;
                    &lt;h4&gt;
                        {
                            isEditMode ?
                                'Edit Appointment' :
                                'Add New Appointment'
                        }
                    &lt;/h4&gt;
                    &lt;form className=&quot;appointment-form&quot;
                        onSubmit={
                            isEditMode ?
                                (e) =&gt;
                                    handleUpdateAppointment(selectedAppointment._id, e) :
                                handleAddAppointment
                        }&gt;
                        &lt;label&gt;Patient Name:&lt;/label&gt;
                        &lt;input type=&quot;text&quot;
                            value={
                                isEditMode ?
                                    selectedAppointment.patientName :
                                    newAppointment.patientName
                            }
                            onChange={
                                (e) =&gt;
                                    isEditMode ?
                                        setSelectedAppointment(
                                            {
                                                ...selectedAppointment,
                                                patientName: e.target.value
                                            }) :
                                        setNewAppointment(
                                            {
                                                ...newAppointment,
                                                patientName: e.target.value
                                            })} /&gt;
                        &lt;label&gt;Doctor Name:&lt;/label&gt;
                        &lt;input type=&quot;text&quot;
                            value={
                                isEditMode ?
                                    selectedAppointment.doctorName :
                                    newAppointment.doctorName
                            }
                            onChange={
                                (e) =&gt;
                                    isEditMode ?
                                        setSelectedAppointment(
                                            {
                                                ...selectedAppointment,
                                                doctorName: e.target.value
                                            }) :
                                        setNewAppointment(
                                            {
                                                ...newAppointment,
                                                doctorName: e.target.value
                                            })} /&gt;
                        &lt;label&gt;Date:&lt;/label&gt;
                        &lt;input type=&quot;date&quot;
                            value={
                                isEditMode ?
                                    selectedAppointment.date :
                                    newAppointment.date
                            }
                            onChange={
                                (e) =&gt;
                                    isEditMode ?
                                        setSelectedAppointment(
                                            {
                                                ...selectedAppointment,
                                                date: e.target.value
                                            }) :
                                        setNewAppointment(
                                            {
                                                ...newAppointment,
                                                date: e.target.value
                                            })} /&gt;
                        &lt;button type=&quot;submit&quot;&gt;
                            {
                                isEditMode ?
                                    'Update Appointment' :
                                    'Add Appointment'
                            }
                        &lt;/button&gt;
                    &lt;/form&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className='appointments'&gt;
                &lt;h3&gt;Appointments
                    (
                    {
                        appointments.length
                    })
                &lt;/h3&gt;
                &lt;div className=&quot;appointment-list&quot;&gt;
                    {appointments.map(appointment =&gt; (
                        &lt;AppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                            onEdit={handleEditAppointment}
                            onDelete={handleDeleteAppointment}
                        /&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
};

export default Appointments;
