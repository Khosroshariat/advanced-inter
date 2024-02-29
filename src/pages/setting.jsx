"use client";
import SearchBar from "../../components/foryou/SearchBar";
import Sidebar from "../../components/foryou/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../redux/modalSlice";
import LoginModal from "components/modals/LoginModal";

export default function Setting() {
  const user = useSelector((state) => state.user.email);
  const subscribe = useSelector((state) => state.user.subscription);

  const dispatch = useDispatch();

  return (
    <>
      <Sidebar />
      <SearchBar />
      <div className="w-full flex flex-col md:ml-[100px] space-y-5 mt-10">
        {user ? (
          <div className="mx-auto md:w-[70%] max-w-[1200px] min-w-[400px]">
            <h1 className="text-[30px] font-extrabold border-b border-gray-200">
              Settings
            </h1>

            <h2 className="text-[20px] font-bold">Your subscription plan:</h2>

            <p className="text-sky-300 bg-slate-500 text-center w-20 px-1 rounded-md">{subscribe}</p>

            <h2 className="text-[20px] font-bold">user:</h2>
            <h1 className="text-sky-700">{user}</h1>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <img src="/assets/login.png" alt="" className="w-96 m-5" />

            <p className="text-center font-bold">
              Log in to your account to see your details.
            </p>
            <button
              onClick={() => dispatch(openLoginModal())}
              className="w-[20%] h-[40px] bg-green-400 text-center m-5 rounded-md"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <LoginModal />
    </>
  );
}
