import React from "react"

export default function SearchBar({setSearchTerm}) {

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update the search term in the parent
  };
  
  return (
    <>
      {/*<!-- Component: Rounded basic search input --> */}
    <div className="my-6 flex items-center space-x-2 border border-slate-200 rounded px-4 w-full max-w-md">
  <input
    id="search"
    type="search"
    name="search"
    placeholder="Search here"
    aria-label="Search content"
    onChange={handleSearch}
    className="flex-1 h-10 text-sm text-slate-500 outline-none bg-transparent autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:outline-none disabled:cursor-not-allowed disabled:text-slate-400"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    aria-label="Search icon"
    role="graphics-symbol"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
</div>


      {/*<!-- End Rounded search input --> */}
    </>
  )
}