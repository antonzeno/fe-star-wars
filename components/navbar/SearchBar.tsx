export default function SearchBar() {
  return (
    <div className="flex-1 ml-4">
      <div className="relative flex items-center">
        <div className="absolute left-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Type to search..."
          className="w-full pl-10 pr-4 py-2 rounded-md text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
  )
} 