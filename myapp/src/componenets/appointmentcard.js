// src/components/AppointmentCard.js

import React from 'react';

const AppointmentCard =
    (
        {
            appointment,
            onEdit,
            onDelete
        }
    ) =&gt; {
        return (
            &lt;div
                className=&quot;appointment-card&quot;&gt;
                &lt;p&gt;
                    &lt;span&gt;
                        Patient:
                    &lt;/span&gt;
                    {appointment.patientName}
                &lt;/p&gt;
                &lt;p&gt;
                    &lt;span&gt;
                        Doctor:
                    &lt;/span&gt;
                    {appointment.doctorName}&lt;/p&gt;
                &lt;p&gt;
                    &lt;span&gt;
                        Date:
                    &lt;/span&gt;
                    {
                        new Date(appointment.date)
                            .toLocaleDateString()
                    }
                &lt;/p&gt;
                &lt;div className='btn-container'&gt;
                    &lt;button onClick={
                        () =&gt;
                            onEdit(appointment)
                    }&gt;
                        Edit
                    &lt;/button&gt;
                    &lt;button onClick={
                        () =&gt;
                            onDelete(appointment._id)
                    }&gt;
                        Delete
                    &lt;/button&gt;
                &lt;/div&gt;

            &lt;/div&gt;
        );
    };

export default AppointmentCard;
