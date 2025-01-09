import Aside from "../../components/Aside/Aside";
import Header from "../../components/Header/Header";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <><Header /><div className="flex w-full h-screen">
          <Aside />
          <div className="flex-grow flex justify-center items-center bg-gray-200">
              <SignupForm />
          </div>
      </div></>
  );
};

export default SignupPage;