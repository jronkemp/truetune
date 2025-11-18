'use client';

import { useState, useRef, useEffect } from "react";
import {X, Blend, Crown, TrendingUp, Crosshair, CircleAlert} from "lucide-react"
import { PlayerStats } from "./SoccerTracker";

interface PlayerCardProps {
  player: PlayerStats;
  gameTime: number;
  onUpdateStat: (
    playerId: string,
    stat: keyof Omit<PlayerStats, "id" | "name" | "timeOnField">,
    delta: number
  ) => void;
  onUpdateName: (playerId: string, newName: string) => void;
  substitutes?: PlayerStats[];
  onSubstitute?: (subId: string) => void;
}

export function PlayerCard({ player, gameTime, onUpdateStat, onUpdateName, substitutes, onSubstitute }: PlayerCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(player.name);
  const [isGoalsSlideOutOpen, setIsGoalsSlideOutOpen] = useState(false);
  const [isOppCreatedSlideOutOpen, setIsOppCreatedSlideOutOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingName]);

  const handleNameClick = () => {
    setIsEditingName(true);
    setEditedName(player.name);
  };

  const handleNameSave = () => {
    const trimmedName = editedName.trim();
    if (trimmedName && trimmedName !== player.name) {
      onUpdateName(player.id, trimmedName);
    } else {
      setEditedName(player.name);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      setEditedName(player.name);
      setIsEditingName(false);
    }
  };
  const positiveResults = player.goals + player.assists + player.oppCreated;
  const totalResults = positiveResults + player.possErrors;
  const efficiencyPercent = totalResults > 0 ? Math.round((positiveResults / totalResults) * 100) : 0;

  // Calculate circle colors based on stat values
  const getCircleColor = (stat: keyof Pick<PlayerStats, "goals" | "assists" | "oppCreated" | "possErrors">, value: number) => {
    if (value === 0) return "#D9D9D9";
    
    switch (stat) {
      case "assists":
        return "#BFDDBF"; // Green
      case "oppCreated":
        return "#DDD4BF"; // Tan/Yellow
      case "possErrors":
        return "#DDC5BF"; // Red/Pink
      default:
        return "#D9D9D9"; // Gray for goals
    }
  };

  const iconComponents = {
    goals: Crown,
    assists: Blend,
    oppCreated: TrendingUp,
    possErrors: CircleAlert,
    } as const;

  const StatColumn = ({
    icon,
    value,
    stat,
  }: {
    icon: "goals" | "assists" | "oppCreated" | "possErrors";
    value: number;
    stat: keyof Omit<PlayerStats, "id" | "name" | "timeOnField">;
  }) => {

    const IconComponent = iconComponents[icon];  // This is the actual component

    const circleColor = getCircleColor(icon, value);

    const handleClick = () => {
      if (icon === "goals") {
        setIsGoalsSlideOutOpen(true);
      } else if (icon === "oppCreated") {
        setIsOppCreatedSlideOutOpen(true);
      } else {
        onUpdateStat(player.id, stat, 1);
      }
    };

    return (
      <div className="relative">
        <div className="bg-[#e4e4e4] h-[45px] w-[36px] rounded-[5px] relative">
          {/* Value - non-clickable display */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-black text-center">
            {value}
          </div>

          {/* Icon button - clickable area */}
          <button
            onClick={handleClick}
            onContextMenu={(e) => {
              e.preventDefault();
              if (value > 0 && icon !== "goals" && icon !== "oppCreated") {
                onUpdateStat(player.id, stat, -1);
              }
            }}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label={`Update ${stat}`}
          >
            {/* Circle background */}
            <div 
              className="size-[24px] rounded-full"
              style={{ backgroundColor: circleColor }}
            />
            
            {/* Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[16px]">
              <IconComponent size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            </div>
          </button>
        </div>

        {/* Goals Slide-out */}
        {icon === "goals" && isGoalsSlideOutOpen && (
          <div className="absolute left-0 top-0 h-[45px] w-[108px] bg-[#E4E4E4] rounded-r-2xl rounded-bl-2xl" >
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsGoalsSlideOutOpen(false);
              }}
              className="absolute left-[10px] top-[14.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
                <X size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            </button>

            {/* Assist button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStat(player.id, "assists", 1);
                setIsGoalsSlideOutOpen(false);
              }}
              className="absolute left-[54px] top-[14.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
                <Blend size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            </button>

            {/* Goal button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStat(player.id, "goals", 1);
                setIsGoalsSlideOutOpen(false);
              }}
              className="absolute left-[96px] top-[10.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
                <Crown size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            </button>
          </div>
        )}

        {/* Opportunities Created Slide-out */}
        {icon === "oppCreated" && isOppCreatedSlideOutOpen && (
          <div className="absolute left-0 top-0 h-[45px] w-[108px] bg-[#E4E4E4] rounded-r-2xl rounded-bl-2xl" >
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOppCreatedSlideOutOpen(false);
              }}
              className="absolute left-[10px] top-[14.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
              <X size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
            </button>

            {/* Target icon button (Shot on Target) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStat(player.id, "shots", 1);
                setIsOppCreatedSlideOutOpen(false);
              }}
              className="absolute left-[38px] top-[10.5px] size-[24px] cursor-pointer hover:opacity-70"
            >
              <div className="absolute inset-0 rounded-full bg-[#D9D9D9]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[16px]">
                <Crosshair size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
              </div>
            </button>

            {/* Flame icon button (Shot) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStat(player.id, "oppCreated", 1);
                setIsOppCreatedSlideOutOpen(false);
              }}
              className="absolute left-[68px] top-[10.5px] size-[24px] cursor-pointer hover:opacity-70"
            >
              <div className="absolute inset-0 rounded-full bg-[#D9D9D9]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[16px]">
                <TrendingUp size={15} strokeWidth={2.5} className="text-[#1C1B1F]" />
              </div>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#eaeaea] rounded-[5px] relative h-[98px] w-full">
      {/* Player Name */}
      {isEditingName ? (
        <input
          ref={inputRef}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleNameSave}
          onKeyDown={handleKeyDown}
          className="absolute left-[15px] top-[5px] text-[14px] text-black bg-white border border-black/20 rounded px-1 outline-none"
          maxLength={20}
        />
      ) : (
        <p 
          onClick={handleNameClick}
          className="absolute left-[15px] top-[5px] text-[14px] text-black whitespace-nowrap cursor-pointer hover:underline"
        >
          {player.name}
        </p>
      )}

      {/* Drag Handle Icon / Substitute Button
      <button
        onClick={() => substitutes && substitutes.length > 0 && setIsSubMenuOpen(!isSubMenuOpen)}
        className={`absolute h-[15px] left-[15px] top-[24px] w-[14.21px] ${substitutes && substitutes.length > 0 ? 'cursor-pointer hover:opacity-70' : 'cursor-grab active:cursor-grabbing'}`}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <mask height="15" id="mask_drag" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="15" x="0" y="0">
            <rect fill="#D9D9D9" height="15" width="14.2105" />
          </mask>
          <g mask="url(#mask_drag)">
            <path d={svgPaths.p3921bc60} fill="#1C1B1F" />
          </g>
        </svg>
      </button> */}

      {/* Substitution Menu */}
      {isSubMenuOpen && substitutes && substitutes.length > 0 && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsSubMenuOpen(false)}
          />
          <div className="absolute left-[15px] top-[42px] bg-white border border-gray-300 rounded shadow-lg z-30 min-w-[120px]">
            <div className="py-1">
              {substitutes.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSubstitute?.(sub.id);
                    setIsSubMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Stat Columns */}
      <div className="absolute bottom-[4px] left-[10px] right-[11px] flex justify-between">
        <StatColumn icon="goals" value={player.goals} stat="goals" />
        <StatColumn icon="oppCreated" value={player.oppCreated} stat="oppCreated" />
        <StatColumn icon="possErrors" value={player.possErrors} stat="possErrors" />
      </div>

      {/* Efficiency % */}
      <div className="absolute right-[28px] top-[5px] text-center">
        <p className="text-[14px] text-black">
          {efficiencyPercent}%
        </p>
        <p className="text-[#797979] text-[10px]">
          Eff %
        </p>
      </div>
    </div>
  );
}
