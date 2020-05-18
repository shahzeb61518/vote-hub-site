import React from 'react';


const Dashboard = React.lazy(() => import('../pages/User/Dashboard'))
const Settings = React.lazy(() => import('../pages/User/Settings'))
const NewElection = React.lazy(() => import('../pages/User/NewElection'))
const Orgnization = React.lazy(() => import('../pages/User/Orgnization'))
const ReviewTest = React.lazy(() => import('../pages/User/ReviewTest'))


const routesLoggedIn = [
    { path: '/user/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/user/settings', exact: true, name: 'Settings', component: Settings },
    { path: '/user/orgnization', exact: true, name: 'Orgnization', component: Orgnization },
    { path: '/user/new-election', exact: true, name: 'NewElection', component: NewElection },
    { path: '/user/new-election/test', exact: true, name: 'Test', component: ReviewTest }
    
]
export default routesLoggedIn;
