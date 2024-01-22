import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import CustomerForm from './CustomerForm';
import FilterForm from './FilterForm';
import CustomPagination from './Pagination';
import RouteModal from './RouteModal';

const API_URL = 'http://localhost:4000/customers';

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Alterado para 5 para facilitar a visualização
  const [totalPages, setTotalPages] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coordinate_x: '',
    coordinate_y: '',
  });
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  const handleRouteClick = async () => {
    try {
      const response = await axios.get(`${API_URL}/optimized-route`);
      setOptimizedRoute(response.data);
      setShowRouteModal(true);
    } catch (error) {
      console.error('Error fetching optimized route:', error);
    }
  };

  const handleCloseModal = () => {
    setShowRouteModal(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, perPage]);

  const fetchCustomers = async () => {
    try {
      let filters = nameFilter ? '&name=' + nameFilter : '';
      filters += emailFilter ? '&email=' + emailFilter : '';
      filters += phoneFilter ? '&phone=' + phoneFilter : '';
      const response = await axios.get(`${API_URL}?page=${page}&perPage=${perPage}${filters}`);
      const { data, totalPages } = response.data;
      setTotalPages(totalPages);
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleFilterClick = () => {
    setPage(1);
    fetchCustomers();
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      console.log('Customer created:', response.data);
      fetchCustomers();
      setFormData({
        name: '',
        email: '',
        phone: '',
        coordinate_x: '',
        coordinate_y: '',
      });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`${API_URL}/${selectedCustomer.id}`, formData);
      console.log('Customer edited:', response.data);
      fetchCustomers();
      setIsEditing(false);
      setSelectedCustomer(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        coordinate_x: '',
        coordinate_y: '',
      });
    } catch (error) {
      console.error('Error editing customer:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`${API_URL}/${customerId}`);
      console.log('Customer deleted:', customerId);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditClick = (customer) => {
    setIsEditing(true);
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      coordinate_x: customer.coordinate_x,
      coordinate_y: customer.coordinate_y,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      coordinate_x: '',
      coordinate_y: '',
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>

      <CustomerForm
        isEditing={isEditing}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleCancelEdit={handleCancelEdit}
        selectedCustomer={selectedCustomer}
        formData={formData}
        setFormData={setFormData}
      />
      
      <FilterForm
        nameFilter={nameFilter}
        emailFilter={emailFilter}
        phoneFilter={phoneFilter}
        setNameFilter={setNameFilter}
        setEmailFilter={setEmailFilter}
        setPhoneFilter={setPhoneFilter}
        handleFilterClick={handleFilterClick}
      />

      <CustomerTable
        customers={customers}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        handleRouteClick={handleRouteClick}
      />

      <RouteModal
        show={showRouteModal}
        handleClose={handleCloseModal}
        modalProps={{ optimizedRoute }}
      />

      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
