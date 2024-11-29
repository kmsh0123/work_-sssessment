import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import Create from '../pages/Create'
import Cookies from 'js-cookie'
import { useDeleteItemMutation, useGetItemQuery } from '../feature/api/Item/itemApi'
import Swal from "sweetalert2";

const Table = () => {
  const token = Cookies.get("token");
  const {id} = useParams()
  const {data} = useGetItemQuery(token);
  const [ItemDelete] = useDeleteItemMutation()
  const [searchTerm, setSearchTerm] = useState("");

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will delete your item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });
    if (result.isConfirmed) {
      const { data } = await ItemDelete({ token, id });
      console.log(data);
      if (data.success) {
        Swal.fire("Deleted!", "The novel has been deleted.", "success");
      } else {
        Swal.fire("Error!", "There was an issue deleting the novel.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your Item is safe!",
        icon: "info",
      });

    }
  }
  const filteredData = data?.data?.filter((item) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerCaseTerm) ||
      item.description.toLowerCase().includes(lowerCaseTerm) ||
      item.category.toLowerCase().includes(lowerCaseTerm)
    );
  });

  return (
    <div className='px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem] mx-auto max-w-full mt-5'>
        <div className='flex justify-between items-center gap-5 md:gap-0'>
        <SearchBar setSearchTerm={setSearchTerm}/>
        <Create/>
        </div>
       {
        filteredData?.length > 0 ? <table className="w-full border border-separate rounded border-slate-200 text-center" cellSpacing="0">
        <tbody>
    <tr>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Title</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Description</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Category</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Created Date</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Action</th>
    </tr>
   {filteredData?.map((item,index)=>(
     <tr key={index} className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
     <td data-th="Title" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{item?.title}</td>
     <td data-th="Description" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{item?.description}</td>
     <td data-th="Category" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{item?.category}</td>
     <td data-th="Created Date" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{item?.createdAt.slice(0,10)}</td>
     <td data-th="Action" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex justify-center items-center h-14 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 space-x-1">
       <Link to={`/edit/${item._id}`} className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none w-20">Edit</Link>
       <button onClick={()=>deleteHandler(item._id)} className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none">Delete</button>
     </td>
   </tr>
   ))}
        </tbody>
        </table>   :  
     <h1 className='flex justify-center items-center h-52'>Sorry sir,Not Data Found!</h1>
        
       }
    </div>
  )
}

export default Table