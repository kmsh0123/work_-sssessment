import React, { useState } from 'react'
import { useGetItemDetailQuery, useUpdateItemMutation } from '../feature/api/Item/itemApi';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {ImSpinner2} from "react-icons/im"


const Edit = () => {
  const {id} = useParams()
  const token = Cookies.get("token");
  const {data} = useGetItemDetailQuery({token,id});
  const [updateItem,{isLoading}] = useUpdateItemMutation();
  const {register,handleSubmit} = useForm()
  const nav = useNavigate()

  const updateHandler = async (formData) => {
    const {data} = await updateItem({id,formData,token})
    if(data?.success){
      nav("/")
    }
    
  }
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Edit you are item
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(updateHandler)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  type="title"
                  {...register("title")}
                  defaultValue={data?.data?.title}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                description
              </label>
              <div className="mt-2">
              <textarea
              id="description"
              {...register("description")}
              type="text"
              defaultValue={data?.data?.description}
              rows="3"
              placeholder="Write your message"
              className="peer relative w-full rounded border border-slate-200 px-4 py-2 text-sm text-gray-900 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                category
              </label>
              <div className="mt-2">
                <input
                  id="category"
                  {...register("category")}
                  defaultValue={data?.data?.category}
                  type="category"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? <ImSpinner2 className="animate-spin mx-auto w-5 h-5" /> : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Edit