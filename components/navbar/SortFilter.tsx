'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderBy } from '@/redux/slices/moviesSlice'
import { RootState } from '@/redux/store'

interface SortOption {
  label: string
  value: 'episode' | 'year' | 'rating'
}

export default function SortFilter(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const orderBy = useSelector((state: RootState) => state.movies.orderBy)

  const sortOptions: SortOption[] = [
    { value: 'episode', label: 'Episode' },
    { value: 'year', label: 'Year' },
    { value: 'rating', label: 'Rating' },
  ]

  const handleSort = (value: string) => {
    dispatch(setOrderBy(value))
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-dark px-4 py-2 bg-white rounded-md hover:bg-gray-300"
      >
        Sort by...
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-48 bg-gray-200 rounded-md shadow-lg p-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full text-left px-4 py-2 rounded-md ${orderBy === option.value
                ? 'bg-blue-500 text-white'
                : 'text-dark hover:bg-gray-300'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 