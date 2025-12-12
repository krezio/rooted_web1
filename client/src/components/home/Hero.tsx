import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/cinematic_luxury_floral_hero_background.png";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax-like scale effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
          className="w-full h-full"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
        >
          Premium Floral Design
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8"
        >
          Artistry <span className="font-serif italic font-light">in</span> Bloom
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link href="/shop">
            <Button 
              variant="outline" 
              className="rounded-full border-white/80 text-white hover:bg-white hover:text-primary px-8 md:px-12 py-6 md:py-7 text-xs tracking-widest uppercase transition-all duration-500 backdrop-blur-md bg-white/10 active:bg-white active:text-primary hover:scale-105 shadow-lg"
            >
              Explore Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
