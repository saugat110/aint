import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import axios from 'axios'
import {message} from 'antd'
import RiseLoader from "react-spinners/RiseLoader";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};


export default function InventoryPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [agents, setAgents] = useState(null);
  const [assignModal, setAssignModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignForm, setAssignForm] = useState({itemId:"", itemName:"",  agentName: "", agentId:"", quantity: 1, remarks: "", maxassign:'' });
  const [updateForm, setUpdateForm] = useState({ name:'', itemId:'', totalQuantity: 0 });
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    const getItemsAndAgents = async() => {
      try {
        const response1 = await axios.get('http://localhost:3000/api/item/getitems', {
          withCredentials:true
        });
        setItems(response1.data.items);

        const response2 = await axios.get('http://localhost:3000/api/item/getagents', {
          withCredentials:true
        });
        setAgents(response2.data.agents);
      } catch (error) {
        console.log(error);
          alert(error);
      }finally{
        setTimeout(() => setLoading(false),100);
      }
    }
    getItemsAndAgents();
  }, [assignModal, confirmModal, updateModal])

  const openAssignModal = (item) => {
    setSelectedItem(item);
    setAssignForm((prev) => ({ ...prev, itemId:item.id, itemName:item.name, maxassign:item.available}));
    setAssignModal(true);
  };

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setUpdateForm({ name: item.name, itemId:item.id, totalQuantity: item.totalQuantity });
    setUpdateModal(true);
  };

  const closeModals = () => {
    setAssignModal(false);
    setUpdateModal(false);
    setSelectedItem(null);
    setAssignForm({itemId:"", itemName:"",  agentName: "", agentId:"", quantity: 1, remarks: "", maxassign:'' });
  };

  //when confirm form pops
  const closeAssignModal = () => {
    setAssignModal(false);
  }

  //cancel on confirm modal
  const closeConfirmModal = () => {
    setConfirmModal(false);
    setAssignForm({itemId:"", itemName:"",  agentName: "", agentId:"", quantity: '', remarks: "" });
  }

  const handleAssign = async(e) => {
    e.preventDefault();
    try {
      console.log(assignForm)
      const response = await axios.post('http://localhost:3000/api/item/assignitem', assignForm, {withCredentials:true});
      closeModals();
      console.log(response);
    } catch (error) {
      closeAssignModal();
      setConfirmModal(true);
    }
  };

  const handleConfirmCreateAgentAndAssign = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/item/createagentassign', assignForm, {withCredentials:true});
      console.log(assignForm);
      setConfirmModal(false);
      setAssignForm({itemId:"", itemName:"",  agentName: "", agentId:"", quantity: 1, remarks: "" });
    } catch (error) {
        console.log(error);
    }
  };
  

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/item/updateitem', updateForm, {withCredentials:true});
      console.log(response);
    } catch (error) {
      console.log(error);
    }finally{
      closeModals();
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      {!loading ? 
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory Management</h1>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Available</th>
                <th className="px-6 py-3 text-left">In Use</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            {items && <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.totalQuantity}</td>
                  <td className="px-6 py-4">{item.available}</td>
                  <td className="px-6 py-4">{item.inUse}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                      onClick={() => openAssignModal(item)}
                    >
                      <FaPaperPlane size={14} /> Assign
                    </button>
                    <button
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                      onClick={() => openUpdateModal(item)}
                    >
                      <FaEdit size={14} /> Update
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> }
          </table>
        </div>

        {/* Assign Modal */}
        {assignModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Assign Item</h2>
              <form onSubmit={handleAssign}>
              <label className="block mb-3">
                  <span className="text-sm font-medium text-gray-700">Item Name</span>
                  <input
                    type="text"
                    disabled
                    className="w-full mt-1 border p-2 rounded"
                    value={assignForm.itemName}
                  />
                </label>
                <label className="block mb-3 relative">
                  Agent Name
                  <input
                    type="text"
                    name="agentName"
                    required
                    autoComplete="off"
                    className="w-full border mt-1 p-2 rounded"
                    value={assignForm.agentName}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, agentName: e.target.value}))}
                  />
                  {assignForm.agentName && (
                    <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
                      {agents
                        .filter((a) =>
                          a.name.toLowerCase().includes(assignForm.agentName.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((a) => (
                          <li
                            key={a.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              setAssignForm((prev) => ({ ...prev, agentName: a.name, agentId:a.id}))
                            }
                          >
                            {a.name}
                          </li>
                        ))}
                    </ul>
                  )}
                </label>

                <label className="block mb-3">
                  <span className="text-sm font-medium text-gray-700">Quantity</span>
                  <input
                    type="number"
                    min={1}
                    max={assignForm.maxassign}
                    required
                    className="w-full mt-1 border p-2 rounded"
                    value={assignForm.quantity}
                    onChange={(e) =>
                      setAssignForm((prev) => ({ ...prev, quantity: +e.target.value }))
                    }
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-sm font-medium text-gray-700">Remarks</span>
                  <textarea
                    className="w-full mt-1 border p-2 rounded"
                    value={assignForm.remarks}
                    onChange={(e) =>
                      setAssignForm((prev) => ({ ...prev, remarks: e.target.value }))
                    }
                  />
                </label>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirm New Agent Modal */}
        {confirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-red-600">Agent Not Found</h2>
              <p className="mb-4 text-gray-700">
                No matching agent found.
                <br />
                Do you want to create a new agent and assign this item?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeConfirmModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmCreateAgentAndAssign}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Update Modal */}
        {updateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Update Inventory</h2>
              <form onSubmit={handleUpdate}>
                <label className="block mb-4">
                  <span className="text-sm font-medium text-gray-700">Item Name</span>
                  <input
                    type="text"
                    className="w-full mt-1 border p-2 rounded"
                    value={updateForm.name}
                    disabled
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-sm font-medium text-gray-700">New Total Quantity</span>
                  <input
                    type="number"
                    min={selectedItem.inUse}
                    className="w-full mt-1 border p-2 rounded"
                    value={updateForm.totalQuantity}
                    onChange={(e) =>
                      setUpdateForm((prev) => ({ ...prev, totalQuantity: +e.target.value }))
                    }
                    required
                  />
                </label>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div> :
        <RiseLoader
          color={"blue"}
          loading={loading}
          cssOverride={override}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> }
      </>
  );
}




