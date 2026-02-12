import { RotateCcw } from 'lucide-react'

export default function Header({ onRestart }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-secondary-100 pt-safe-top">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
        {/* Left: Profile Section */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Circular Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md">
              AI
            </div>
          </div>

          {/* Name and Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-sm md:text-base font-semibold text-secondary-900 truncate">
              Assistant
            </h1>
            <p className="text-xs md:text-sm text-secondary-500 font-normal">
              AI Assistant
            </p>
          </div>
        </div>

        {/* Right: Restart Button */}
        <button
          onClick={onRestart}
          className="flex-shrink-0 ml-2 p-2.5 md:p-3 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-600 hover:text-primary-700 transition-all duration-200 touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95"
          aria-label="Restart chat"
          title="Restart Chat"
        >
          <RotateCcw size={20} className="md:w-5 md:h-5" strokeWidth={2.5} />
        </button>
      </div>
    </header>
  )
}
