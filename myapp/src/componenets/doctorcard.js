// src/components/DoctorCard.js

import React from 'react';

const DoctorCard =
    (
        {
            doctor, onEdit,
            onDelete
        }
    ) =&gt; {
        return (
            &lt;div className=&quot;doctor-card&quot;&gt;
                &lt;p&gt;
                    {doctor.name} -
                    {doctor.specialty}
                &lt;/p&gt;
                &lt;div className='btn-container'&gt;
                    &lt;button onClick={
                        () =&gt;
                            onEdit(doctor)
                    }&gt;
                        Edit
                    &lt;/button&gt;
                    &lt;button onClick={
                        () =&gt;
                            onDelete(doctor._id)
                    }&gt;
                        Delete
                    &lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        );
    };

export default DoctorCard;
