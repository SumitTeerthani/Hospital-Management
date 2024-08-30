//App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Routes, Route,
    Link, useNavigate
} from 'react-router-dom';
import Appointments
    from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import './App.css'

const App = () =&gt; {
    const isLinkActive =
        (path) =&gt;
            window.location.pathname === path;
    return (
        &lt;Router&gt;
            &lt;div className=&quot;container&quot;&gt;
                &lt;h1 style={{ color: &quot;green&quot; }}&gt;
                    GFG- Hospital Managment App
                &lt;/h1&gt;
                &lt;nav&gt;
                    &lt;ul&gt;
                        &lt;li className={
                            isLinkActive('/appointments')
                                ? 'active' : ''}&gt;
                            &lt;Link to=&quot;/appointments&quot;&gt;
                                Appointments
                            &lt;/Link&gt;
                        &lt;/li&gt;
                        &lt;li className={
                            isLinkActive('/doctors') ?
                                'active' : ''}&gt;
                            &lt;Link to=&quot;/doctors&quot;&gt;
                                Doctors
                            &lt;/Link&gt;
                        &lt;/li&gt;
                        &lt;li className={
                            isLinkActive('/patients') ?
                                'active' : ''}&gt;
                            &lt;Link to=&quot;/patients&quot;&gt;
                                Patients
                            &lt;/Link&gt;
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/nav&gt;

                &lt;Routes&gt;
                    &lt;Route path=&quot;/appointments&quot;
                        element={&lt;Appointments /&gt;} /&gt;
                    &lt;Route path=&quot;/&quot;
                        element={&lt;Appointments /&gt;} /&gt;
                    &lt;Route path=&quot;/doctors&quot;
                        element={&lt;Doctors /&gt;} /&gt;
                    &lt;Route path=&quot;/patients&quot;
                        element={&lt;Patients /&gt;} /&gt;
                &lt;/Routes&gt;
            &lt;/div&gt;
        &lt;/Router&gt;
    );
}

export default App;
