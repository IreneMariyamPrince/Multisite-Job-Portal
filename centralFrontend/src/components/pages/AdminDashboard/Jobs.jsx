/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Modal from '../../molecules/Modal';
import Pagination from '../../molecules/Pagination';
import { JobStatus } from '../../constants/Constants';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBModalBody, MDBModalHeader } from 'mdbreact';
import jobApi from '../../services/JobApi';
import { JobType } from '../../constants/JobType';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import { JobShift } from '../../constants/JobShift';
import JobInfoCards from '../../organisms/AdminDashboard/JobInfoCards';

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);
  const [totalJobs, setTotalJobs] = useState();
  const [totalJobsApprove, setTotalJobsApprove] = useState();
  const [totalJobsPending, setTotalJobsPending] = useState();
  const [totalJobsDecline, setTotalJobsDecline] = useState();
  const URL = window.location.href;

  const initialValues = {
    jobTitle: '',
    webInfoWebUrl: URL,
    jobDomain: '',
    jobType: '',
    jobVacancyExperience: '',
    jobDescription: '',
    jobLocation: '',
    jobShift: '',
    jobSalaryScale: '',
    jobSkillsReq: '',
    expiryDate: '',
  };

  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job Title is required'),
    jobDomain: Yup.string().required('Job Domain is required'),
    jobType: Yup.string().required('Job Type is required'),
    jobVacancyExperience: Yup.string().required('Job Vacancy Experience is required'),
    jobDescription: Yup.string().required('Job Description is required'),
    jobLocation: Yup.string().required('Job Location is required'),
    jobShift: Yup.string().required('Job Shift is required'),
    jobSalaryScale: Yup.string().required('Job Salary Scale is required'),
    jobSkillsReq: Yup.string().required('Job Skills Requirement is required'),
    expiryDate: Yup.string().required('End Date is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await jobApi.register(values);
      if (response) {
        toast.success('Job added successfully', { autoClose: 2000 });
        resetForm();
        setModalOpen(false); // Close the modal on successful registration
        fetchData(); // Fetch the updated data list
      } else {
        toast.error(response.error, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while adding job', { autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await jobApi.getAllJobs(page + 1, rowsPerPage);
      if (response) {
        setJobList(response.data);
        setCount(response.counts.count);
        setTotalJobs(response.counts.totalJobs);
        setTotalJobsApprove(response.counts.totalJobsApprove);
        setTotalJobsPending(response.counts.totalJobsPending);
        setTotalJobsDecline(response.counts.totalJobsDecline);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async event => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    await fetchData();
  };

  const toggleModal = data => {
    setSelectedData(data); // Set selected data when opening modal
    setModalOpen(!modalOpen);
  };
  const handleDeleteConfirmation = async id => {
    try {
      // Call the delete action on confirmation
      await jobApi.jobDelete(id);
      // If deletion is successful, fetch the updated data
      fetchData();
      toast.success('Job deleted successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error deleting job:', error.message);
    }
  };

  return (
    <>
      <JobInfoCards
        totalJobs={totalJobs}
        totalJobsApprove={totalJobsApprove}
        totalJobsPending={totalJobsPending}
        totalJobsDecline={totalJobsDecline}
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card my-4 mb-0'>
            <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
              <div className='d-flex justify-content-between bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 px-3'>
                <h6 className='text-white text-capitalize'>Job List</h6>
                <div>
                  <button className='btn btn-white me-3' onClick={toggleModal}>
                    Add
                  </button>
                  <button className='btn btn-white'>Export</button>
                </div>
              </div>
            </div>

            <div className='card-body px-0 pb-2'>
              <div className='table-responsive p-0'>
                <table className='table align-items-center mb-0'>
                  <thead>
                    <tr>
                      <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Company
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Job
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Skills
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Experience
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Status
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobList?.map((data, index) => {
                      const {
                        jobTitle,
                        jobDomain,
                        jobType,
                        jobVacancyExperience,
                        jobShift,
                        jobSkillsReq,
                        jobApprovalStatus,
                      } = data;
                      const { logo, name, sector } = data.employerInfo;
                      const Status = JobStatus(parseInt(jobApprovalStatus));
                      return (
                        <tr key={index}>
                          <td>
                            <div className='d-flex px-2 py-1'>
                              <div>
                                <img
                                  src={logo}
                                  className='avatar avatar-sm me-3 border-radius-lg'
                                  alt='user1'
                                />
                              </div>
                              <div className='d-flex flex-column justify-content-center'>
                                <h6 className='mb-0 text-sm'>{name}</h6>
                                <p className='text-xs text-secondary mb-0'> {sector}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h6 className='text-xs font-weight-bold'>{jobTitle}</h6>
                            <p className='text-xs text-secondary mb-0'> {jobDomain}</p>
                            <p className='text-xs text-secondary mb-0'>
                              {jobType === 'parttime'
                                ? 'Part-Time'
                                : jobType === 'fulltime'
                                  ? 'Full-Time'
                                  : jobType}
                            </p>
                          </td>
                          <td className='align-middle text-center'>
                            <p className='text-xs font-weight-bold'>{jobSkillsReq}</p>
                          </td>
                          <td className='align-middle text-center'>
                            <p className='text-xs font-weight-bold'>{jobVacancyExperience} years</p>
                            <p className='text-xs text-secondary mb-0'>{jobShift} Shift</p>
                          </td>
                          <td className='align-middle text-center text-sm'>
                            <span
                              className={`badge badge-sm ${Status === 'Active' ? 'bg-gradient-success' : Status === 'Pending' ? 'bg-gradient-secondary' : 'bg-gradient-warning'}`}
                            >
                              {Status}
                            </span>
                          </td>
                          <td className='align-middle text-center'>
                            {/* Action */}
                            <div className='d-flex align-items-center justify-content-center'>
                              <ConfirmationDialog
                                title='Are you sure you want to delete this job permenantly?'
                                icon='warning'
                                showCancelButton={true}
                                confirmButtonColor='#3085d6'
                                cancelButtonColor='#d33'
                                confirmButtonText='Yes, delete it!'
                                cancelButtonText='Cancel'
                                confirmAction={() =>
                                  handleDeleteConfirmation({
                                    jobVacancyInfoId: data.jobVacancyInfoId,
                                  })
                                }
                                feature={{
                                  type: 'icon',
                                  className: 'material-icons opacity-10',
                                  content: 'delete',
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className='d-flex justify-content-end align-items-center paginate'>
            <Pagination
              component='div'
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)}>
        <MDBModalHeader toggle={() => setModalOpen(!modalOpen)}>Add Job</MDBModalHeader>
        <MDBModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className='row'>
                  <div className='col'>
                    <div className='mb-3'>
                      <label htmlFor='jobTitle'>Job Title:</label>
                      <Field
                        type='text'
                        name='jobTitle'
                        placeholder='Job Title'
                        className={`form-control border px-2 ${touched.jobTitle && errors.jobTitle ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name='jobTitle' component='div' className='invalid-feedback' />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='jobDomain'>Job Domain:</label>
                      <Field
                        type='text'
                        name='jobDomain'
                        placeholder='Job Domain'
                        className={`form-control border px-2 ${touched.jobDomain && errors.jobDomain ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name='jobDomain' component='div' className='invalid-feedback' />
                    </div>

                    <div className='mb-3'>
                      <label>Job Type:</label>
                      <br />
                      <div role='group' aria-labelledby='JobType'>
                        {JobType.map(option => (
                          <label
                            className='radio-inline me-2'
                            key={option.value}
                            htmlFor={option.value}
                          >
                            <Field
                              type='radio'
                              id={option.value}
                              name='jobType'
                              className='me-1'
                              value={option.value}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>

                      <ErrorMessage
                        name='jobType'
                        component='div'
                        className={`${errors.jobType ? 'invalid-feedback d-block' : 'invalid-feedback'}`}
                      />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='jobVacancyExperience'>Experience needed (Number of years):</label>
                      <Field
                        type='number'
                        name='jobVacancyExperience'
                        placeholder='Experience'
                        className={`form-control border px-2 ${touched.jobVacancyExperience && errors.jobVacancyExperience ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name='jobVacancyExperience'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='jobDescription'>Job Description:</label>
                      <Field
                        type='text'
                        name='jobDescription'
                        placeholder='Job Description'
                        className={`form-control border px-2 ${touched.jobDescription && errors.jobDescription ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name='jobDescription'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='mb-3'>
                      <label htmlFor='jobLocation'>Job Location:</label>
                      <Field
                        type='text'
                        name='jobLocation'
                        placeholder='Job Location'
                        className={`form-control border px-2 ${touched.jobLocation && errors.jobLocation ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name='jobLocation'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='jobShift'>Job Shift:</label>
                      <Field
                        as='select'
                        name='jobShift'
                        className={`form-control border px-2 ${touched.jobShift && errors.jobShift ? 'is-invalid' : ''}`}
                      >
                        <option value='' disabled hidden>
                          Select Job Shift
                        </option>
                        {JobShift.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name='jobShift' component='div' className='invalid-feedback' />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='jobSalaryScale'>Job Salary Scale:</label>
                      <Field
                        type='text'
                        name='jobSalaryScale'
                        placeholder='Job Salary Scale'
                        className={`form-control border px-2 ${touched.jobSalaryScale && errors.jobSalaryScale ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name='jobSalaryScale'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='jobSkillsReq'>Skills Required:</label>
                      <Field
                        type='text'
                        name='jobSkillsReq'
                        placeholder='Job Skills Required'
                        className={`form-control border px-2 ${touched.jobSkillsReq && errors.jobSkillsReq ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name='jobSkillsReq'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='expiryDate'>Expiry Date:</label>
                      <Field
                        type='date'
                        name='expiryDate'
                        placeholder='Expiry Date'
                        className={`form-control border px-2 ${touched.expiryDate && errors.expiryDate ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name='expiryDate'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-lg w-100'
                  disabled={isSubmitting}
                >
                  Add Job
                </button>
              </Form>
            )}
          </Formik>
        </MDBModalBody>
      </Modal>
    </>
  );
};

export default Jobs;
