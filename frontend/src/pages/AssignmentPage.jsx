import React, { useEffect, useState } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import RiseLoader from "react-spinners/RiseLoader";
import axios from 'axios'

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};


export default function AssignmentPage() {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  console.log(assignments);


const getAssignments = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/item/getassignments', 
          {withCredentials:true}
        );
        setAssignments(response.data.assignments);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }finally{
        setTimeout(() => setLoading(false), 100);
      }
    }

  useEffect(() => {
    getAssignments();
  }, []);



  const handleReturn = async(itemId, quantity, assignmentId, agentId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/item/returnitem', {itemId, quantity, assignmentId, agentId}, {withCredentials:true});
      getAssignments();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };



  const handleDelete = async() => {
    try {
      const response = await axios.delete('http://localhost:3000/api/item/deleteassignments', {
        withCredentials:true
      })
      // console.log(response);
      getAssignments();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {!loading ? (
        <div className="p-6">
          {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">Assignment Records</h1> */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Assignment Logs</h1>
            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              onClick={handleDelete}
            >
              <FaTrash size={16} />
              Delete Returned
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full bg-white rounded-xl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Item</th>
                  <th className="px-6 py-3 text-left">Assigned To</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Remarks</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assignments.map((a) => (
                  <tr key={a.id}>
                    <td className="px-6 py-4">{a.id}</td>
                    <td className="px-6 py-4">{a.Item.name}</td>
                    <td className="px-6 py-4">{a.agent.name}</td>
                    <td className="px-6 py-4">{a.quantity}</td>
                    <td className="px-6 py-4">{a.status}</td>
                    <td className="px-6 py-4">{new Date(a.assignmentDate).toLocaleString()}</td>
                    <td className="px-6 py-4">{a.remarks?a.remarks: '.............'}</td>
                    <td className="px-6 py-4 flex gap-2">
                      {a.status === "assigned" ? (
                        <button
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                          onClick={() => handleReturn(a.Item.id, a.quantity, a.id, a.agentId)}
                        >
                          Return <FaPaperPlane size={14} /> 
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded transition" disabled
                        >
                          Return <FaPaperPlane size={14} /> 
                        </button>
                      )}
                    </td>
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
