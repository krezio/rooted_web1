import { motion } from "framer-motion";
import { Link } from "wouter";
import aboutImage from "@assets/generated_images/florist_arranging_flowers_artistic_close_up.png";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] md:aspect-square"
          >
            <img 
              src={aboutImage} 
              alt="Florist arranging flowers" 
              className="w-full h-full object-cover"
            />
            {/* Decorative Border */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary/20 z-[-1]" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center md:pl-12 text-center md:text-left"
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight">
              Rooted in Nature, <br />
              <span className="font-serif italic text-primary/80">Crafted with Soul.</span>
            </h2>
            <p className="font-sans text-sm leading-loose text-muted-foreground mb-8">
              Every arrangement tells a story. At Rooted, we believe in the language of flowers—the subtle art of combining texture, color, and form to evoke emotion. Our designs are inspired by the wild, untamed beauty of nature, refined for the modern home.
            </p>
            <div>
              <Link href="/about">
                <Button variant="link" className="text-primary p-0 h-auto font-sans text-xs tracking-widest uppercase border-b border-primary hover:no-underline hover:opacity-70 active:opacity-70 transition-opacity pb-1 rounded-none">
                  Read Our Story
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
