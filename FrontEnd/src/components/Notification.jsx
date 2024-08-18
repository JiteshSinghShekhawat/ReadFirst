import React, { useState, useEffect } from 'react';

function Notification({ message, duration = 6000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
}

export default Notification;
