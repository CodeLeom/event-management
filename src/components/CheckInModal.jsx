/* eslint-disable react/prop-types */
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CheckInModal({ onClose }) {
  const [pinInput, setPinInput] = useState('');
  const [checkInMessage, setCheckInMessage] = useState('');

  const handleCheckIn = async () => {
    setCheckInMessage('');
    if (!pinInput) {
      setCheckInMessage('Please enter your 4-digit PIN.');
      return;
    }

    try {
      // Find the user by PIN
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("pin", pinInput)
        .single();

      if (error) {
        setCheckInMessage('No registration found with that PIN.');
        return;
      }

      const daysCheckedIn = data.days_Checked_in || [];

      if (daysCheckedIn.length >= 4) {
        setCheckInMessage('You have already checked in for all 4 days.');
        return;
      }

      // Add next day to daysCheckedIn array
      const nextDay = daysCheckedIn.length + 1;
      const { error: updateError } = await supabase
        .from("registrations")
        .update({ days_Checked_in: [...daysCheckedIn, nextDay] })
        .eq("pin", pinInput);
        
      if (updateError) {
        setCheckInMessage('Error updating check-in status.');
        return;
      }

      setCheckInMessage(`Check-in successful for Day ${nextDay}!`);
      setPinInput('');
    } catch (error) {
      console.error('Check-in error:', error);
      setCheckInMessage('Error while checking in. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Check In</h2>

        <div>
          <label className="block mb-1 font-medium">Enter your 4-digit PIN</label>
          <input
            type="text"
            maxLength={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="0000"
          />
        </div>

        <button
          onClick={handleCheckIn}
          className="mt-4 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Check In
        </button>

        {checkInMessage && (
          <p className="mt-4 text-center font-medium">
            {checkInMessage}
          </p>
        )}
      </div>
    </div>
  );
}