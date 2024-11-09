'use client'

import SortFilter from './SortFilter'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex items-center">
        <SortFilter />
        <SearchBar />
      </div>
    </nav>
  )
} 