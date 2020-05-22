import React from 'react';


const Dashboard = React.lazy(() => import('../pages/User/Dashboard'))
const Settings = React.lazy(() => import('../pages/User/Settings'))
const NewElection = React.lazy(() => import('../pages/User/NewElection'))
const Orgnization = React.lazy(() => import('../pages/User/Orgnization'))
const Result = React.lazy(() => import('../pages/User/Result'))
const Ready = React.lazy(() => import('../pages/User/Ready'))


const routesLoggedIn = [
    { path: '/user/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/user/settings', exact: true, name: 'Settings', component: Settings },
    { path: '/user/orgnization', exact: true, name: 'Orgnization', component: Orgnization },
    { path: '/user/new-election', exact: true, name: 'NewElection', component: NewElection },
    { path: '/user/result', exact: true, name: 'Test', component: Result },
    { path: '/user/new-election/ready', exact: true, name: 'Ready', component: Ready },

]
export default routesLoggedIn;
