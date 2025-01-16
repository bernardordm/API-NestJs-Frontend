import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';

const SMSPage = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex w-full h-screen">
        <Aside />

        <form className="flex-grow flex flex-col justify-center items-center bg-gray-200">
          <div className="flex flex-col w-96">
            <label htmlFor="phone" className="text-lg mb-2">Phone Number</label>
            <input type="text" id="phone" className="border border-gray-300 p-2 mb-4" />

            <label htmlFor="message" className="text-lg mb-2">Message</label>
            <textarea id="message" className="border border-gray-300 p-2 mb-4" />

            <button className="bg-cyan-800 text-white p-2 rounded">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SMSPage;