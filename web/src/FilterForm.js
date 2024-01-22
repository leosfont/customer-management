import React from 'react';

const FilterForm = ({ nameFilter, emailFilter, phoneFilter, setNameFilter, setEmailFilter, setPhoneFilter, handleFilterClick }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="nameFilter" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="nameFilter"
            placeholder="Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="emailFilter" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="emailFilter"
            placeholder="Email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="phoneFilter" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phoneFilter"
            placeholder="Phone"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <button
            onClick={handleFilterClick}
            className="p-2 mt-5 bg-blue-500 text-white rounded"
          >
            Filter
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default FilterForm;
