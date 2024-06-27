/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from './components/pages/AdminDashboard/AdminHome';
import RegionRegisterPage from './components/pages/Register/RegionRegisterPage';
import LoginPage from './components/pages/Login/LoginPage';
import AdminProtection from './routes/AdminProtection';
import RegionProtection from './routes/RegionProtection';
import EmployerProtection from './routes/EmployerProtection';
import RegionHome from './components/pages/RegionDashboard/RegionHome';
import EmployerHome from './components/pages/EmployerDashboard/EmployerHome';
import AdminDashboardTemplate from './components/templates/AdminDashboardTemplate';
import Regions from './components/pages/AdminDashboard/Regions';
import RegionWebInfo from './components/pages/AdminDashboard/RegionWebInfo';
import Employees from './components/pages/AdminDashboard/Employees';
import { Landingpage } from './components/pages/Landing/LandingPage';
import ForgotPasswordPage from './components/pages/ForgotPassword/ForgotPasswordPage';
import AdminProfile from './components/organisms/Profile/AdminProfile';
import RegionDashboardTemplate from './components/templates/RegionDashboardTemplate';
import RegionProfile from './components/organisms/Profile/RegionProfile';
import RegionEmployees from './components/pages/RegionDashboard/Employees';
import RegionCandidates from './components/pages/RegionDashboard/Candidates';
import RegionJobs from './components/pages/RegionDashboard/Jobs';
import RegionJobApplications from './components/pages/RegionDashboard/JobApplications';
import EmployerDashboardTemplate from './components/templates/EmployerDashboardTemplate';
import EmployerProfile from './components/organisms/Profile/EmployerProfile';
import EmployerCandidates from './components/pages/EmployerDashboard/Candidates';
import EmployerJobs from './components/pages/EmployerDashboard/Jobs';
import EmployerJobApplications from './components/pages/EmployerDashboard/JobApplications';
import EmployerRegisterPage from './components/pages/Register/EmployerRegisterPage';
import ResetPasswordPage from './components/pages/ForgotPassword/ResetPasswordPage';
import CandidateRegisterPage from './components/pages/Register/CandidateRegisterPage';
import CandidateProtection from './routes/CandidateProtection';
import CandidateDashboardTemplate from './components/templates/CandidateDashboardTemplate';
import CandidateHome from './components/pages/CandidateDashboard/CandidateHome';
import Candidates from './components/pages/AdminDashboard/Candidates';
import Jobs from './components/pages/AdminDashboard/Jobs';
import JobApplications from './components/pages/AdminDashboard/JobApplications';
import CandidateJobs from './components/pages/CandidateDashboard/CandidateJobs';
import CandidateAppliedJobs from './components/pages/CandidateDashboard/CandidateAppliedJobs';
import CandidateProfile from './components/organisms/Profile/CandidateProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='forgotPassword' element={<ForgotPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route path='regional/register' element={<RegionRegisterPage />} />
        <Route path='employer/register' element={<EmployerRegisterPage />} />
        <Route path='candidate/register' element={<CandidateRegisterPage />} />

        {/* Admin Protection */}
        <Route element={<AdminProtection/>}>
          <Route path='admin/dashboard' element={<AdminDashboardTemplate><AdminHome/></AdminDashboardTemplate>}/>
          <Route path='admin/profile' element={<AdminDashboardTemplate><AdminProfile/></AdminDashboardTemplate>}/>
          <Route path='admin/regions' element={<AdminDashboardTemplate><Regions/></AdminDashboardTemplate>}/>
          <Route path='admin/regionWebInfo' element={<AdminDashboardTemplate><RegionWebInfo/></AdminDashboardTemplate>} />
          <Route path='admin/employees' element={<AdminDashboardTemplate><Employees/></AdminDashboardTemplate>} />
          <Route path='admin/candidates' element={<AdminDashboardTemplate><Candidates/></AdminDashboardTemplate>}/>
          <Route path='admin/jobs' element={<AdminDashboardTemplate><Jobs/></AdminDashboardTemplate>}/>
          <Route path='admin/jobApplications' element={<AdminDashboardTemplate><JobApplications/></AdminDashboardTemplate>}/>
        </Route>

         {/* Region Protection */}
         <Route element={<RegionProtection/>}>
          <Route path='region/dashboard' element={<RegionDashboardTemplate><RegionHome/></RegionDashboardTemplate>}/>
          <Route path='region/profile' element={<RegionDashboardTemplate><RegionProfile/></RegionDashboardTemplate>}/>
          <Route path='region/employees' element={<RegionDashboardTemplate><RegionEmployees/></RegionDashboardTemplate>}/>
          <Route path='region/candidates' element={<RegionDashboardTemplate><RegionCandidates/></RegionDashboardTemplate>}/>
          <Route path='region/jobs' element={<RegionDashboardTemplate><RegionJobs/></RegionDashboardTemplate>}/>
          <Route path='region/jobApplications' element={<RegionDashboardTemplate><RegionJobApplications/></RegionDashboardTemplate>}/>

        </Route>

         {/* Employer Protection */}
         <Route element={<EmployerProtection/>}>
          <Route path='employer/dashboard' element={<EmployerDashboardTemplate><EmployerHome/></EmployerDashboardTemplate>}/>
          <Route path='employer/profile' element={<EmployerDashboardTemplate><EmployerProfile/></EmployerDashboardTemplate>}/>
          <Route path='employer/candidates' element={<EmployerDashboardTemplate><EmployerCandidates/></EmployerDashboardTemplate>}/>
          <Route path='employer/jobs' element={<EmployerDashboardTemplate><EmployerJobs/></EmployerDashboardTemplate>}/>
          <Route path='employer/jobApplications' element={<EmployerDashboardTemplate><EmployerJobApplications/></EmployerDashboardTemplate>}/>

        </Route>
      
        {/* Candidate Protection */}
        <Route element={<CandidateProtection/>}>
          <Route path='candidate/dashboard' element={<CandidateDashboardTemplate><CandidateHome/></CandidateDashboardTemplate>}/>
          <Route path='candidate/profile' element={<CandidateDashboardTemplate><CandidateProfile/></CandidateDashboardTemplate>}/>
          <Route path='candidate/jobs' element={<CandidateDashboardTemplate><CandidateJobs/></CandidateDashboardTemplate>}/>
          <Route path='candidate/appliedJobs' element={<CandidateDashboardTemplate><CandidateAppliedJobs/></CandidateDashboardTemplate>}/>

        </Route>

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
