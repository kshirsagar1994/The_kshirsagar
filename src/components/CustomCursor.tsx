import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  const getVariantStyles = () => {
    switch (cursorVariant) {
      case 'view':
        return {
          width: 80,
          height: 80,
          backgroundColor: '#8b5cf6',
          color: '#ffffff',
          scale: 1,
        };
      case 'explore':
        return {
          width: 90,
          height: 90,
          backgroundColor: '#06b6d4',
          color: '#000000',
          scale: 1,
        };
      case 'cta':
        return {
          width: 60,
          height: 60,
          backgroundColor: '#ffffff',
          color: '#000000',
          scale: 1.2,
        };
      case 'link':
        return {
          width: 44,
          height: 44,
          backgroundColor: 'rgba(139, 92, 246, 0.4)',
          border: '1px solid rgba(139, 92, 246, 0.8)',
          scale: 1.1,
        };
      case 'text':
        return {
          width: 4,
          height: 28,
          backgroundColor: '#8b5cf6',
          borderRadius: 2,
        };
      default:
        return {
          width: 16,
          height: 16,
          backgroundColor: 'rgba(139, 92, 246, 0.9)',
          border: '2px solid rgba(255, 255, 255, 0.8)',
        };
    }
  };

  return (
    <>
      {/* Outer Spring Follower Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-mono font-bold text-xs uppercase tracking-wider select-none shadow-2xl backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: cursorVariant === 'text' ? '2px' : '9999px',
        }}
        animate={getVariantStyles()}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[11px] font-extrabold tracking-widest text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center Dot (only on default & link) */}
      {cursorVariant === 'default' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[10000]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </>
  );
};
