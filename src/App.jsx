import { useState } from 'react';
import RegistrationModal from './components/RegistrationModal';
import CheckInModal from './components/CheckInModal';

function App() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-300">
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-center">KCC 2025 Conference</h1>
        <p className="text-center mb-8">
          Welcome to the Kingdom Come Conference 2025! Join us for four days of inspiring sessions, worship, and fellowship.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
          <button
            onClick={() => setShowCheckInModal(true)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Check In
          </button>
        </div>
      </div>

      {/* Modals */}
      {showRegisterModal && (
        <RegistrationModal
          onClose={() => setShowRegisterModal(false)}
        />
      )}

      {showCheckInModal && (
        <CheckInModal
          onClose={() => setShowCheckInModal(false)}
        />
      )}
    </div>
  );
}

export default App;