/* eslint-disable react/prop-types */

import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function RegistrationModal({ onClose }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [isMember, setIsMember] = useState("No");
  const [howHeard, setHowHeard] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");

  const [loading, setLoading] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a random 4-digit pin
  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pin = generatePin();
      const { error } = await supabase 
        .from("registrations")
        .insert([{
        full_name: fullName,
        phone_number: phoneNumber,
        email: email,
        age_range: ageRange,
        is_member: isMember,
        how_heard: howHeard,
        address: address,
        gender: gender,
        pin: pin,
        days_Checked_In: [],
        created_at: new Date(),
      }
    ]);
      if (error) throw error;
      setGeneratedPin(pin);
      setIsSubmitted(true);

      // Simulate email sending
      console.log(`Sending PIN ${pin} to the user... (Simulated)`);
    } catch (error) {
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-4/5 max-w-md bg-white p-6 rounded shadow relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
          <p>Your 4-digit PIN is:</p>
          <div className="text-3xl font-bold my-4 text-center">
            {generatedPin}
          </div>
          <p className="mb-4 text-center">
            Please keep this PIN safe. You’ll need it to check in each day.
          </p>
          <button
            onClick={onClose}
            className="block w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto z-[9999]">
      <div className="w-4/5 max-w-md bg-white p-6 rounded shadow relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
          <h2 className="text-xl font-bold mt-10">Register for the Conference</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Age Range</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="Under 18">Under 18</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Are you a member of our community?
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={isMember}
                onChange={(e) => setIsMember(e.target.value)}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">
                How did you hear about the conference?
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <button
              type="submit"
              className={`mt-4 w-full py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
      </div>
    </div>
  );
}