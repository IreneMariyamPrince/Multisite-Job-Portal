/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import jobApi from '../../services/JobApi';
import DateFormatter from '../../atoms/DateFormatter';
import Pagination from '../../molecules/Pagination'; // Import Pagination component

const JobListingSection = () => {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await jobApi.getAllJobs(page + 1, rowsPerPage);
      if (response) {
        setJobList(response.data);
        setCount(response.counts.count); // Assuming the API response includes a counts object with the total count
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
    setPage(0); // Reset to the first page whenever rows per page change
    await fetchData();
  };

  return (
    <div className='container-xxl py-5' id='joblisting'>
      <div className='container'>
        <h1 className='text-center mb-5 wow fadeInUp' data-wow-delay='0.1s'>
          Job Listing
        </h1>
        <div className='tab-class wow fadeInUp' data-wow-delay='0.3s'>
          <div className='tab-content'>
            <div id='tab-1' className='tab-pane fade show p-0 active'>
              <div className='row'>
                {jobList.map((job, index) => {
                  const {
                    jobTitle,
                    jobLocation,
                    jobDescription,
                    jobType,
                    jobVacancyExperience,
                    jobSkillsReq,
                    jobSalaryScale,
                    expiryDate,
                  } = job;
                  const { logo } = job.employerInfo;
                  return (
                    <div className='col-lg-6 col-md-6 mb-4' key={index}>
                      <div className='card h-100 d-flex flex-column'>
                        <div className='card-body d-flex flex-column'>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <h5 className='card-title'>{jobTitle}</h5>
                              <p className='card-text'>
                                <span className='d-block'>
                                  <i className='fa fa-map-marker-alt text-primary me-2'></i>
                                  {jobLocation}
                                </span>
                                <span className='d-block'>
                                  <i className='far fa-clock text-primary me-2'></i>
                                  {jobType === 'parttime'
                                    ? 'Part-Time'
                                    : jobType === 'fulltime'
                                      ? 'Full-Time'
                                      : jobType}
                                </span>
                                <span className='d-block'>
                                  Experience required: {jobVacancyExperience}
                                </span>
                                <span className='d-block'>Description: {jobDescription}</span>
                                <span className='d-block'>Skills required: {jobSkillsReq}</span>
                                <span className='d-block'>
                                  <i className='far fa-money-bill-alt text-primary me-2'></i>
                                  {jobSalaryScale}
                                </span>
                              </p>
                            </div>
                            <img
                              className='img-fluid border rounded'
                              src={logo}
                              alt='Company Logo'
                              style={{ width: '75px', height: '75px', objectFit: 'cover' }}
                            />
                          </div>
                        </div>
                        <div className='card-footer d-flex justify-content-between align-items-center'>
                          <small className='text-muted'>
                            <i className='far fa-calendar-alt text-primary me-2'></i>
                            Application Ends: <DateFormatter timestamp={expiryDate} />
                          </small>
                          <div>
                            {/* <a className='btn btn-light btn-square me-2' href=''>
                              <i className='far fa-heart text-primary'></i>
                            </a> */}
                            <a className='btn btn-primary' href=''>
                              Apply Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Pagination */}
              <div className='d-flex justify-content-end align-items-center paginate mt-4'>
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
        </div>
      </div>
    </div>
  );
};

export default JobListingSection;
