import React from 'react';

const PatientCard =
    (
        {
            patient, onEdit,
            onDelete
        }
    ) =&gt; {
        return (
            &lt;div className=&quot;patient-card&quot;&gt;
                &lt;h4&gt;{patient.name}&lt;/h4&gt;
                &lt;p&gt;Age: {patient.age}&lt;/p&gt;
                &lt;p&gt;Gender: {patient.gender}&lt;/p&gt;
                &lt;div className='btn-container'
                    style={{ width: &quot;100%&quot; }}&gt;
                    &lt;button onClick={
                        () =&gt;
                            onEdit(patient)}&gt;
                        Edit
                    &lt;/button&gt;
                    &lt;button onClick={
                        () =&gt;
                            onDelete(patient._id)
                    }&gt;
                        Delete
                    &lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        );
    };

export default PatientCard;
