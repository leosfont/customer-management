import React, { useState, useEffect } from 'react';

const CustomerForm = ({ isEditing, handleCreate, handleEdit, handleCancelEdit, selectedCustomer, formData, setFormData }) => {
  useEffect(() => {
    if (isEditing && selectedCustomer) {
      setFormData({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        coordinate_x: selectedCustomer.coordinate_x,
        coordinate_y: selectedCustomer.coordinate_y,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        coordinate_x: '',
        coordinate_y: '',
      });
    }
  }, [isEditing, selectedCustomer, setFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">{isEditing ? 'Edit Customer' : 'Create Customer'}</h2>
      <div className="flex space-x-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="coordinate_x" className="block text-sm font-medium text-gray-700">
            Coordinate X
          </label>
          <input
            type="text"
            id="coordinate_x"
            name="coordinate_x"
            placeholder="Coordinate X"
            value={formData.coordinate_x}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="coordinate_y" className="block text-sm font-medium text-gray-700">
            Coordinate Y
          </label>
          <input
            type="text"
            id="coordinate_y"
            name="coordinate_y"
            placeholder="Coordinate Y"
            value={formData.coordinate_y}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center mt-5">
          <button onClick={isEditing ? handleEdit : handleCreate} className="p-2 bg-blue-500 text-white rounded">
            {isEditing ? 'Edit' : 'Create'}
          </button>

          {isEditing && (
            <button onClick={handleCancelEdit} className="p-2 bg-gray-500 text-white rounded ml-2">
              Cancel
            </button>
          )}
      </div>
      </div>
      
    </div>
  );
};

export default CustomerForm;
