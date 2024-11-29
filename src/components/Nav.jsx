import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie";
import { useLogoutMutation } from "../feature/api/auth/authApi";
import { useDispatch } from "react-redux";
import { removeUser } from "../feature/auth/authSlice";

export default function Navbar() {
  const token = Cookies.get("token");
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const nav = useNavigate()

  const user = Cookies.get("user");
  const UserProfile = user ? JSON.parse(user) : null;

  const logoutHandler = async () => {
    const {data} = await logout(token);
    dispatch(removeUser({user : data?.user,token : data?.token}))
    if(data?.success === true){
      nav("/login")
    }
  }
  

  return (
    <>
      {/*<!-- Component: Navbar with CTA --> */}
      <header className="relative z-20 w-full border-b shadow-lg border-slate-200 bg-white/90 shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <a
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none lg:flex-1"
            >
              Work Assessment
            </a>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
             {token ? <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex flex-col items-center text-left gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"

                >
                  <span>Name: {UserProfile?.name}</span>
                  <span>Name: {UserProfile?.email}</span>
                </a>
              </li> :  <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"

                >
                  <span>Home</span>
                </a>
              </li>}
            </ul>
            {token ?
              <button onClick={logoutHandler} className="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
                <span className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-red-600 shadow-red-200 hover:bg-red-600 hover:shadow-sm hover:shadow-red-200 focus:bg-red-700 focus:shadow-sm focus:shadow-red-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none">Logout</span>
              </button>
             : <Link to={"/login"} className="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
                <span className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-indigo-600 shadow-indigo-200 hover:bg-indigo-600 hover:shadow-sm hover:shadow-indigo-200 focus:bg-indigo-700 focus:shadow-sm focus:shadow-indigo-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none">Login</span>
            </Link>}
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with CTA --> */}
    </>
  )
}
