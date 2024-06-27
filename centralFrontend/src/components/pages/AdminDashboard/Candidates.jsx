/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Modal from '../../molecules/Modal';
import Pagination from '../../molecules/Pagination';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserStatus } from '../../constants/Constants';
import DateFormatter from '../../atoms/DateFormatter';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import candidateApi from '../../services/CandidateApi';
import Icon from '../../atoms/Icon';
import SearchBox from '../../molecules/SearchBox';
import { FilterBoxA, FilterBoxB } from '../../molecules/GroupFilterBox';
import exportApi from '../../services/ExportApi';
import CandidateInfoCards from '../../organisms/AdminDashboard/CandidateInfoCards';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';

const Candidates = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [qualification, setQualification] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [qualificationId, setQualificationId] = useState('');
  const [specialization, setSpecialization] = useState();
  const [specializationId, setspecializationId] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await candidateApi.getAllCandidates(
        page + 1,
        rowsPerPage,
        qualificationId,
        specializationId,
        searchQuery
      );
      if (response) {
        setCandidateData(response);
        setCount(response.count);
      } else {
        console.log('error');
      }
      const qualificationResponse = await candidateApi.getQualifications();
      if (qualificationResponse) {
        setQualification(
          qualificationResponse.data?.map(eq => ({
            status: eq.qualification,
            value: eq.eduQualificationId,
          }))
        );
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false when data fetching is complete
    }
  };

  const fetchSpecialization = async () => {
    const specializationResponse = await candidateApi.getSpecializations(qualificationId);
    if (specializationResponse) {
      setSpecialization(
        specializationResponse.data?.map(eq => ({
          status: eq.specialization,
          value: eq.eduSpecializationId,
        }))
      );
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, qualificationId, specializationId, searchQuery]);

  useEffect(() => {
    if (qualificationId) {
      fetchSpecialization();
    }
  }, [qualificationId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterQualification = value => {
    setQualificationId(value);
    setspecializationId('');
    setSpecialization([]);
  };

  const handleFilterSpecialization = value => {
    setspecializationId(value);
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleChangeRowsPerPage = async event => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    await fetchData();
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteConfirmation = async id => {
    try {
      // Call the delete action on confirmation
      await candidateApi.candidateDelete(id);
      // If deletion is successful, fetch the updated data
      await fetchData();
      toast.success('Region deleted successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error deleting region:', error.message);
    }
  };
  
  const exportExcel = async () => {
    try {
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.split('/').slice(3).join('/');
      const fileName = 'Candidates';
     
       const response = await exportApi.exportData({baseUrl,fileName,qualificationId, specializationId})
      if (response) {
        toast.success('Excel file downloaded successfully', { autoClose: 2000 });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error');
    }
  };
  return (
    <>
      <CandidateInfoCards totalCount={count}/>
      <div className='row'>
        <div className='col-12'>
          <div className='card my-4 mb-0'>
            <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
              <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex align-items-center justify-content-between'>
                <h6 className='text-white text-capitalize ps-3'>Candidate List</h6>
                {/* <button onClick={toggleModal}>Add</button> */}
                <button type='button' className='btn btn-white' onClick={exportExcel}>
                  Export
                </button>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-between px-5'>
              <FilterBoxA
                filterArray={qualification}
                label='Qualification'
                filterValue={handleFilterQualification}
              />
              <FilterBoxB
                filterArray={specialization || []}
                label='Specialization'
                filterValue={handleFilterSpecialization}
              />
              <SearchBox onSearch={handleSearch} />
            </div>
            {loading ? ( // Conditional rendering based on loading state
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '100px' }}
              >
                {/* Center the loader vertically and horizontally */}
                <ThreeDotsLoader />
              </div>
            ) : (
            <div className='card-body px-0 pb-2'>
              <div className='table-responsive p-0'>
                <table className='table align-items-center mb-0'>
                  <thead>
                    <tr>
                      <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Candidate
                      </th>
                      <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                        Gender & DOB
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Resume
                      </th>
                      <th
                        className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'
                        style={{ width: '200px' }}
                      >
                        Qualification
                      </th>
                      <th
                        className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'
                      >
                        Status
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Actived On
                      </th>
                      <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateData?.data?.map((data, index) => {
                      const { firstName, lastName, email, userStatus, mobile, createdAt } = data;
                      const { gender, dob, pic, resume } = data.candidateInfo;
                      const { qualification } = data.candidateInfo.qualificationInfo;
                      const { specialization } = data.candidateInfo.specializationInfo;
                      const Status = UserStatus(parseInt(userStatus));
                      return (
                        <tr key={index}>
                          <td>
                            <div className='d-flex px-2 py-1'>
                              <div>
                                <img
                                  src={pic}
                                  className='avatar avatar-sm me-3 border-radius-lg'
                                  alt='user1'
                                />
                              </div>
                              <div className='d-flex flex-column justify-content-center'>
                                <h6 className='mb-0 text-sm'>
                                  {firstName} {lastName}
                                </h6>
                                <p className='text-xs text-secondary mb-0'>{email}</p>
                                <p className='text-xs text-secondary mb-0'>{mobile}</p>
                                {/* <p className='text-xs text-secondary mb-0'> {webInfoWebUrl === null ? 'Not defined yet' : webInfoWebUrl}</p> */}
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-xs font-weight-bold mb-0'>{gender}</p>
                            <span className='text-secondary text-xs'>
                              {dob === null ? 'Not yet updated' : <DateFormatter timestamp={dob} />}
                            </span>
                          </td>
                          <td className='align-middle text-center'>
                            {resume ? (
                              <a href={resume} target='_blank' rel='noreferrer'>
                                <Icon
                                  className='material-icons opacity-10'
                                  tooltip='Download Resume'
                                >
                                  download
                                </Icon>
                              </a>
                            ) : (
                              <Icon
                                className='material-icons opacity-10'
                                tooltip='Resume not uploaded yet'
                              >
                                download
                              </Icon>
                            )}
                          </td>
                          <td>
                            <p className='text-xs text-secondary font-weight-bold mb-0 text-wrap'>
                              {qualification}
                            </p>
                            <p className='text-xs text-secondary mb-0 text-wrap'>
                              {specialization}
                            </p>
                          </td>
                          <td className='align-middle text-center text-sm'>
                            <span
                              className={`badge badge-sm ${Status === 'Active' ? 'bg-gradient-success' : Status === 'Pending' ? 'bg-gradient-secondary' : 'bg-gradient-warning'}`}
                            >
                              {Status}
                            </span>
                          </td>
                          <td className='align-middle text-center'>
                            <span className='text-secondary text-xs font-weight-bold'><DateFormatter timestamp={createdAt} /></span>
                          </td>
                          <td className='align-middle text-center'>
                            {/* Action */}
                            <div className='d-flex align-items-center justify-content-center'>
                              <ConfirmationDialog
                                title='Are you sure you want to delete this region permenantly?'
                                icon='warning'
                                showCancelButton={true}
                                confirmButtonColor='#3085d6'
                                cancelButtonColor='#d33'
                                confirmButtonText='Yes, delete it!'
                                cancelButtonText='Cancel'
                                confirmAction={() =>
                                  handleDeleteConfirmation({ userId: data.userId })
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
                    {candidateData && candidateData.data && candidateData.data.length === 0 && (
                      <tr>
                        <td colSpan='7' className='text-center text-sm'>
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}
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
      <Modal isOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Candidates;
