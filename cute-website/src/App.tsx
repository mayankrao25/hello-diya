import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Music, X, Mail, Sparkles } from 'lucide-react';
import Music1 from './music/music1.mp3';
import Music2 from './music/music2.mp3'
import Music3 from './music/music3.mp3'

import MusicCover1 from './musiccover/music1.jpg';
import MusicCover2 from './musiccover/music2.jpg';
import MusicCover3 from './musiccover/music3.jpg';

import ScrollReveal from './components/ScrollReveal';
import HeartCatcherGame from './components/HeartCatcherGame';
import EnvelopeGif from './images/intro2.gif';
// import HelloGif from './images/hellokitty.gif'
// Remove PaperAirplaneImg import
import { textConfig } from './textConfig';
import SplashBackground from './components/SplashBackground';

interface NoteProps {
  note: { text: string; color: string; borderColor: string };
  index: number;
}

const RotatableNote: React.FC<NoteProps> = memo(({ note, index }) => {
  const [isRotated, setIsRotated] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{
        perspective: "1000px",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
        willChange: 'transform' // Add GPU acceleration
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Only animate once, with margin
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={() => setIsRotated(!isRotated)}
    >
      <motion.div
        className={`relative w-full h-full min-h-[140px] rounded-2xl shadow-xl border-2 ${note.borderColor}`}
        animate={{ rotateY: isRotated ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          willChange: 'transform'
        }}
      >
        {/* Front Face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${note.color} p-6 rounded-2xl flex flex-col items-center justify-center`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <p className="font-comic text-gray-800 text-center font-semibold leading-relaxed text-lg">
            {note.text}
          </p>

          {/* Tape effect */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200/70 rounded-sm shadow-sm border border-yellow-300/50"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)" }}
          />

          {/* Click hint */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 opacity-60">
            Click me!
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl flex flex-col items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <Heart
            className="w-8 h-8 text-red-500 mx-auto mb-2"
            fill="currentColor"
          />
          <p className="font-comic text-gray-700 font-medium">
            Made with love 💕
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
})


// Optimized Background Animation Component
const BackgroundAnimation = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {[...Array(3)].map((_, i) => ( // Reduced from 10 to 3
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink-100 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)' // Force GPU layer
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            scale: [0, 0.8, 0], // Reduced scale
            opacity: [0, 0.2, 0], // Reduced opacity
          }}
          transition={{
            duration: 10 + Math.random() * 5, // Much slower
            repeat: Infinity,
            delay: Math.random() * 10 + 3 // Much longer delays
          }}
        />
      ))}
    </motion.div>
  );
});

// Optimized EnvelopeAnimation component
const EnvelopeAnimation = memo(({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  // Remove airplane-related state
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Remove airplane timer effect
  useEffect(() => {
    // Show welcome message immediately
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000); // Show for 3 seconds then hide

    return () => clearTimeout(timer);
  }, []);

  // Remove handleAirplaneComplete function
  const handleEnvelopeClick = useCallback(() => {
    if (!isOpen) { // Remove airplaneCompleted condition
      setIsOpen(true);
      setTimeout(() => setShowLetter(true), 600);
      setTimeout(() => onOpenComplete(), 2000);
    }
  }, [isOpen, onOpenComplete]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-rose-50 to-pink-100 relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // <-- FIX: Added exit animation for smooth transition
      transition={{ duration: 0.6 }}
    >
      <SplashBackground />
      <BackgroundAnimation />
      <AnimatePresence mode="wait">
        {showEnvelope && (
          <motion.div
            className="cursor-pointer relative z-20"
            onClick={handleEnvelopeClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          >
            {/* Enhanced floating hearts above envelope */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute -top-32 sm:-top-36 md:-top-40 left-1/2 transform -translate-x-1/2 w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 z-30"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: [-15, 5, -15], opacity: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <img
                  src={EnvelopeGif}
                  alt="Animated hearts"
                  className="w-full h-full object-contain"
                  style={{ pointerEvents: 'none' }}
                />
              </motion.div>
            )}

            {/* Enhanced envelope with better design */}
            <motion.div
              className="relative w-80 h-56 sm:w-[360px] sm:h-[260px] md:w-[420px] md:h-[280px] bg-gradient-to-br from-white via-rose-50 to-pink-100 border-3 border-rose-300 rounded-2xl shadow-2xl overflow-hidden"
              animate={isOpen ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 50%, #fce7f3 100%)",
                boxShadow: "0 25px 50px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
              }}
            >
              {/* Enhanced envelope flap with gradient and texture */}
              <motion.div
                className="absolute top-0 left-0 right-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[112px] sm:border-l-[180px] sm:border-r-[180px] sm:border-t-[130px] md:border-l-[210px] md:border-r-[210px] md:border-t-[140px] border-l-transparent border-r-transparent"
                initial={{ rotateX: 0 }}
                animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  transformOrigin: 'top',
                  borderTopColor: "#f43f5e",
                  filter: "drop-shadow(0 4px 6px rgba(244, 63, 94, 0.3))"
                }}
              />

              {/* Decorative wax seal */}
              <motion.div
                className="absolute top-[45%] left-1/2 -translate-x-1/2 bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 rounded-full p-3 md:p-4 shadow-xl border-2 border-white"
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.15, rotate: 5 }}
                style={{
                  background: "radial-gradient(circle at 30% 30%, #fb7185, #ec4899, #e11d48)",
                  boxShadow: "0 8px 16px rgba(236, 72, 153, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                }}
              >
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" />
              </motion.div>

              {/* Envelope texture lines */}
              <div className="absolute inset-4 pointer-events-none">
                <div className="absolute top-6 left-4 right-4 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent opacity-60" />
                <div className="absolute top-12 left-8 right-8 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent opacity-40" />
                <div className="absolute bottom-8 left-6 right-6 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent opacity-50" />
              </div>

              {/* Enhanced letter preview */}
              {showLetter && (
                <motion.div
                  className="absolute inset-x-3 md:inset-x-5 top-3 h-[200px] md:h-[220px] bg-gradient-to-br from-white via-rose-25 to-pink-50 rounded-xl shadow-2xl p-4 md:p-5 text-center border-2 border-rose-100"
                  initial={{ y: 250, opacity: 0, scale: 0.8, rotateX: 45 }}
                  animate={{ y: -25, opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut', type: "spring", bounce: 0.3 }}
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #fef7f7 50%, #fdf2f8 100%)",
                    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
                  }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-500 mr-2" fill="currentColor" />
                    <p className="text-sm md:text-base text-gray-700 font-comic font-semibold">{textConfig.ui.envelopePreview}</p>
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-500 ml-2" fill="currentColor" />
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced hint text */}
            {!isOpen && (
              <motion.div
                className="text-rose-700 text-sm md:text-lg font-medium text-center mt-6 md:mt-8 bg-white/90 backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg border-2 border-rose-200 max-w-xs md:max-w-none"
                initial={{ opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1, y: 0 } : {
                  opacity: [0, 1, 0.8, 1],
                  y: [10, 0, -2, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={shouldReduceMotion ? { duration: 0.5 } : {
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,242,242,0.95) 100%)",
                  boxShadow: "0 8px 16px rgba(236, 72, 153, 0.2)"
                }}
              >
                ✨ {textConfig.ui.envelopeHint} ✨
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Optimized Floating Hearts Component
const FloatingHearts = memo(({ hearts, onRemove }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {hearts.slice(-10).map((heart) => ( // Limit to 10 hearts max
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none z-40"
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={shouldReduceMotion ?
            { scale: [1, 0], y: -50, opacity: [1, 0] } :
            { scale: [1, 1.5, 0], y: -100, opacity: [1, 0.8, 0], rotate: [0, 180, 360] }
          }
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: shouldReduceMotion ? 1 : 2, ease: "easeOut" }}
          style={{ left: heart.x - 10, top: heart.y - 10 }}
          onAnimationComplete={() => onRemove(heart.id)}
        >
          <Heart className={`${heart.color} w-6 h-6`} fill="currentColor" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
});

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [initialLetterOpened, setInitialLetterOpened] = useState(false);
  const [hasViewedInitialLetter, setHasViewedInitialLetter] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [showGame, setShowGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // FIX: Refs for playlist scrolling
  const playlistRef = useRef(null);
  const songRefs = useRef([]);

  // Add cleanup effect RIGHT HERE inside the App function
  useEffect(() => {
    return () => {
      if (currentSong && currentSong.audio) {
        currentSong.audio.pause();
        currentSong.audio.onended = null;
        currentSong.audio.ontimeupdate = null;
        currentSong.audio.onloadedmetadata = null;
      }
    };
  }, [currentSong]);

  // Memoized playlist data
  const playlist = useMemo(() => [
    { title: "Tu Chale", info: "🤌", src: Music1 },
    { title: "haye mera dil", info: "😁", src: Music2 },
    { title: "Tere sang yaara", info: "🙂", src: Music3 },
  ], []);

  // Throttle heart addition to prevent too many hearts at once
  const lastHeartTime = useRef(0);

  useEffect(() => {
    if (initialLetterOpened && !showContent) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    }
  }, [initialLetterOpened, showContent]);

  const toggleMusic = useCallback(() => {
    const audio = document.getElementById('bgMusic');
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Optimized heart adding with throttling
  const addHeart = useCallback((e) => {
    const now = Date.now();
    if (now - lastHeartTime.current < 100) return; // Throttle to 100ms
    lastHeartTime.current = now;

    const newHeart = {
      id: now,
      x: e.clientX,
      y: e.clientY,
      color: ['text-pink-500', 'text-red-400', 'text-purple-500'][Math.floor(Math.random() * 3)]
    };
    setHearts(prev => [...prev.slice(-5), newHeart]); // Reduced to 5 hearts max
  }, []);

  const removeHeart = useCallback((heartId) => {
    setHearts(prev => prev.filter(h => h.id !== heartId));
  }, []);

  // FIX: Updated playSong function for pre-play UI and smooth scrolling
  const playSong = useCallback((song, index) => {
    // Stop any currently playing song
    if (currentSong && currentSong.audio) {
      currentSong.audio.pause();
      currentSong.audio.currentTime = 0;
      // Properly remove event listeners
      currentSong.audio.onended = null;
      currentSong.audio.ontimeupdate = null;
      currentSong.audio.onloadedmetadata = null;
    }

    // Set current song *immediately* to show UI
    setCurrentSong({ ...song, audio: null, index, loading: true });
    setCurrentProgress(0);
    setCurrentTime(0);
    setDuration(0);

    // Scroll to the song
    if (songRefs.current[index] && playlistRef.current) {
      const card = songRefs.current[index];
      const container = playlistRef.current;
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const cardLeft = card.offsetLeft;
      const scrollTo = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }

    // Create new audio instance
    const audio = new Audio(song.src);
    audio.preload = 'metadata';

    // Use direct event handlers instead of addEventListener
    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setCurrentProgress(progress);
        setCurrentTime(audio.currentTime);
      }
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      setCurrentSong(prev => ({ ...prev, duration: audio.duration }));
    };

    audio.onended = () => {
      setIsPlaylistPlaying(false);
      setCurrentSong(null);
      setCurrentProgress(0);
      setCurrentTime(0);
      setDuration(0);
    };

    // Play the song
    audio.play().then(() => {
      setCurrentSong({ ...song, audio, index, loading: false, duration: audio.duration });
      setIsPlaylistPlaying(true);
    }).catch(error => {
      console.error("Error playing song:", error);
      setCurrentSong(null);
    });
  }, [currentSong]); // Remove playlist dependency

  const stopSong = useCallback(() => {
    if (currentSong && currentSong.audio) {
      currentSong.audio.pause();
      currentSong.audio.currentTime = 0;
      // Clean up event handlers
      currentSong.audio.onended = null;
      currentSong.audio.ontimeupdate = null;
      currentSong.audio.onloadedmetadata = null;
    }
    setCurrentSong(null);
    setIsPlaylistPlaying(false);
    setCurrentProgress(0);
    setCurrentTime(0);
    setDuration(0);
  }, [currentSong]);

  // Format time helper function
  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // FIX: Main app render logic updated for smooth envelope -> letter -> app transition
  return (
    <AnimatePresence mode="wait">
      {!initialLetterOpened && (
        <EnvelopeAnimation
          key="envelope"
          onOpenComplete={() => {
            setInitialLetterOpened(true);
            setShowLetter(true);
          }}
        />
      )}

      {initialLetterOpened && (
        <motion.div
          key="main-app"
          className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-pink-100 p-4 md:p-8 cursor-pointer relative overflow-hidden"
          onClick={addHeart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 25%, #fce7f3 50%, #fbcfe8 75%, #f9a8d4 100%)"
          }}
        >
          <SplashBackground />
          {/* Optimized background animation */}
          {!shouldReduceMotion && (
            <motion.div
              className="fixed inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {[...Array(3)].map((_, i) => ( // Reduced from 10 to 3
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-pink-100 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)' // Force GPU layer
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    scale: [0, 0.8, 0], // Reduced scale
                    opacity: [0, 0.2, 0], // Reduced opacity
                  }}
                  transition={{
                    duration: 10 + Math.random() * 5, // Much slower
                    repeat: Infinity,
                    delay: Math.random() * 10 + 3 // Much longer delays
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Optimized Floating Hearts */}
          <FloatingHearts hearts={hearts} onRemove={removeHeart} />

          {/* Main content with optimized animations */}
          <motion.div
            className="max-w-6xl mx-auto space-y-20 relative z-20"
            // FIX: Main content now waits for the initial letter to be closed
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: hasViewedInitialLetter ? 1 : 0,
              y: hasViewedInitialLetter ? 0 : 20
            }}
            transition={{ duration: 0.8, delay: hasViewedInitialLetter ? 0.3 : 0 }}
          >
            <ScrollReveal animation="fade" duration={0.8} delay={0.5}>
              <motion.div
                className="text-center pt-12"
                whileInView={shouldReduceMotion ? {} : { scale: [0.95, 1] }}
                transition={{ duration: 0.4 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 font-comic"
                >
                  {textConfig.greeting.name},
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 font-comic max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {textConfig.greeting.message}
                </motion.p>
              </motion.div>
            </ScrollReveal>

            {/* Optimized Letter Card */}
            <ScrollReveal animation="zoom" duration={0.6} delay={0.1}>
              <motion.div
                className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 p-4 md:p-10 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-2 border-pink-200 overflow-hidden"
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(236, 72, 153, 0.2)"
                }}
                onClick={(e) => { e.stopPropagation(); setShowLetter(true); }}
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-pink-200 to-transparent rounded-full -translate-x-10 -translate-y-10 opacity-50" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-200 to-transparent rounded-full translate-x-8 translate-y-8 opacity-50" />

                {!shouldReduceMotion && (
                  <>
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-4 h-4 text-pink-300" fill="currentColor" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-4 left-4"
                      animate={{ y: [2, -2, 2] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <Heart className="w-3 h-3 text-purple-300" fill="currentColor" />
                    </motion.div>
                  </>
                )}

                <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-lg border-4 border-white">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-pink-600" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2 md:mb-3">
                    {textConfig.letter.title}
                  </h2>
                  <p className="text-gray-600 font-comic text-lg md:text-xl leading-relaxed">{textConfig.letter.subtitle}</p>

                  <div className="flex justify-center items-center mt-3 md:mt-4 space-x-2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-pink-300" />
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-purple-300" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Polaroid Photo Gallery */}
            <ScrollReveal animation="slide" duration={0.6} delay={0.15}>
              <motion.div
                className="relative bg-gradient-to-br from-white via-amber-50 to-orange-50 p-8 md:p-10 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-amber-200 overflow-hidden"
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(245, 158, 11, 0.2)"
                }}
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-200 to-transparent rounded-full -translate-x-10 -translate-y-10 opacity-40" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-orange-200 to-transparent rounded-full translate-x-8 translate-y-8 opacity-40" />

                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute top-6 right-6"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-2xl">📸</span>
                  </motion.div>
                )}

                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                  <span className="text-2xl">🖼️</span>
                </div>

                <div className="relative z-10">
                  {/* Title + Subtitle from config */}
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-comic mb-3">
                    {textConfig.gallery.title}
                  </h2>
                  <p className="text-gray-600 font-comic text-xl leading-relaxed mb-6">
                    {textConfig.gallery.subtitle}
                  </p>

                  {/* Polaroid Gallery Container */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {textConfig.gallery.photos.map((photo, index) => (
                        <motion.div
                          key={index}
                          className="flex-none w-72 sm:w-80 bg-white p-4 rounded-xl transform"
                          style={{
                            // boxShadow: "0 10px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.1)",
                            transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3 + 1)}deg)`
                          }}
                          whileHover={shouldReduceMotion ? {} : {
                            scale: 1.05,
                            rotate: 0,
                            transition: { duration: 0.3 }
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <div className="relative bg-gray-100 rounded-lg flex items-center justify-center">
                            <img
                              src={photo.src}
                              alt={`Memory ${index + 1}`}
                              className="w-full aspect-[4/5] object-contain rounded-lg"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="font-comic text-gray-700 text-lg font-medium leading-relaxed">
                              {photo.caption}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Scroll Indicators */}
                    <div className="flex justify-center mt-4 space-x-2">
                      {Array.from({ length: textConfig.scrollIndicators }).map((_, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 rounded-full bg-amber-300 opacity-60"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="flex justify-center items-center mt-6 space-x-2">
                    <div className="w-8 h-[2px] bg-amber-300 rounded-full" />
                    <span className="text-xl">{textConfig.dividerIcon}</span>
                    <div className="w-8 h-[2px] bg-amber-300 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>



            {/* Rotatable Notes Section */}
<ScrollReveal animation="fade" threshold={0.3} duration={0.8}>
  <motion.div
    className="relative bg-gradient-to-br from-white via-yellow-50 to-pink-50 p-8 md:p-10 rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden"
    transition={{ duration: 0.6 }}
  >
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400" />

    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-pink-600 mb-8 font-comic text-center">
      Little Notes From My Heart 💌
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[
        { text: "always gonna adore your smile so keep smiling🌟", color: "from-yellow-100 to-yellow-200", borderColor: "border-yellow-300" },
        { text: "You are and will always remain close to my heart 💕", color: "from-purple-100 to-purple-200", borderColor: "border-purple-300" },
        { text: "I promise to learn from my mistakes and be a better man in life ✨", color: "from-blue-100 to-blue-200", borderColor: "border-blue-300" },
      ].map((note, index) => (
        <RotatableNote key={index} note={note} index={index} />
      ))}
    </div>

    <div className="text-center mt-8">
      <p className="text-gray-600 font-comic text-lg">
        Click on any note to see the love behind it! ✨
      </p>
    </div>
  </motion.div>
</ScrollReveal>


            {/* ENHANCED SPOTIFY-STYLE PLAYLIST SECTION */}
            <ScrollReveal animation="slide" duration={0.6} delay={0.2}>
              <motion.div
                className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-6 md:p-8 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-blue-200 overflow-hidden"
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)"
                }}
              >
                {/* Decorative background elements */}
                {!shouldReduceMotion && (
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <motion.div
                      className="absolute top-4 left-6 text-blue-200 text-xl"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      ♪
                    </motion.div>
                    <motion.div
                      className="absolute bottom-4 right-6 text-blue-300 text-lg"
                      animate={{ rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    >
                      ♬
                    </motion.div>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white mr-4">
                    <Music className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-comic">
                      Playlist For You
                    </h2>
                    <p className="text-gray-600 font-comic text-lg">
                      Songs dedicated to u
                    </p>
                  </div>
                </div>

                {/* Enhanced Song Cards */}
                <div className="relative">
                  <div
                    ref={playlistRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {playlist.map((song, index) => (
                      <motion.div
                        ref={el => (songRefs.current[index] = el)}
                        key={index}
                        className={`flex-none w-72 bg-white/90 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${currentSong && currentSong.index === index
                            ? 'border-blue-400 bg-blue-50/90 scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:scale-105'
                          }`}
                        whileHover={shouldReduceMotion ? {} : { y: -4 }} // Reduced hover effect
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }} // Only animate once
                        transition={{ delay: index * 0.05, duration: 0.3 }} // Faster, shorter delays
                        style={{
                          willChange: 'transform, opacity',
                          transform: 'translateZ(0)'
                        }}
                      >
                        {/* Audio Visualizer - Simplified */}
                        {currentSong && currentSong.index === index && !currentSong.loading && !shouldReduceMotion && (
                          <motion.div
                            className="absolute bottom-4 left-4 flex items-end space-x-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {[...Array(3)].map((_, i) => ( // Reduced from 4 to 3 bars
                              <motion.div
                                key={i}
                                className="w-1 bg-white rounded-full"
                                animate={{ height: [6, 12, 8, 14, 6] }} // Smaller heights
                                transition={{
                                  duration: 1.2, // Slower animation
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                }}
                              />
                            ))}
                          </motion.div>
                        )}

                        {/* Album Cover */}
                        <div className="relative bg-gray-100 flex items-center justify-center p-3">
                          <img
                            src={[MusicCover1, MusicCover2, MusicCover3][index]}
                            alt={`${song.title} cover`}
                            className="w-full aspect-square object-contain rounded-xl"
                          />

                          {/* Now Playing Indicator */}
                          {currentSong && currentSong.index === index && !currentSong.loading && (
                            <motion.div
                              className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex items-center space-x-1">
                                <motion.div
                                  className="w-2 h-2 bg-white rounded-full"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span>Now Playing</span>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Song Info */}
                        <div className="p-4 text-center">
                          <h3 className="font-comic text-gray-900 font-bold text-lg mb-1 truncate">
                            {song.title}
                          </h3>
                          <p className="font-comic text-gray-600 text-sm mb-4">
                            {song.info}
                          </p>

                          {/* Progress Bar */}
                          {(currentSong && currentSong.index === index) ? (
                            <motion.div
                              className="mb-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden mb-2">
                                <motion.div
                                  className="bg-blue-500 h-1 rounded-full"
                                  style={{ width: `${currentProgress}%` }}
                                  transition={{ duration: 0.1 }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="mb-4 h-[30px]"></div>
                          )}

                          {/* Control Panel */}
                          <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border border-gray-200">
                            {/* Previous */}
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                const prevIndex = (currentSong ? currentSong.index : index) > 0
                                  ? (currentSong ? currentSong.index : index) - 1
                                  : playlist.length - 1;
                                playSong(playlist[prevIndex], prevIndex);
                              }}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-white transition-all shadow-sm"
                              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                              </svg>
                            </motion.button>

                            {/* Play/Pause */}
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (currentSong && currentSong.index === index && !currentSong.loading) {
                                  stopSong();
                                } else {
                                  playSong(song, index);
                                }
                              }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${currentSong && currentSong.index === index && !currentSong.loading
                                  ? 'bg-blue-500 hover:bg-blue-600'
                                  : 'bg-blue-400 hover:bg-blue-500'
                                }`}
                              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                            >
                              {currentSong && currentSong.index === index && !currentSong.loading ? (
                                <motion.svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </motion.svg>
                              ) : (
                                <motion.svg
                                  className="w-5 h-5 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <path d="M8 5v14l11-7z" />
                                </motion.svg>
                              )}
                            </motion.button>

                            {/* Next */}
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextIndex = (currentSong ? currentSong.index : index) < playlist.length - 1
                                  ? (currentSong ? currentSong.index : index) + 1
                                  : 0;
                                playSong(playlist[nextIndex], nextIndex);
                              }}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-white transition-all shadow-sm"
                              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Scroll Indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {playlist.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-2 rounded-full transition-all cursor-pointer ${currentSong && currentSong.index === index
                            ? 'bg-blue-500 w-8'
                            : 'bg-blue-300 w-2 hover:bg-blue-400'
                          }`}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                        onClick={(e) => { e.stopPropagation(); playSong(playlist[index], index); }}
                      />
                    ))}
                  </div>
                </div>

                {/* Global Controls */}
                {/* <div className="flex justify-center space-x-4 mt-8">
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          if (isPlaylistPlaying) {
            stopSong();
          } else if (playlist.length > 0) {
            playSong(playlist[0], 0);
          }
        }}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-full font-comic text-sm transition-all duration-200 shadow-lg flex items-center space-x-2"
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      >
        <motion.svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={isPlaylistPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: isPlaylistPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaylistPlaying ? (
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </motion.svg>
        <span>{isPlaylistPlaying ? 'Stop All' : 'Play All'}</span>
      </motion.button>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          if (playlist.length > 0) {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            playSong(playlist[randomIndex], randomIndex);
          }
        }}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-comic text-sm transition-all duration-200 shadow-lg flex items-center space-x-2"
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      >
        <motion.span
          className="text-lg"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 0.6 }}
          whileTap={{ rotate: 360 }}
        >
          🔀
        </motion.span>
        <span>Shuffle</span>
      </motion.button>
    </div> */}

                {/* Decorative Divider */}
                <div className="flex justify-center items-center mt-8 space-x-2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-300" />
                  <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-indigo-300" />
                </div>
              </motion.div>
            </ScrollReveal>


            {/* Optimized Game Card */}
            <ScrollReveal animation="slide" duration={0.6} delay={0.3}>
              <motion.div
                className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 md:p-10 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-2 border-purple-200 overflow-hidden"
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(147, 51, 234, 0.2)"
                }}
                onClick={(e) => { e.stopPropagation(); setShowGame(true); }}
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-x-12 -translate-y-12 opacity-40" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-200 to-transparent rounded-full translate-x-10 translate-y-10 opacity-40" />

                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute top-6 right-6"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}

                <div className="relative z-10 bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                  <Heart className="w-10 h-10 text-pink-600" fill="currentColor" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-comic mb-3">
                    {textConfig.game.title}
                  </h2>
                  <p className="text-gray-600 font-comic text-xl leading-relaxed">{textConfig.game.subtitle}</p>

                  {gameCompleted && (
                    <motion.div
                      className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border-2 border-pink-200 shadow-inner"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                    >
                      <p className="text-pink-600 font-comic font-semibold text-lg">✨ {textConfig.game.completionMessage}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-center items-center mt-4 space-x-2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-300" />
                    <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-pink-300" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </motion.div>

          {/* Optimized Letter Modal */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                // FIX: Changed background from bg-black/40 to a softer pink
                className="fixed inset-0 bg-pink-100/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                // FIX: Updated onClick to control main content visibility
                onClick={() => {
                  setShowLetter(false);
                  if (!hasViewedInitialLetter) {
                    setHasViewedInitialLetter(true);
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="relative bg-white/95 backdrop-blur-md p-8 md:p-12 max-w-3xl w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] border border-pink-200"
                  initial={{ scale: 0.9, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.1 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,242,242,0.98) 50%, rgba(252,231,243,0.98) 100%)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)"
                  }}
                >
                  {/* Improved background elements */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/50 to-transparent rounded-full -translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200/50 to-transparent rounded-full translate-x-14 translate-y-14" />
                  </div>

                  {/* Enhanced close button */}
                  <motion.button
                    // FIX: Updated onClick to control main content visibility
                    onClick={() => {
                      setShowLetter(false);
                      if (!hasViewedInitialLetter) {
                        setHasViewedInitialLetter(true);
                      }
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200 z-20 transition-all duration-200"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center justify-center mb-8"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-200">
                        <div className="flex items-center justify-center space-x-3">
                          <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-comic m-0">
                            {textConfig.letter.recipient}
                          </h3>
                          <Heart className="w-8 h-8 text-purple-500" fill="currentColor" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-white/70 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-inner border border-pink-100 relative"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(254,240,245,0.85) 100%)",
                        backdropFilter: "blur(10px)"
                      }}
                    >
                      {/* Decorative lines */}
                      <div className="absolute left-8 top-0 bottom-0 w-px bg-pink-200/50" />
                      <div className="absolute left-12 top-0 bottom-0 w-px bg-pink-200/30" />

                      <div className="space-y-6 font-comic text-gray-700 leading-relaxed text-lg relative z-10">
                        {textConfig.letter.paragraphs.map((paragraph, index) => (
                          <motion.p
                            key={index}
                            className="relative"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              delay: 0.5 + index * 0.2,
                              duration: 0.8,
                              ease: "easeOut"
                            }}
                          >
                            {index === 0 && (
                              <span className="text-6xl font-bold text-pink-300/60 absolute -left-4 -top-2 leading-none select-none">
                                "
                              </span>
                            )}
                            <span className="relative z-10">{paragraph}</span>
                          </motion.p>
                        ))}

                        <motion.div
                          className="text-right mt-8 pt-6 border-t border-pink-200/50 border-dashed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + textConfig.letter.paragraphs.length * 0.2, duration: 0.8 }}
                        >
                          <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                            With all my love,
                          </p>
                          <p className="text-xl text-pink-600 font-comic" style={{ whiteSpace: 'pre-line' }}>
                            {textConfig.letter.signature}
                          </p>

                          <motion.div
                            className="flex justify-end items-center mt-4 space-x-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + textConfig.letter.paragraphs.length * 0.2, duration: 0.5 }}
                          >
                            <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            <Heart className="w-5 h-5 text-purple-400" fill="currentColor" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Modal */}
          <AnimatePresence>
            {showGame && (
              <HeartCatcherGame
                onComplete={() => setGameCompleted(true)}
                onClose={() => setShowGame(false)}
                winMessage={textConfig.game.winMessage}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;