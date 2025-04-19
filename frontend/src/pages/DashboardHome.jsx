import React, { useEffect, useState } from "react";
import { FaCubes, FaBoxes, FaClipboardCheck } from "react-icons/fa";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";

const loaderStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function DashboardPage() {
  const [assignments, setAssignments] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentsRes, itemsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/item/getassignments", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/item/getitems", {
            withCredentials: true,
          }),
        ]);

        setAssignments(assignmentsRes.data.assignments || []);
        setItems(itemsRes.data.items || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setTimeout(() => setLoading(false), 100);
      }
    };

    fetchData();
  }, []);

  // Computed stats
  const totalItemsCount = items.length;
  const totalItemQuantity = items.reduce((acc, item) => acc + item.totalQuantity, 0);
  const totalAssignedQuantity = assignments
    .filter((a) => a.status === "assigned")
    .reduce((acc, a) => acc + a.quantity, 0);

  if (loading) {
    return (
      <RiseLoader
        color={"#2563EB"}
        loading={loading}
        cssOverride={loaderStyles}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FaBoxes className="text-4xl mb-2" />}
          label="Total Items"
          value={totalItemsCount}
          bg="bg-indigo-100"
          text="text-indigo-800"
        />
        <DashboardCard
          icon={<FaCubes className="text-4xl mb-2" />}
          label="Total Quantity"
          value={totalItemQuantity}
          bg="bg-blue-100"
          text="text-blue-800"
        />
        <DashboardCard
          icon={<FaClipboardCheck className="text-4xl mb-2" />}
          label="Total Assigned"
          value={totalAssignedQuantity}
          bg="bg-yellow-100"
          text="text-yellow-800"
        />
      </div>
    </div>
  );
}

function DashboardCard({ icon, label, value, bg, text }) {
  return (
    <div className={`${bg} ${text} p-6 rounded-2xl shadow-md flex flex-col items-center justify-center`}>
      {icon}
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-2xl mt-1 font-bold">{value}</p>
    </div>
  );
}


