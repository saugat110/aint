import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import RiseLoader from "react-spinners/RiseLoader";
import axios from 'axios'

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  // console.log(logs);

  const getLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/item/getlogs', {withCredentials:true});
      setLogs(response.data.logs);
    } catch (error) {
      console.error(error);
    }finally{
      setTimeout(() => setLoading(false), 100);
    }
  };

  const handleDeleteAll = async() => {
    try {
      const response  = await axios.delete('http://localhost:3000/api/item/deletelogs', {
        withCredentials:true
      });
      getLogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Transaction Logs</h1>
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              <FaTrash size={16} />
              Delete All
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full bg-white rounded-xl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Action</th>
                  <th className="px-6 py-3 text-left">Item Name</th>
                  <th className="px-6 py-3 text-left">Agent Name</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Performed By</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4">{log.id}</td>
                    <td className="px-6 py-4">{log.actionType}</td>
                    <td className="px-6 py-4">{log.item.name}</td>
                    <td className="px-6 py-4">{log?.agent?.name ? log.agent.name: '-------'}</td>
                    <td className="px-6 py-4">{log.quantity}</td>
                    <td className="px-6 py-4">{log.performedBy}</td>
                    <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <RiseLoader
          color={"blue"}
          loading={loading}
          cssOverride={override}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}
