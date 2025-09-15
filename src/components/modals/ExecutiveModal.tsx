"use client"

import type React from "react"

import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
  className?: string
}

export function ExecutiveModal({ isOpen, onClose, title, children, className }: ModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative h-fit max-h-[95%] overflow-auto bg-white rounded-lg shadow-xl w-[95%] sm:w-[500px] mx-4 p-6",
          "animate-in slide-in-from-top-4 duration-300 ease-out",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-4 data-[state=closed]:fade-out data-[state=closed]:duration-200",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className={`${title==='Delete Employee'?"dangerText":"text-h4"}`}>{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 group-hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {children && <div className="">{children}</div>}
      </div>
    </div>
  )
}
