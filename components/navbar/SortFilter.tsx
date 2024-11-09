'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SortOption {
  label: string
  value: 'episode' | 'year' | 'rating'
}

export default function SortFilter(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const sortOptions: SortOption[] = [
    { value: 'episode', label: 'Episode' },
    { value: 'year', label: 'Year' },
    { value: 'rating', label: 'Rating' },
  ]

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('orderBy', value)
    router.push(`?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-dark px-4 py-2 bg-white rounded-md hover:bg-gray-300"
      >
        {`${sortOptions.find(option => option.value === searchParams.get('orderBy'))?.label || 'Sort by...'}`}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-48 bg-gray-200 rounded-md shadow-lg p-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className="w-full text-left px-4 py-2 text-dark hover:bg-gray-300 rounded-md"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 