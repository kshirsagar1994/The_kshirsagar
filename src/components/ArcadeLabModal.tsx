import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy, Gamepad2 } from 'lucide-react';
import { playClickSound, playReleaseSound, playStickSound } from '../utils/sound';

interface ArcadeLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArcadeLabModal: React.FC<ArcadeLabModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1480);
  const [gameOver, setGameOver] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arcadeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Game state
  const gameStateRef = useRef({
    playerX: 150,
    speed: 5,
    obstacles: [] as Array<{ x: number; y: number; width: number; height: number; speed: number; color: string }>,
    roadLines: [] as Array<{ y: number }>,
    animationFrameId: 0,
    score: 0,
  });

  // Handle Miami Heatwave arcade audio
  useEffect(() => {
    if (isOpen && isPlaying && !musicMuted) {
      if (!arcadeAudioRef.current) {
        arcadeAudioRef.current = new Audio('/audio/sfx-arcade-miamiHeatwave-1305ed0f.mp3');
        arcadeAudioRef.current.loop = true;
        arcadeAudioRef.current.volume = 0.35;
      }
      arcadeAudioRef.current.play().catch(() => {});
    } else {
      if (arcadeAudioRef.current) {
        arcadeAudioRef.current.pause();
      }
    }
    return () => {
      if (arcadeAudioRef.current) {
        arcadeAudioRef.current.pause();
      }
    };
  }, [isOpen, isPlaying, musicMuted]);

  // Key controls
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      const state = gameStateRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        playStickSound();
        state.playerX = Math.max(30, state.playerX - 25);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        playStickSound();
        state.playerX = Math.min(270, state.playerX + 25);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, onClose]);

  // Game loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;
    state.playerX = 150;
    state.obstacles = [];
    state.roadLines = [
      { y: 0 }, { y: 60 }, { y: 120 }, { y: 180 }, { y: 240 }, { y: 300 }, { y: 360 }
    ];
    state.score = 0;
    setScore(0);
    setGameOver(false);

    let spawnTimer = 0;

    const loop = () => {
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road background & grid
      ctx.strokeStyle = '#2E2E2E';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 0, canvas.width - 40, canvas.height);

      // Road dividing stripes
      ctx.fillStyle = '#FF4D00';
      state.roadLines.forEach((line) => {
        line.y += state.speed;
        if (line.y > canvas.height) line.y = -20;
        ctx.fillRect(canvas.width / 2 - 2, line.y, 4, 30);
      });

      // Spawn obstacle
      spawnTimer++;
      if (spawnTimer % 45 === 0) {
        const lane = Math.floor(Math.random() * 3);
        const obstacleX = 40 + lane * 85;
        const colors = ['#FF4D00', '#00FF9B', '#FFCD1A'];
        state.obstacles.push({
          x: obstacleX,
          y: -40,
          width: 35,
          height: 45,
          speed: state.speed + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Draw player cyber vehicle
      ctx.fillStyle = '#E6E6E6';
      ctx.shadowColor = '#FF4D00';
      ctx.shadowBlur = 10;
      ctx.fillRect(state.playerX - 16, canvas.height - 70, 32, 45);

      // Player cockpit & neon tail lights
      ctx.fillStyle = '#FF4D00';
      ctx.fillRect(state.playerX - 10, canvas.height - 45, 20, 10);
      ctx.fillStyle = '#00FF9B';
      ctx.fillRect(state.playerX - 8, canvas.height - 65, 16, 12);
      ctx.shadowBlur = 0;

      // Update & draw obstacles
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.y += obs.speed;

        ctx.fillStyle = obs.color;
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(obs.x - obs.width / 2, obs.y, obs.width, obs.height);
        ctx.shadowBlur = 0;

        // Collision check
        const playerBox = {
          left: state.playerX - 14,
          right: state.playerX + 14,
          top: canvas.height - 68,
          bottom: canvas.height - 28,
        };
        const obsBox = {
          left: obs.x - obs.width / 2,
          right: obs.x + obs.width / 2,
          top: obs.y,
          bottom: obs.y + obs.height,
        };

        if (
          playerBox.left < obsBox.right &&
          playerBox.right > obsBox.left &&
          playerBox.top < obsBox.bottom &&
          playerBox.bottom > obsBox.top
        ) {
          // Crash!
          setGameOver(true);
          setIsPlaying(false);
          setHighScore((prev) => Math.max(prev, state.score));
          return;
        }

        // Passed obstacle -> score increase
        if (obs.y > canvas.height) {
          state.obstacles.splice(i, 1);
          state.score += 20;
          setScore(state.score);
        }
      }

      state.score += 1;
      setScore(state.score);
      state.speed = 5 + Math.min(8, Math.floor(state.score / 200));

      state.animationFrameId = requestAnimationFrame(loop);
    };

    state.animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(state.animationFrameId);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-[#000000] border-2 border-[#2E2E2E] shadow-2xl rounded-sm overflow-hidden flex flex-col"
        >
          {/* Top Marquee Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0A] border-b border-[#2E2E2E]">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-xs font-mono font-bold text-[#E6E6E6] tracking-wider">
                KSHIRSAGAR // LAB ARCADE 2K26
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMusicMuted(!musicMuted)}
                className="p-1 text-[#757575] hover:text-[#E6E6E6] transition-colors"
                title={musicMuted ? 'Unmute Miami Heatwave' : 'Mute Miami Heatwave'}
              >
                {musicMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00FF9B]" />}
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="p-1 text-[#757575] hover:text-[#FF4D00] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CRT Screen Area */}
          <div className="relative p-4 sm:p-6 bg-[#040404] crt-overlay flex flex-col items-center">
            {/* Score HUD */}
            <div className="w-full flex items-center justify-between font-mono text-xs mb-3 px-2">
              <div className="text-[#FF4D00] font-bold">
                SCORE: <span className="text-[#E6E6E6]">{String(score).padStart(5, '0')}</span>
              </div>
              <div className="flex items-center gap-1 text-[#FFCD1A]">
                <Trophy className="w-3 h-3" />
                <span>HI: {String(highScore).padStart(5, '0')}</span>
              </div>
            </div>

            {/* Canvas Screen */}
            <div className="relative border-2 border-[#2E2E2E] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-xs overflow-hidden">
              <canvas
                ref={canvasRef}
                width={320}
                height={380}
                className="block bg-black max-w-full"
              />

              {/* Start / Game Over Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center">
                  {gameOver ? (
                    <>
                      <div className="text-xl font-mono font-bold text-[#FF4D00] mb-1">
                        SYSTEM CRASH
                      </div>
                      <div className="text-xs font-mono text-[#C4C4C4] mb-4">
                        FINAL SCORE: {score}
                      </div>
                      <button
                        onClick={() => {
                          playClickSound();
                          setIsPlaying(true);
                        }}
                        className="px-6 py-2 bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase hover:bg-white transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>RETRY [INSERT COIN]</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-mono font-bold text-[#E6E6E6] mb-1">
                        MIAMI HEATWAVE 2K26
                      </div>
                      <div className="text-xs font-mono text-[#757575] mb-5 max-w-xs">
                        DODGE DATA PACKETS ON THE CYBER HIGHWAY. USE ARROW KEYS OR JOYSTICK BUTTONS.
                      </div>
                      <button
                        onClick={() => {
                          playClickSound();
                          setIsPlaying(true);
                        }}
                        className="px-6 py-2 bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,77,0,0.5)]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>START GAME</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Arcade Controls Deck */}
            <div className="w-full mt-4 pt-4 border-t border-[#2E2E2E]/60 flex items-center justify-between px-4">
              {/* Joystick controls */}
              <div className="flex items-center gap-2">
                <button
                  onMouseDown={() => {
                    playStickSound();
                    gameStateRef.current.playerX = Math.max(30, gameStateRef.current.playerX - 25);
                  }}
                  className="w-10 h-10 border border-[#757575]/40 hover:border-[#FF4D00] bg-[#111] hover:bg-[#FF4D00]/20 text-xs font-mono font-bold text-[#E6E6E6] rounded-xs active:scale-95 transition-all"
                >
                  ◀
                </button>
                <button
                  onMouseDown={() => {
                    playStickSound();
                    gameStateRef.current.playerX = Math.min(270, gameStateRef.current.playerX + 25);
                  }}
                  className="w-10 h-10 border border-[#757575]/40 hover:border-[#FF4D00] bg-[#111] hover:bg-[#FF4D00]/20 text-xs font-mono font-bold text-[#E6E6E6] rounded-xs active:scale-95 transition-all"
                >
                  ▶
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onMouseDown={() => {
                    playClickSound();
                  }}
                  onMouseUp={() => playReleaseSound()}
                  className="w-8 h-8 rounded-full bg-[#FF4D00] shadow-[0_0_8px_rgba(255,77,0,0.4)] active:scale-90 transition-transform font-mono text-[10px] font-bold text-black flex items-center justify-center"
                >
                  A
                </button>
                <button
                  onMouseDown={() => {
                    playClickSound();
                  }}
                  onMouseUp={() => playReleaseSound()}
                  className="w-8 h-8 rounded-full bg-[#00FF9B] shadow-[0_0_8px_rgba(0,255,155,0.4)] active:scale-90 transition-transform font-mono text-[10px] font-bold text-black flex items-center justify-center"
                >
                  B
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
