import { useState } from 'react';
import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import { sendSMS } from '../../Utils/API';

const SMSPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendSMS(phoneNumber, message);
      setSuccess("Mensagem enviada com sucesso!");
      setError(null);
    } catch (error) {
      setError("Erro ao enviar mensagem.");
      setSuccess(null);
    }
  };

  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex w-full h-screen">
        <Aside />
        <form onSubmit={handleSendMessage} className="flex-grow flex flex-col justify-center items-center bg-gray-200">
          <div className="flex flex-col w-96">
            <label htmlFor="phone" className="text-lg mb-2">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              id="phone"
              className="border border-gray-300 p-2 mb-4"
              required
            />
            <label htmlFor="message" className="text-lg mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              className="border border-gray-300 p-2 mb-4"
              required
            />
            <button type="submit" className="bg-cyan-800 text-white p-2 rounded">Send</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SMSPage;