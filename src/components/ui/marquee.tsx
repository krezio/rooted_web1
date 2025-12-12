import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden z-[60] relative">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex space-x-12 font-sans text-[10px] tracking-[0.2em] uppercase items-center"
        >
          <span>Premium Same Day Delivery in Dubai</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>Bespoke Floral Artistry</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>Order via WhatsApp for Custom Requests</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>Rooted in Nature, Crafted with Soul</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          
          {/* Duplicate for seamless loop */}
          <span>Premium Same Day Delivery in Dubai</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>Bespoke Floral Artistry</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>Order via WhatsApp for Custom Requests</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>Rooted in Nature, Crafted with Soul</span>
          <span className="w-1 h-1 bg-current rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
