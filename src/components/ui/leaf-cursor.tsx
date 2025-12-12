import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function LeafCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOnCard, setIsOnCard] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
      if (target.closest('[data-product-card], .group')) {
        setIsOnCard(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(false);
      }
      if (target.closest('[data-product-card], .group')) {
        setIsOnCard(false);
      }
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.body.addEventListener("mouseleave", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.body.removeEventListener("mouseleave", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{ 
          scale: isHovering ? 0.6 : isOnCard ? 1.4 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative"
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          animate={{ 
            rotate: isHovering ? 180 : isOnCard ? -15 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.path
            d="M16 4C16 4 6 12 6 20C6 26 10 30 16 30C22 30 26 26 26 20C26 12 16 4 16 4Z"
            fill="hsl(130, 25%, 40%)"
            stroke="hsl(130, 30%, 30%)"
            strokeWidth="1.5"
            animate={{
              fill: isOnCard ? "hsl(130, 35%, 45%)" : "hsl(130, 25%, 40%)",
            }}
            transition={{ duration: 0.3 }}
          />
          <path
            d="M16 8C16 8 16 20 16 26"
            stroke="hsl(130, 30%, 30%)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M11 14C11 14 14 17 16 17"
            stroke="hsl(130, 30%, 30%)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M21 14C21 14 18 17 16 17"
            stroke="hsl(130, 30%, 30%)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M12 19C12 19 15 21 16 21"
            stroke="hsl(130, 30%, 30%)"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M20 19C20 19 17 21 16 21"
            stroke="hsl(130, 30%, 30%)"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </motion.svg>
        
        {isOnCard && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary/80 flex items-center justify-center"
          >
            <span className="text-[8px] text-white font-bold">+</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
