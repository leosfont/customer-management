import React from 'react';

const CustomerTable = ({ customers, handleEditClick, handleDelete, handleRouteClick }) => {
  return (
    <div className="mb-8">
      
      <h2 className="text-xl font-bold mb-2 flex justify-between">
        Customer List
        <button
          onClick={() => handleRouteClick()}
          className="bg-green-500 font-normal text-xl text-white px-4 py-2 rounded"
        >
          Show Best Route
        </button>
      </h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Coordinates</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="cursor-pointer hover:bg-gray-200">
              <td className="border p-2">{customer.id}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.coordinate_x}, {customer.coordinate_y}</td>
              <td className="border p-2 space-x-2 flex justify-center">
                <button
                  onClick={() => handleEditClick(customer)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
