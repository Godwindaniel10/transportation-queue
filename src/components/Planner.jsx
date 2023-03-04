import React, { useState } from "react";

const Planner = () => {
  const [plannerData, setPlannerData] = useState(() => {
    const initialData = {};
    for (let i = 0; i < 7; i++) {
      initialData[i] = {
        "Slot 1": {},
        "Slot 2": {},
        "Slot 3": {},
        "Slot 4": {},
      };
    }
    return initialData;
  });

  const [draggedCustomer, setDraggedCustomer] = useState(null);

  const handleDrop = (event, day, slot) => {
    event.preventDefault();
    const customer = JSON.parse(event.dataTransfer.getData("text/plain"));
    const updatedCustomer = { ...customer, day: day.date };
    const updatedPlannerData = {
      ...plannerData,
      [day.date.getDay()]: {
        ...plannerData[day.date.getDay()],
        [slot]: updatedCustomer,
      },
    };
    setPlannerData(updatedPlannerData);
    // Make an HTTP request to save the updated planner data to the database
  };

  const clearDraggedCustomer = () => {
    setDraggedCustomer(null);
  };

  const startDate = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i + 1);
    return {
      name: date.toLocaleDateString("en-US", { weekday: "long" }),
      date,
    };
  });

  const slots = ["Slot 1", "Slot 2", "Slot 3", "Slot 4"];

  const getCustomerInfo = (day, slot) => {
    const customer = plannerData[day.date.getDay()][slot];
    if (
      draggedCustomer &&
      draggedCustomer.day.getTime() === day.date.getTime() &&
      draggedCustomer.slot === slot
    ) {
      return {
        name: draggedCustomer.name,
        id: draggedCustomer.id,
      };
    }
    return customer
      ? { name: customer.name, id: customer.id }
      : { name: "Empty Slot", id: null };
  };

  return (
    <table className="rounded-[20px] shadow-2xl w-[300px] divide-y divide-gray-200">
      <thead className="border rounded-t-[20px] bg-gray-50 text-gray-600 text-[14px]">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Slot
          </th>
          {days.map((day) => (
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              key={day.date.getTime()}
            >
              {day.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-[14px]">
        {slots.map((slot) => (
          <tr key={slot}>
            <td className="px-6 py-4 whitespace-nowrap">{slot}</td>
            {days.map((day) => (
              <td
                key={`${day.date.getTime()}-${slot}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, day, slot)}
                className=" whitespace-nowrap"
              >
                <div
                  className={`h-[50px] flex flex-col justify-center items-start p-3 border-[1px] text-[14px] border-dashed ${
                    draggedCustomer &&
                    draggedCustomer.day.getTime() === day.date.getTime() &&
                    draggedCustomer.slot === slot
                      ? "bg-green-100 border-green-500" // Change the border and background color when item is being dragged over it
                      : "border-gray-400" // Default border color
                  }`}
                  onDragLeave={() => clearDraggedCustomer()}
                  onDrop={(event) => handleDrop(event, day, slot)}
                >
                  <p>
                    {getCustomerInfo(day, slot).id
                      ? ` ID: ${getCustomerInfo(day, slot).id}`
                      : ""}
                  </p>
                  <p>{getCustomerInfo(day, slot).name}</p>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Planner;
