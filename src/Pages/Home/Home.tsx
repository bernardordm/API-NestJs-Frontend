import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import logo from '../../assets/logo-1.png';

const Home = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex w-full h-screen">
        <Aside />
        <div className="flex-grow flex justify-center items-center bg-gray-200">
          <img src={logo} alt="logo" className="w-auto h-60" />
        </div>
      </div>
    </div>
  );
};

export default Home;