import React, {useState} from 'react';

const LogisticsQueue = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Doe', pickup: '123 Main St', dropoff: '456 Oak St' },
        { id: 2, name: 'Raymond Rostova', pickup: '789 Elm St', dropoff: '321 Maple St' },
        { id: 3, name: 'Godwin Olele', pickup: '20 Pine St', dropoff: '444 Cedar St' },
        { id: 4, name: 'Morire Morwin', pickup: '555 ikija St', dropoff: '109 gascar St' },
        { id: 5, name: 'Elizabeth Keen', pickup: '11 sashe St', dropoff: '308, cephar St' },
      ]);
    
      const handleDragStart = (event, customer) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(customer));
      };
  
    return (
      <table className="rounded-[20px] shadow-2xl w-full divide-y divide-gray-200">
        <thead className="border rounded-t-[20px] bg-gray-50 text-gray-600 text-[14px]">
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer ID</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer Name</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Pick Up Location</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Drop Off Location</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200 text-[14px]'>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              draggable
              onDragStart={(event) => handleDragStart(event, customer)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.pickup}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.dropoff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

export default LogisticsQueue;
