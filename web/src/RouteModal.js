const RouteModal = ({ show, handleClose, modalProps }) => {
    if (!show) {
      return null;
    }
  
    const { optimizedRoute } = modalProps;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-top justify-center">
        <div className="bg-white p-4 rounded overflow-y-auto mt-5">
          <h2 className="text-2xl font-bold mb-2">Best Route</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Coordinate X</th>
                <th className="border px-4 py-2">Coordinate Y</th>
              </tr>
            </thead>
            <tbody>
              {optimizedRoute.map((point, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{point.id}</td>
                  <td className="border px-4 py-2">{point.name}</td>
                  <td className="border px-4 py-2">{point.email}</td>
                  <td className="border px-4 py-2">{point.phone}</td>
                  <td className="border px-4 py-2">{point.coordinate_x}</td>
                  <td className="border px-4 py-2">{point.coordinate_y}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default RouteModal;
  