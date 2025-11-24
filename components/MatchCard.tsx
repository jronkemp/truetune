// components/MatchCard.tsx
import { Sparkle } from "lucide-react"

interface MatchCardProps {
  team: string
  opponent: string
  result: string
  resultColor: string
  views?: number
  statusText?: string
  isLive?: boolean
}

export function MatchCard({
  team,
  opponent,
  result,
  resultColor,
  views,
  statusText,
  isLive,
}: MatchCardProps) {
  return (
    <div className="bg-gray-200/40 rounded-xl p-4 relative">
      {/* Team & Opponent */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-black opacity-90">{team}</h3>
          <p className="text-base font-bold text-gray-700 opacity-90">{opponent}</p>
        </div>
        <div className={`${resultColor} px-3 py-1 rounded-full`}>
          <span className="text-base font-bold text-gray-700 opacity-90">{result}</span>
        </div>
      </div>

      {/* Status Badge */}
      {/* <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 ${isLive ? 'bg-white' : 'bg-white/50'} rounded-full flex items-center justify-center`}>
          <span className="text-sm font-bold text-gray-700 opacity-90">{status}</span>
        </div>
      </div> */}

      {/* Footer: Views + Status */}
      {views !== undefined && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
              <Sparkle className="w-4 h-4 text-gray-800" />
            </div>
            <span className="text-base font-bold text-gray-700 opacity-90">{views}</span>
          </div>
          {statusText && (
            <span className="text-base font-bold text-gray-700 opacity-90">{statusText}</span>
          )}
        </div>
      )}
    </div>
  )
}