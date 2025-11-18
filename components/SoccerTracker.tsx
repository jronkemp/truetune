'use client';

import { useState, useEffect, useRef } from "react";
import { PlayerCard } from "./PlayerCard";
import { GameClock } from "./GameClock";

export interface PlayerStats {
  id: string;
  name: string;
  goals: number;
  assists: number;
  oppCreated: number;
  possErrors: number;
  timeOnField: number;
  shots: number;
}

interface GameState {
  players: PlayerStats[];
  substitutes: PlayerStats[];
  gameTime: number;
  isRunning: boolean;
  possession: "gain" | "loss" | null;
  hasPossession: boolean;
  possessionTime: number;
  currentPossessionState: "gain" | "loss";
  oppGoals: number;
}

const initialPlayers: PlayerStats[] = [
  { id: "1", name: "Ethan R.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "2", name: "Chris B.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "3", name: "Jeffery", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "4", name: "Levi T.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "5", name: "Vincent", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "6", name: "Rocco D.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "7", name: "Tobias W.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "8", name: "Nate K.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "9", name: "Ross W.", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "10", name: "Jeremiah", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
  { id: "11", name: "Cademon", goals: 0, assists: 0, oppCreated: 0, possErrors: 0, timeOnField: 0, shots: 0 },
];

export function SoccerTracker() {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("soccerTrackerState");
      if (saved) {
        const parsedState = JSON.parse(saved);
        return {
          ...parsedState,
          substitutes: parsedState.substitutes || [],
        };
      }
    }
    return {
      players: initialPlayers,
      substitutes: [],
      gameTime: 0,
      isRunning: false,
      possession: null,
      hasPossession: true,
      possessionTime: 0,
      currentPossessionState: "gain",
      oppGoals: 0,
    };
  });

  const timerRef = useRef<number | null>(null);

  // Auto-save
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("soccerTrackerState", JSON.stringify(gameState));
    }
  }, [gameState]);

  // Timer
  useEffect(() => {
    if (gameState.isRunning) {
      timerRef.current = window.setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          gameTime: prev.gameTime + 1,
          possessionTime: prev.hasPossession ? prev.possessionTime + 1 : prev.possessionTime,
          players: prev.players.map((p) => ({
            ...p,
            timeOnField: p.timeOnField + 1,
          })),
        }));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.isRunning]);

  const toggleTimer = () => {
    setGameState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetGame = () => {
    if (confirm("Reset all stats and timer?")) {
      setGameState({
        players: initialPlayers,
        substitutes: [],
        gameTime: 0,
        isRunning: false,
        possession: null,
        hasPossession: true,
        possessionTime: 0,
        currentPossessionState: "gain",
        oppGoals: 0,
      });
    }
  };

  const finishGame = () => {
    if (confirm("Finish game and reset all stats?")) {
      resetGame();
    }
  };

  const updatePlayerStat = (
    playerId: string,
    stat: keyof Omit<PlayerStats, "id" | "name" | "timeOnField">,
    delta: number
  ) => {
    setGameState((prev) => {
      const newState = {
        ...prev,
        players: prev.players.map((p) =>
          p.id === playerId ? { ...p, [stat]: Math.max(0, p[stat] + delta) } : p
        ),
      };
      if (stat === "possErrors" && delta > 0) {
        newState.hasPossession = false;
        newState.currentPossessionState = "loss";
      }
      return newState;
    });
  };

  const handleOppGoal = () => {
    setGameState((prev) => ({ ...prev, oppGoals: prev.oppGoals + 1 }));
  };

  const updatePlayerName = (playerId: string, newName: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, name: newName } : p
      ),
    }));
  };

  const handlePossession = (type: "gain" | "loss") => {
    setGameState((prev) => ({
      ...prev,
      possession: type,
      hasPossession: type === "gain",
      currentPossessionState: type,
    }));
    setTimeout(() => {
      setGameState((prev) => ({ ...prev, possession: null }));
    }, 1000);
  };

  const addSubstitute = (name: string) => {
    const newSub: PlayerStats = {
      id: Date.now().toString(),
      name,
      goals: 0,
      assists: 0,
      oppCreated: 0,
      possErrors: 0,
      timeOnField: 0,
      shots: 0,
    };
    setGameState((prev) => ({
      ...prev,
      substitutes: [...prev.substitutes, newSub],
    }));
  };

  const substitutePlayer = (playerIndex: number, subId: string) => {
    setGameState((prev) => {
      const newPlayers = [...prev.players];
      const newSubstitutes = [...prev.substitutes];
      const subIndex = newSubstitutes.findIndex((s) => s.id === subId);
      if (subIndex === -1) return prev;

      const playerOut = newPlayers[playerIndex];
      const subIn = newSubstitutes[subIndex];

      newPlayers[playerIndex] = subIn;
      newSubstitutes[subIndex] = playerOut;

      return { ...prev, players: newPlayers, substitutes: newSubstitutes };
    });
  };

  const calculateTeamStats = () => {
    const totalPossTime = gameState.possessionTime;
    const totalGameTime = gameState.gameTime || 1;
    const possPercent = Math.round((totalPossTime / totalGameTime) * 100);

    const totalPossErrors = gameState.players.reduce((sum, p) => sum + p.possErrors, 0);
    const totalPositive = gameState.players.reduce((sum, p) => sum + p.goals + p.assists + p.oppCreated, 0);
    const totalResults = totalPositive + totalPossErrors;
    const avgEfficiency = totalResults > 0 ? Math.round((totalPositive / totalResults) * 100) : 0;

    const teamGoals = gameState.players.reduce((sum, p) => sum + p.goals, 0);
    const totalOppCreated = gameState.players.reduce((sum, p) => sum + p.oppCreated, 0);
    const totalShots = gameState.players.reduce((sum, p) => sum + p.shots, 0);

    return {
      possPercent,
      avgEfficiency,
      possErrors: totalPossErrors,
      teamGoals,
      totalOppCreated,
      totalShots,
    };
  };

  const teamStats = calculateTeamStats();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md">
        <GameClock
          gameTime={gameState.gameTime}
          isRunning={gameState.isRunning}
          onToggle={toggleTimer}
          onReset={resetGame}
          onPossession={handlePossession}
          onFinishGame={finishGame}
          possession={gameState.possession}
          currentPossessionState={gameState.currentPossessionState}
          possPercent={teamStats.possPercent}
          possErrors={teamStats.possErrors}
          avgEfficiency={teamStats.avgEfficiency}
          teamGoals={teamStats.teamGoals}
          oppGoals={gameState.oppGoals}
          onOppGoal={handleOppGoal}
          totalOppCreated={teamStats.totalOppCreated}
          totalShots={teamStats.totalShots}
        />

        <div className="grid grid-cols-2 gap-1.5 p-1.5">
          {gameState.players.map((player, index) => (
            <PlayerCard
              key={player.id}
              player={player}
              gameTime={gameState.gameTime}
              onUpdateStat={updatePlayerStat}
              onUpdateName={updatePlayerName}
              substitutes={gameState.substitutes}
              onSubstitute={(subId) => substitutePlayer(index, subId)}
            />
          ))}
        </div>

        <div className="my-4 px-4">
          <div className="h-px bg-gray-300" />
        </div>

        <div className="px-4 pb-4">
          <SubstitutesSection
            substitutes={gameState.substitutes}
            onAddSubstitute={addSubstitute}
          />
        </div>
      </div>
    </div>
  );
}

// SubstitutesSection (unchanged)
interface SubstitutesSectionProps {
  substitutes: PlayerStats[];
  onAddSubstitute: (name: string) => void;
}

function SubstitutesSection({ substitutes, onAddSubstitute }: SubstitutesSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAddClick = () => {
    setIsAdding(true);
    setNewSubName("");
  };

  const handleSave = () => {
    const trimmedName = newSubName.trim();
    if (trimmedName) {
      onAddSubstitute(trimmedName);
      setNewSubName("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewSubName("");
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") handleCancel();
  };

  const calculateEfficiency = (sub: PlayerStats) => {
    const positive = sub.goals + sub.assists + sub.oppCreated;
    const total = positive + sub.possErrors;
    return total > 0 ? Math.round((positive / total) * 100) : 0;
  };

  return (
    <div>
      <h3 className="text-sm mb-2 text-gray-600">Substitutes</h3>
      
      {substitutes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-2">
          {substitutes.map((sub) => (
            <div key={sub.id} className="bg-gray-100 rounded px-3 py-2 text-sm flex justify-between items-center">
              <span>{sub.name}</span>
              <span className="text-gray-600">{calculateEfficiency(sub)}%</span>
            </div>
          ))}
        </div>
      )}

      {isAdding ? (
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newSubName}
            onChange={(e) => setNewSubName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            placeholder="Player name"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-blue-500"
            maxLength={20}
          />
        </div>
      ) : (
        <button
          onClick={handleAddClick}
          className="w-full py-2 text-sm border-2 border-dashed border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          + Add Substitute
        </button>
      )}
    </div>
  );
}