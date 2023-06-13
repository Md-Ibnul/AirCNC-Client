import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar.jsx";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import HostRequestModal from "../../Modal/HostRequestModal.jsx";
import { becomeHost } from "../../../api/auth.js";
import { toast } from "react-hot-toast";

const MenuDropdown = () => {
  const { user, logOut, role, setRole } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const modalHandler = (email) => {
    becomeHost(email)
    .then(data => {
      if(data.modifiedCount > 0){
        setRole("host")
        toast.success("You are host now, Post Rooms!")
        navigate('/dashboard/add-room')
      }
      closeModal()
    })
  }
  const closeModal = () => {
    setModal(false)
  }
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 py-3 px-8">
        {/* Aircnc Button */}
        <div className="hidden md:block text-sm">
          {!role && (
            <button className="font-semibold rounded-full py-3 px-4 hover:bg-neutral-100 transition cursor-pointer" onClick={() => setModal(true)} disabled={!user}>AirCNC your home</button>
          )}
        </div>
        {/* Dropdown button */}
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>
            {user ? (
              <>
              <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={() => {
                    setRole(null)
                    logOut()
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <HostRequestModal email={user?.email} modalHandler={modalHandler} isOpen={modal} closeModal={closeModal}/>
    </div>
  );
};

export default MenuDropdown;
