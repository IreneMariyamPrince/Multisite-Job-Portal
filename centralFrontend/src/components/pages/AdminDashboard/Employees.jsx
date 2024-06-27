/* eslint-disable no-undef *//* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Modal from '../../molecules/Modal';
import Pagination from '../../molecules/Pagination';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserStatus } from '../../constants/Constants';
// import DateFormatter from '../../atoms/DateFormatter';
import { UserFilterStatus, DateFilterStatus } from '../../constants/FilterData';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import employerApi from '../../services/EmployerApi';
import FilterBox from '../../molecules/FilterBox';
import SearchBox from '../../molecules/SearchBox';
import exportApi from '../../services/ExportApi';
import EmployerInfoCards from '../../organisms/AdminDashboard/EmployerInfoCards';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';

const Employees = () => {
  const [employerData, setEmployerData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await employerApi.getAllEmployers(
        page + 1,
        rowsPerPage,
        searchQuery,
        filterStatus,
        filterDate
      );
      if (response) {
        setEmployerData(response);
        setCount(response.count);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error');
    } finally {
      setLoading(false); // Set loading state to false when data fetching is complete
    }
  };

  const exportExcel = async () => {
    try {
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.split('/').slice(3).join('/');
      const fileName = 'Employers';
      const response = await exportApi.exportData({
        fileName,
        baseUrl,
        searchQuery,
        filterStatus,
        filterDate,
      });
      if (response) {
        toast.success('Excel file downloaded successfully', { autoClose: 2000 });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error');
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function immediately
  }, [page, rowsPerPage, searchQuery, filterStatus, filterDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleFilterStatus = value => {
    setFilterStatus(value);
  };
  const handleFilterDate = value => {
    setFilterDate(value);
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
    console.log('id', id);
    try {
      // Call the delete action on confirmation
      await employerApi.employerDelete(id);
      // If deletion is successful, fetch the updated data
      await fetchData();
      toast.success('Employer deleted successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error deleting employer:', error.message);
    }
  };
  return (
    <>
      <EmployerInfoCards totalCount={count} />
      <div className='row'>
        <div className='col-12'>
          <div className='card my-4 mb-0'>
            <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
              <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex align-items-center justify-content-between'>
                <h6 className='text-white text-capitalize ps-3 mb-0'>Employer List</h6>
                {/* <button onClick={toggleModal}>Add</button> */}
                <button type='button' className='btn btn-white' onClick={exportExcel}>
                  Export{' '}
                </button>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-between px-5'>
              <FilterBox
                filterArray={DateFilterStatus}
                label='Date'
                filterValue={handleFilterDate}
              />
              <FilterBox
                filterArray={UserFilterStatus}
                label='Status'
                filterValue={handleFilterStatus}
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
                          Employer
                        </th>
                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                          Company
                        </th>
                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                          Contact
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
                      {employerData?.data?.map((data, index) => {
                        const { firstName, lastName, email, userStatus, mobile } = data;
                        const {
                          name,
                          sector,
                          contactPerson,
                          contactPersonDesignation,
                          contactPersonMobile,
                          logo,
                        } = data.employerInfo;
                        const Status = UserStatus(parseInt(userStatus));
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
                                  <h6 className='mb-0 text-sm'>
                                    {firstName} {lastName}
                                  </h6>
                                  <p className='text-xs text-secondary mb-0'> {email}</p>
                                  <p className='text-xs text-secondary mb-0'> {mobile}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6 className='mb-0 text-sm'>{name}</h6>
                              <p className='text-xs font-weight-bold mb-0'>{sector}</p>
                            </td>
                            <td>
                              <h6 className='mb-0 text-sm'>{contactPerson}</h6>
                              <p className='text-xs mb-0'>{contactPersonDesignation}</p>
                              <p className='text-xs mb-0'>{contactPersonMobile}</p>
                            </td>
                            <td className='align-middle text-center text-sm'>
                              <span
                                className={`badge badge-sm ${Status === 'Active' ? 'bg-gradient-success' : Status === 'Pending' ? 'bg-gradient-secondary' : 'bg-gradient-warning'}`}
                              >
                                {Status}
                              </span>
                            </td>
                            {/* <td className='align-middle text-center'>
                            <span className='text-secondary text-xs font-weight-bold'><DateFormatter timestamp={createdAt}/></span>
                          </td> */}
                            <td className='align-middle text-center'>
                              {/* Action */}
                              <div className='d-flex align-items-center justify-content-center'>
                                <ConfirmationDialog
                                  title='Are you sure you want to delete this employer permenantly?'
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
                      {employerData && employerData.data && employerData.data.length === 0 && (
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

export default Employees;
