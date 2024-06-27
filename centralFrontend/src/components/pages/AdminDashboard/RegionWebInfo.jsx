/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Modal from '../../molecules/Modal';
import Pagination from '../../molecules/Pagination';
import regionApi from '../../services/RegionApi';
import { regionWebInfoStatus } from '../../constants/Constants';
import Icon from '../../atoms/Icon';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBModalBody, MDBModalHeader } from 'mdbreact';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import { WebInfoFilterStatus, ThemeFilterStatus } from '../../constants/FilterData';
import FilterBox from '../../molecules/FilterBox';
import SearchBox from '../../molecules/SearchBox';
import exportApi from '../../services/ExportApi';
import RegionWebInfoInfoCards from '../../organisms/AdminDashboard/RegionWebInfoInfoCards';

const RegionWebInfo = () => {
  const [regionWebInfo, setRegionWebInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState();
  const [regionWebActiveUsers, setRegionWebActiveUsers] = useState();
  const [regionWebEmailSent, setRegionWebEmailSent] = useState();
  const [regionWebinProgress, setRegionWebInProgress] = useState();
  const [regionWebPending, setRegionWebPending] = useState();
  const [regionWebRejected, setRegionWebRejected] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null); // Store selected data
  const [loadingMap, setLoadingMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTheme, setFilterTheme] = useState('');
  const [loading, setLoading] = useState(true);

  const initialValues = {
    webSourceName: '',
    webInfoTheme: '',
    webInfoWebUrl: '',
    webInfoTitle: '',
    webInfoLogo: '',
  };

  const validationSchema = Yup.object().shape({
    webSourceName: Yup.string().required('Region Name is required'),
    webInfoTheme: Yup.string().required('Theme is required'),
    webInfoWebUrl: Yup.string().required('URL is required'),
    webInfoTitle: Yup.string().required('Web title is required'),
    webInfoLogo: Yup.string().required('Logo is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Create the request body
      const formData = {
        webSourceId: selectedData.webSourceId, // Assuming webSourceId is available in selectedData
        webInfoTheme: values.webInfoTheme,
        webInfoWebUrl: values.webInfoWebUrl,
        webInfoTitle: values.webInfoTitle,
        // Add other fields if needed
      };

      // Call the API endpoint
      await regionApi.webInfoRegister(formData);
      // Reset the form after successful submission
      resetForm();

      // Close the modal
      setModalOpen(false);

      // Refetch data or update state if needed
      fetchData();
    } catch (error) {
      // console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendClick = async (email, webSourceId) => {
    try {
      setLoadingMap(prevLoadingMap => ({
        ...prevLoadingMap,
        [webSourceId]: true,
      }));

      // Call the API endpoint with the email parameter
      await regionApi.regionApprove({ email });
      // Optionally, you can perform additional actions after the API call
      // For example, refetching data or updating state
      fetchData();
      toast.success('Email sent successfully', { autoClose: 2000 });
    } catch (error) {
      // console.error('Error:', error);
      toast.error('Error occurred while sending the email', { autoClose: 2000 });
    } finally {
      setLoadingMap(prevLoadingMap => ({
        ...prevLoadingMap,
        [webSourceId]: false,
      }));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await regionApi.getWebInfo(
        page + 1,
        rowsPerPage,
        searchQuery,
        filterStatus,
        filterDate,
        filterTheme
      );
      if (response) {
        setRegionWebInfo(response.data);
        setCount(response.counts.totalCount);
        setRegionWebActiveUsers(response.counts.regionWebActiveUsers);
        setRegionWebEmailSent(response.counts.regionWebEmailSent);
        setRegionWebInProgress(response.counts.regionWebinProgress);
        setRegionWebPending(response.counts.regionWebPending);
        setRegionWebRejected(response.counts.regionWebRejected)
      }
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false); // Set loading state to false when data fetching is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchQuery, filterStatus, filterDate, filterTheme]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleFilterStatus = value => {
    setFilterStatus(value);
  };
  const handleFilterTheme = value => {
    setFilterTheme(value);
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

  const handleClearConfirmation = async webSourceId => {
    try {
      // Call the API endpoint to decline the webSource
      await regionApi.declineWebInfo({ webSourceId: webSourceId });

      // Optionally, you can perform additional actions after the API call
      // For example, refetching data or updating state
      fetchData();

      // Display success message
      toast.success('Web source declined successfully', { autoClose: 2000 });
    } catch (error) {
      // Display error message
      toast.error('Error occurred while declining the web source', { autoClose: 2000 });
      // eslint-disable-next-line no-undef
      console.error('Error:', error);
    }
  };

  const exportExcel = async () => {
    try {
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.split('/').slice(3).join('/');
      const fileName = 'RegionWebInfo';
      const response = await exportApi.exportData({
        fileName,
        baseUrl,
        searchQuery,
        filterStatus,
        filterDate,
        filterTheme,
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

  return (
    <>
      <RegionWebInfoInfoCards totalCount={count} regionWebActiveUsers={regionWebActiveUsers} regionWebEmailSent={regionWebEmailSent} regionWebinProgress={regionWebinProgress} regionWebPending={regionWebPending} regionWebRejected={regionWebRejected} />
      <div className='row'>
        <div className='col-12'>
          <div className='card my-4 mb-0'>
            <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
              <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex align-items-center justify-content-between'>
                <h6 className='text-white text-capitalize ps-3'>Region Web Information List</h6>
                {/* <button onClick={toggleModal}>Add</button> */}
                <button type='button' className='btn btn-white' onClick={exportExcel}>
                  Export{' '}
                </button>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-between px-5'>
              <FilterBox
                filterArray={ThemeFilterStatus}
                label='Theme'
                filterValue={handleFilterTheme}
              />
              <FilterBox
                filterArray={WebInfoFilterStatus}
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
                          Region Name
                        </th>
                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                          Title
                        </th>
                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                          URL
                        </th>
                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                          Theme
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
                      {regionWebInfo?.map((data, index) => {
                        const {
                          webSourceName,
                          webInfoTheme,
                          webInfoWebUrl,
                          webInfoTitle,
                          webInfoStatus,
                          webSourceId,
                        } = data.WebInfo;
                        const { logo } = data.RegionalInfo;
                        const { email } = data;
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
                                  <h6 className='mb-0 text-sm'>{webSourceName}</h6>
                                  <p className='text-xs text-secondary mb-0'> {email}</p>
                                </div>
                              </div>
                            </td>
                            <td className='align-middle text-center text-sm'>
                              {webInfoTitle == null ? (
                                <p className='text-xs mb-0'>Not yet defined</p>
                              ) : (
                                <p className='text-xs font-weight-bold mb-0'>{webInfoTitle}</p>
                              )}
                            </td>
                            <td className='align-middle text-center text-sm'>
                              {webInfoWebUrl == null ? (
                                <p className='text-xs mb-0'>Not yet defined</p>
                              ) : (
                                <p className='text-xs font-weight-bold mb-0'>{webInfoWebUrl}</p>
                              )}
                            </td>
                            <td className='align-middle text-center text-sm'>
                              {webInfoTheme == null ? (
                                <p className='text-xs mb-0'>Not yet defined</p>
                              ) : (
                                <p className='text-xs font-weight-bold mb-0'>
                                  {webInfoTheme === 'theme1'
                                    ? 'Theme 1'
                                    : webInfoTheme === 'theme2'
                                      ? 'Theme 2'
                                      : webInfoTheme === 'theme3'
                                        ? 'Theme 3'
                                        : webInfoTheme === 'default'
                                          ? 'Default Theme'
                                          : webInfoTheme}
                                </p>
                              )}
                            </td>

                            <td className='align-middle text-center text-sm'>
                              <span
                                className={`badge badge-sm ${
                                  webInfoStatus === '5'
                                    ? 'bg-gradient-danger'
                                    : webInfoStatus === '4'
                                      ? 'bg-gradient-secondary'
                                      : webInfoStatus === '3'
                                        ? 'bg-gradient-warning'
                                        : webInfoStatus === '2'
                                          ? 'bg-gradient-info'
                                          : webInfoStatus === '1'
                                            ? 'bg-gradient-success'
                                            : '' // default case
                                }`}
                              >
                                {regionWebInfoStatus(webInfoStatus)}
                              </span>
                            </td>

                            <td className='align-middle text-center'>
                              <div className='d-flex align-items-center justify-content-center'>
                                <Link onClick={() => toggleModal(data)}>
                                  <Icon className='material-icons opacity-10'>edit</Icon>
                                </Link>{' '}
                                <ConfirmationDialog
                                  title='Are you sure you want to reject the regional web source?'
                                  icon='warning'
                                  showCancelButton={true}
                                  confirmButtonColor='#3085d6'
                                  cancelButtonColor='#d33'
                                  confirmButtonText='Reject'
                                  cancelButtonText='Cancel'
                                  confirmAction={() => handleClearConfirmation(webSourceId)} // Pass a function reference
                                  feature={{
                                    type: 'icon',
                                    className: 'material-icons opacity-10 mx-3',
                                    content: 'dangerous',
                                    tooltip: 'Reject the regional web source',
                                  }}
                                />
                                {loadingMap[webSourceId] ? (
                                  <ThreeDotsLoader /> // Replace the loader with the ThreeDotsLoader component
                                ) : (
                                  <Link onClick={() => handleSendClick(email, webSourceId)}>
                                    <Icon className='material-icons opacity-10'>send</Icon>
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {!loading && regionWebInfo.length === 0 && (
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
      <Modal isOpen={modalOpen} toggleModal={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Edit Web Source</MDBModalHeader>
        <MDBModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Formik
            initialValues={selectedData || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className='mb-3'>
                  <label htmlFor='webSourceName'>Web Source Name:</label>
                  <Field
                    type='text'
                    id='webSourceName'
                    name='webSourceName'
                    className='form-control px-2' // Remove 'border' class
                    style={{ border: 'none' }} // Add inline style to remove border
                    readOnly
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='webInfoTitle'>Web Title:</label>
                  <Field
                    type='text'
                    name='webInfoTitle'
                    placeholder='Title'
                    className={`form-control border px-2 ${errors.webInfoTitle && touched.webInfoTitle && 'is-invalid'}`}
                  />
                  <ErrorMessage name='webInfoTitle' component='div' className='invalid-feedback' />
                </div>

                <div className='mb-3'>
                  <label htmlFor='email'>Email:</label>
                  <Field
                    type='text'
                    id='email'
                    name='email'
                    className='form-control px-2' // Remove 'border' class
                    style={{ border: 'none' }} // Add inline style to remove border
                    readOnly
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='webInfoWebUrl'>Web URL:</label>
                  <Field
                    type='text'
                    name='webInfoWebUrl'
                    placeholder='URL'
                    className={`form-control border px-2 ${errors.webInfoWebUrl && touched.webInfoWebUrl && 'is-invalid'}`}
                  />
                  <ErrorMessage name='webInfoWebUrl' component='div' className='invalid-feedback' />
                </div>

                <div className='mb-3'>
                  <label htmlFor='webInfoTheme'>Theme:</label>
                  <div className='input-group'>
                    <Field
                      as='select'
                      name='webInfoTheme'
                      className={`form-control border px-2 ${errors.webInfoTheme && touched.webInfoTheme && 'is-invalid'}`}
                    >
                      <option value='default'>Default Theme</option>
                      <option value='theme1'>Theme 1</option>
                      <option value='theme2'>Theme 2</option>
                      <option value='theme3'>Theme 3</option>
                    </Field>
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <i className='fa fa-chevron-down pe-3 pt-1'></i>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage name='webInfoTheme' component='div' className='invalid-feedback' />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-lg w-100'
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </MDBModalBody>
      </Modal>
    </>
  );
};

export default RegionWebInfo;
