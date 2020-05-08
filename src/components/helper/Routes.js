import React from 'react';


const Login = React.lazy(() => import('../pages/User/Login'))
const Signup = React.lazy(() => import('../pages/User/Signup'))
const Dashboard = React.lazy(() => import('../pages/User/Dashboard'))
const Help = React.lazy(() => import('../pages/User/Help'))
const Settings = React.lazy(() => import('../pages/User/Settings'))
const NewElection = React.lazy(() => import('../pages/User/NewElection'))
const Orgnization = React.lazy(() => import('../pages/User/Orgnization'))

const Home = React.lazy(() => import('../pages/Home'))
const ElectionVoting = React.lazy(() => import('../pages/HowItWorks/ElectionVoting'))
const MeetingVoting = React.lazy(() => import('../pages/HowItWorks/MeetingVoting'))
const Announcments = React.lazy(() => import('../pages/HowItWorks/Announcments'))
const Features = React.lazy(() => import('../pages/Features'))
const Services = React.lazy(() => import('../pages/Services'))
const WhoItsFor = React.lazy(() => import('../pages/WhoItsFor'))
const Vote = React.lazy(() => import('../pages/Vote'))
const ForgotPassword = React.lazy(() => import('../pages/User/ForgotPassword'))
// const Wishes = React.lazy(() => import('../pages/Wishes'))
// const Wish = React.lazy(() => import('../pages/Wish'))
const Profile = React.lazy(() => import('../pages/Profile'))

const routes = [
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/user/dashboard', exact: true, name: 'Signup', component: Dashboard },
    { path: '/user/help', exact: true, name: 'Signup', component: Help },
    { path: '/user/settings', exact: true, name: 'Signup', component: Settings },
    { path: '/user/new-election', exact: true, name: 'Signup', component: NewElection },
    { path: '/user/orgnization', exact: true, name: 'Signup', component: Orgnization },

    { path: '/home', exact: true, name: 'Home', component: Home },
    { path: '/election-voting', exact: true, name: 'Election Voting', component: ElectionVoting },
    { path: '/meeting-voting', exact: true, name: 'Meeting Voting', component: MeetingVoting },
    { path: '/announcments', exact: true, name: 'Announcments', component: Announcments },
    { path: '/features', exact: true, name: 'Features', component: Features },
    { path: '/services', exact: true, name: 'Services', component: Services },
    { path: '/who-its-for', exact: true, name: 'Who Its For', component: WhoItsFor },
    { path: '/vote', exact: true, name: 'Vote', component: Vote },
    { path: '/forgot-password', exact: true, name: 'Vote', component: ForgotPassword },
    // { path: '/wishes', exact: true, name: 'Wishes Page', component: Wishes },
    // { path: '/wish', exact: true, name: 'Wish', component: Wish },
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;
