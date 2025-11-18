'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp, CirclePause, CirclePlay } from "lucide-react";

interface GameClockProps {
  gameTime: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onPossession: (type: "gain" | "loss") => void;
  onFinishGame: () => void;
  possession: "gain" | "loss" | null;
  currentPossessionState: "gain" | "loss";
  possPercent: number;
  possErrors: number;
  avgEfficiency: number;
  teamGoals: number;
  oppGoals: number;
  onOppGoal: () => void;
  totalOppCreated: number;
  totalShots: number;
}

export function GameClock({
  gameTime,
  isRunning,
  onToggle,
  onReset,
  onPossession,
  onFinishGame,
  possession,
  currentPossessionState,
  possPercent,
  possErrors,
  avgEfficiency,
  teamGoals,
  oppGoals,
  onOppGoal,
  totalOppCreated,
  totalShots,
}: GameClockProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative m-1.5" style={{ height: isExpanded ? "146px" : "73px" }}>
      {/* Main top section */}
      <div className="absolute bg-[#eaeaea] left-0 right-0 rounded-[5px] h-[52px] top-[2px]">
        {/* Score */}
        <div className="absolute left-[18px] top-[10px]">
          <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
            {teamGoals} - {oppGoals}
          </p>
          <button
            onClick={onOppGoal}
            className="bg-[#ff2929] h-[19px] rounded-[5px] w-[65px] hover:opacity-80 transition-opacity mt-1"
          >
            <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[12px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
              Opp Goal
            </p>
          </button>
        </div>

        {/* Timer */}
        <div className="absolute left-[173px] top-[9px] flex flex-col items-center gap-1">
          <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre translate-x-[12.5px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
            {formatTime(gameTime)}
          </p>
          <button
            onClick={onToggle}
            className="size-[15px] cursor-pointer hover:opacity-70 translate-x-[12.5px]"
            aria-label={isRunning ? "Pause" : "Play"}
          >
            {isRunning ? ( <CirclePause size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            ) : ( <CirclePlay size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            )}
          </button>
        </div>

        {/* Possession buttons or Finish Game */}
        <div className="absolute left-[300px] top-[18px] flex gap-[3px]">
          {isRunning ? (
            <>
              <button
                onClick={() => onPossession("loss")}
                className={`h-[19px] rounded-[5px] w-[33px] transition-opacity ${
                  currentPossessionState === "loss" ? "bg-[#ff2929]" : "bg-[#ff2929] opacity-40"
                } hover:opacity-70`}
              >
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[12px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  Loss
                </p>
              </button>
              <button
                onClick={() => onPossession("gain")}
                className={`h-[19px] rounded-[5px] w-[33px] transition-opacity ${
                  currentPossessionState === "gain" ? "bg-[#22c55e]" : "bg-[#22c55e] opacity-40"
                } hover:opacity-70`}
              >
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[12px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  Gain
                </p>
              </button>
            </>
          ) : (
            <button
              onClick={onFinishGame}
              className="px-3 py-1 bg-blue-500 text-white rounded text-[12px] hover:bg-blue-600 transition-colors"
            >
              Finish Game
            </button>
          )}
        </div>
      </div>

      {/* Expandable stats section */}
      <div 
        className="absolute bg-[#c9c9c9] left-0 right-0 rounded-[5px] top-[54px] transition-all duration-200"
        style={{ height: isExpanded ? "92px" : "19px" }}
      >
        {/* Stat Report label with toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-1/2 -translate-x-1/2 top-[5px] flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[#797979] text-[8px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
            Stat Report
          </p>
          {isExpanded ? (
            <ChevronUp className="size-3 text-[#797979]" />
          ) : (
            <ChevronDown className="size-3 text-[#797979]" />
          )}
        </button>

        {/* Stats - only shown when expanded */}
        {isExpanded && (
          <>
            {/* First row of stats */}
            <div className="absolute left-[77px] top-[36px]">
              {/* Poss % */}
              <div className="absolute left-[18px]">
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  {possPercent}%
                </p>
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[#797979] text-[10px] text-center text-nowrap whitespace-pre mt-[2px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  Poss %
                </p>
              </div>

              {/* PE# */}
              <div className="absolute left-[65px]">
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  {possErrors}
                </p>
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[#797979] text-[10px] text-center text-nowrap whitespace-pre mt-[2px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  PE#
                </p>
              </div>

              {/* Avg Eff */}
              <div className="absolute left-[115px]">
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  {avgEfficiency}%
                </p>
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[#797979] text-[10px] text-center text-nowrap whitespace-pre mt-[2px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  Avg Eff
                </p>
              </div>
            </div>

            {/* Second row of stats */}
            <div className="absolute left-[229px] top-[36px]">
              {/* Shots T */}
              <div className="absolute left-[17px]">
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  {totalShots}
                </p>
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[#797979] text-[10px] text-center text-nowrap whitespace-pre mt-[2px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  Shots T
                </p>
              </div>

              {/* Opp C */}
              <div className="absolute left-[64px]">
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[14px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  {totalOppCreated}
                </p>
                <p className="font-['Lao_Sans_Pro:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[normal] text-[#797979] text-[10px] text-center text-nowrap whitespace-pre mt-[2px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                  Opp C
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
