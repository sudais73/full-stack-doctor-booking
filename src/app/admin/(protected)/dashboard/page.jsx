'use client';

import { assets } from "@/app/assets_admin/assets";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function Dashboard() {
  const { cancellAppointment, getDashboardData, dashData } = useContext(AppContext);

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!dashData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const stats = [
    { label: "Doctors", value: dashData.doctors, icon: assets.doctor_icon },
    { label: "Appointments", value: dashData.appointments, icon: assets.appointments_icon },
    { label: "Patients", value: dashData.patients, icon: assets.patients_icon },
  ];

  return (
    <div className="m-3 md:m-6 space-y-6">
      {/* ==== Dashboard Stats ==== */}
      <div className="flex flex-wrap gap-4">
        {stats.map(({ label, value, icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-lg border border-gray-300 
            cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-sm"
          >
            <Image src={icon} alt={label} width={35} height={35} />
            <div className="flex flex-col items-center text-center">
              <p className="text-xl font-semibold">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ==== Latest Appointments ==== */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 p-4 border-b">
          <Image src={assets.list_icon} alt="list" width={25} height={25} />
          <p className="text-xl font-semibold">Latest Appointments</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointment?.length > 0 ? (
            dashData.latestAppointment.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between px-6 py-4 items-center hover:bg-gray-50 transition"
              >
                {/* Doctor info */}
                <div className="flex items-center gap-3">
                  <Image
                    src={item.docData.image}
                    alt={item.docData.name}
                    width={50}
                    height={50}
                    className="rounded-full border bg-gray-100 object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">Booking on {item.slotDate}</p>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-2 md:mt-0">
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancellAppointment(item._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
                    >
                      Cancel
                    </button>
                  )}
                  {item.cancelled && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg">Cancelled</span>
                  )}
                  {item.isCompleted && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-lg">
                      ✅ Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-gray-500 text-center">No recent appointments</div>
          )}
        </div>
      </div>
    </div>
  );
}
