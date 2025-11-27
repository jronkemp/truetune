// app/history/page.tsx
"use client"
import { MatchCard } from "@/components/MatchCard"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import {useSession} from "next-auth/react"
// import Link from "next/Link"


export default function EventOverviewPage() {
  const { data: session } = useSession()
  //const lastName = session?.user.lastName

  return (
    <div className="min-h-screen bg-white p-2 pb-24">
      {/* Header */}
      <h1 className="text-xl font-bold text-black mt-12 mb-6 px-2">Team Kempson</h1>

      {/* Start New Game Card */}
      {/* <div className="mb-6">
        <div className="bg-gray-200/40 rounded-xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-900" />
          </div>
          <div className="text-xl font-bold text-black">Start New Game</div>
        </div>
      </div> */}

      <h5 className="text-sm font-bold text-gray-500 p-1">Thursday, Nov 20</h5>
      {/* Match Cards */}
      <div className="space-y-6">
        {/* Match 1 - Loss */}
        <MatchCard
          team="U19 Boys - ECNL"
          opponent="ZYSA (Union FC)"
          time="5:30 - 7:00 PM"
          result="L  0 - 2"
          resultColor="bg-red-500/10"
          views={165}
          statusText="Preview Available"
          isLive={false}
        />

        {/* Match 2 - Win
        <MatchCard
          team="U19 Boys - ECNL"
          opponent="vs Opponent"
          result="W  2 - 1"
          resultColor="bg-green-500/10"
          views={295}
          statusText="Summary Available"
          isLive={false}
        /> */}

        {/* Match 3 - Live
        <MatchCard
          team="U19 Boys - ECNL"
          opponent="vs Opponent"
          result="L  0 - 2"
          resultColor="bg-red-500/10"
          views={180}
          isLive={true}
        />  */}
      </div>
    </div>
  )
}