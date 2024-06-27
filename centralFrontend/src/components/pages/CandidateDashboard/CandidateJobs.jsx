/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import jobApi from '../../services/JobApi';
import Pagination from '../../molecules/Pagination';
import Modal from '../../molecules/Modal';

const CandidateJobs = () => {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility
  const [selectedJob, setSelectedJob] = useState(null); // State variable for selected job details

  const fetchData = async () => {
    try {
      const response = await jobApi.getAllJobs(page + 1, rowsPerPage);
      if (response) {
        setJobList(response.data);
        setCount(response.counts.count);
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
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

  const handleCardClick = job => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='card my-4 mb-0'>
        <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
          <div className='d-flex justify-content-between bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 px-3'>
            <h6 className='text-white text-capitalize'>Job List</h6>
          </div>
        </div>

        <div className='card-body px-0 pb-2'>
          <div className='row px-4'>
            {jobList.map((job, index) => (
              <div key={index} className='col-6 mb-4'>
                <Card className='h-100' onClick={() => handleCardClick(job)}>
                  <img
                    src={job.employerInfo.logo}
                    className='position-absolute top-0 end-0 mt-2 me-2'
                    alt='Company Logo'
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <CardBody>
                    <CardTitle tag='h5'>{job.jobTitle}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-2 text-muted'>
                      {job.jobDomain}
                    </CardSubtitle>
                    <CardText>{job.jobDescription}</CardText>
                    <Button color='primary'>Apply</Button>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

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

      {selectedJob && (
        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <div className='modal-header'>
            <h5 className='modal-title'>{selectedJob.jobTitle}</h5>
            <button type='button' className='btn-close' onClick={toggleModal}></button>
          </div>
          <div className='modal-body'>
            <div className='d-flex justify-content-between align-items-start'>
              <div>
                <p>
                  <strong>Job Domain:</strong> {selectedJob.jobDomain}
                </p>
                <p>
                  <strong>Job Description:</strong> {selectedJob.jobDescription}
                </p>
                <p>
                  <strong>Job Location:</strong> {selectedJob.jobLocation}
                </p>
                <p>
                  <strong>Salary Scale:</strong> {selectedJob.jobSalaryScale}
                </p>
                <p>
                  <strong>Skills Required:</strong> {selectedJob.jobSkillsReq}
                </p>
                <p>
                  <strong>Job Type:</strong> {selectedJob.jobType}
                </p>
                <p>
                  <strong>Shift:</strong> {selectedJob.jobShift}
                </p>
                <p>
                  <strong>Experience Needed:</strong> {selectedJob.jobVacancyExperience} years
                </p>
              </div>
              <div className='d-flex flex-column align-items-center'>
                <img
                  src={selectedJob.employerInfo.logo}
                  alt='Company Logo'
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                <span className='mt-2'>{selectedJob.employerInfo.name}</span>
                <span className='mt-2'>{selectedJob.employerInfo.sector}</span>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <Button color='primary' onClick={toggleModal}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CandidateJobs;
