import React from 'react';


const Login = React.lazy(() => import('../pages/User/Login'))
const Signup = React.lazy(() => import('../pages/User/Signup'))
const VerifyMail = React.lazy(() => import('../pages/User/VerifyMail'))

const Home = React.lazy(() => import('../pages/Home'))
const ElectionVoting = React.lazy(() => import('../pages/HowItWorks/ElectionVoting'))
const MeetingVoting = React.lazy(() => import('../pages/HowItWorks/MeetingVoting'))
const Announcments = React.lazy(() => import('../pages/HowItWorks/Announcments'))
const Features = React.lazy(() => import('../pages/Features'))
const Services = React.lazy(() => import('../pages/Services'))
const WhoItsFor = React.lazy(() => import('../pages/WhoItsFor'))
const Vote = React.lazy(() => import('../pages/Vote'))
const ForgotPassword = React.lazy(() => import('../pages/User/ForgotPassword'))
const Voting = React.lazy(() => import('../pages/User/Voting'))


const routes = [
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/signup', exact: true, name: 'Signup', component: Signup },
    { path: '/verify-mail', exact: true, name: 'Verify Mail', component: VerifyMail },
    { path: '/home', exact: true, name: 'Home', component: Home },
    { path: '/election-voting', exact: true, name: 'Election Voting', component: ElectionVoting },
    { path: '/meeting-voting', exact: true, name: 'Meeting Voting', component: MeetingVoting },
    { path: '/announcments', exact: true, name: 'Announcments', component: Announcments },
    { path: '/features', exact: true, name: 'Features', component: Features },
    { path: '/services', exact: true, name: 'Services', component: Services },
    { path: '/who-its-for', exact: true, name: 'Who Its For', component: WhoItsFor },
    { path: '/vote', exact: true, name: 'Vote', component: Vote },
    { path: '/forgot-password', exact: true, name: 'Vote', component: ForgotPassword },
    { path: '/user/new-election/voting', exact: true, name: 'Voting', component: Voting },

];

export default routes;
