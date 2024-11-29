import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import Cookies from "js-cookie"
import { useCreateItemMutation } from "../feature/api/Item/itemApi";
import { useForm } from "react-hook-form";
import { ItemSchema } from "../schema/ItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {ImSpinner2} from "react-icons/im"

export default function Create() {
  const token = Cookies.get("token")
  const [CreateItem, { isLoading }] = useCreateItemMutation();
  
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ItemSchema),
    initialValues: {
      title : "",
      description: "",
      category: "",
    },
  });
  const nav = useNavigate();

  const [isShowing, setIsShowing] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    let html = document.querySelector("html")

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden"

        const focusableElements =
          'button, [href], input, select, textarea, [tabIndex]:not([tabindex="-1"])'

        const modal = document.querySelector("#modal") // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements)

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false)
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9

          if (!isTabPressed) {
            return
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus() // add focus for the last focusable element
              e.preventDefault()
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus() // add focus for the first focusable element
              e.preventDefault()
            }
          }
        })

        firstFocusableElement.focus()
      } else {
        html.style.overflowY = "visible"
      }
    }
  }, [isShowing])

  const createHandler = async(formData) =>{
    const {data} = await CreateItem({formData,token})
    console.log(data?.success);
    if(data?.success === true){
      nav("/")
      setIsShowing(false)
    }
    
  }

  return (
    <>
      <button
        onClick={() => setIsShowing(true)}
        className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      >
        <span>Create</span>
      </button>
      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-1a content-1a"
              aria-modal="true"
              tabIndex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                ref={wrapperRef}
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-1a" className="flex items-center gap-4">
                  <h3 className="flex-1 text-xl font-medium text-slate-700">
                    Create Item
                  </h3>
                  <button
                    onClick={() => setIsShowing(false)}
                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-79 desc-79"
                      >
                        <title id="title-79">Icon title</title>
                        <desc id="desc-79">
                          A more detailed description of the icon
                        </desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </header>
                {/*        <!-- Modal body --> */}
                <form onSubmit={handleSubmit(createHandler)} className="space-y-6">
            <div>
            <label
                style={{ color: errors.title ? "red" : "black" }}
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span>
                  {errorMessage ? (
                    <span className=" text-red-500">Title</span>
                  ) : (
                    "Title"
                  )}
                </span>
            </label>
              <div className="mt-2">
                <input
                  id="title"
                  {...register("title")}
                  type="title"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm ${
                    errors.title ? "outline-red-500" : ""
                  }`}
              />
              <p className=" text-red-500 text-sm">{errors.title?.message}</p>
              </div>
            </div>

            <div>
            <label
                style={{ color: errors.description ? "red" : "black" }}
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span>
                  {errorMessage ? (
                    <span className=" text-red-500">Description</span>
                  ) : (
                    "Description"
                  )}
                </span>
            </label>
              <div className="mt-2">
              <textarea
              id="description"
              type="text"
              {...register("description")}
              rows="3"
              placeholder="Write your message"
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm ${
                errors.title ? "outline-red-500" : ""
              }`}
          >
        </textarea>
        <p className=" text-red-500 text-sm">{errors?.description?.message}</p>
              </div>
            </div>

            <div>
            <label
                style={{ color: errors.description ? "red" : "black" }}
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span>
                  {errorMessage ? (
                    <span className=" text-red-500">Category</span>
                  ) : (
                    "Category"
                  )}
                </span>
            </label>
              <div className="mt-2">
                <input
                  id="category"
                  {...register("category")}
                  type="category"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm ${
                    errors.category ? "outline-red-500" : ""
                  }`}
              />
              <p className=" text-red-500 text-sm">{errors?.category?.message}</p>
              </div>
            </div>

            <div>
            <button
            type="submit"
            className={`flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
            disabled={isLoading}
>
  {isLoading ? <ImSpinner2 className="animate-spin mx-auto w-5 h-5" /> : "Edit"}
</button>
            </div>
          </form>
                {/*        <!-- Modal actions --> */}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
