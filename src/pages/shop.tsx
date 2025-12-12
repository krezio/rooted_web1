import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus, Sparkles, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

import bouquet1 from "@assets/generated_images/elegant_white_and_green_bridal_bouquet.png";
import bouquet2 from "@assets/generated_images/dramatic_deep_red_luxury_bouquet.png";
import bouquet3 from "@assets/generated_images/modern_artistic_pastel_wildflower_arrangement.png";
import bouquet4 from "@assets/generated_images/exotic_purple_orchid_arrangement.png";
import bouquet5 from "@assets/generated_images/blush_pink_peonies_in_glass_vase.png";
import bouquet6 from "@assets/generated_images/dried_flower_sculpture_arrangement.png";
import bouquet7 from "@assets/generated_images/vibrant_coral_and_orange_sunset_bouquet.png";
import bouquet8 from "@assets/generated_images/signature_mono-botanical_rose_arrangement.png";
import bouquet9 from "@assets/generated_images/avant-garde_anthurium_and_orchid_design.png";
import bouquet10 from "@assets/generated_images/lush_garden_style_table_centerpiece.png";
import bouquet11 from "@assets/generated_images/modern_architectural_tulip_arrangement.png";

const products = [
  {
    id: 1,
    name: "The Ethereal",
    price: 450,
    image: bouquet1,
    category: "Signature Collection",
    description: "Pure elegance in whites and greens"
  },
  {
    id: 2,
    name: "Midnight Velvet",
    price: 520,
    image: bouquet2,
    category: "Luxury Edition",
    description: "Deep crimson romance"
  },
  {
    id: 3,
    name: "Wild Garden",
    price: 380,
    image: bouquet3,
    category: "Seasonal",
    description: "Whimsical meadow dreams"
  },
  {
    id: 4,
    name: "Noir Orchid",
    price: 650,
    image: bouquet4,
    category: "Exotic",
    description: "Mysterious purple allure"
  },
  {
    id: 5,
    name: "Blush Peony",
    price: 580,
    image: bouquet5,
    category: "Premium",
    description: "Soft pink perfection"
  },
  {
    id: 6,
    name: "Desert Sculpture",
    price: 420,
    image: bouquet6,
    category: "Dried Series",
    description: "Everlasting artistry"
  },
  {
    id: 7,
    name: "Sunset Coral",
    price: 395,
    image: bouquet7,
    category: "Seasonal",
    description: "Golden hour captured"
  },
  {
    id: 8,
    name: "Quicksand Roses",
    price: 550,
    image: bouquet8,
    category: "Mono-Botanical",
    description: "Timeless rose elegance"
  },
  {
    id: 9,
    name: "Avant Garde",
    price: 720,
    image: bouquet9,
    category: "Sculptural",
    description: "Bold artistic statement"
  },
  {
    id: 10,
    name: "Garden Centerpiece",
    price: 850,
    image: bouquet10,
    category: "Events",
    description: "Lavish table grandeur"
  },
  {
    id: 11,
    name: "French Tulips",
    price: 480,
    image: bouquet11,
    category: "Seasonal",
    description: "Parisian sophistication"
  }
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { addItem, setCartOpen } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your selection.`,
      duration: 3000,
    });
    setCartOpen(true);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative perspective-1000"
      >
        <div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
          />

          <div className="absolute top-4 left-4 z-20">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium tracking-widest uppercase bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full text-primary border border-primary/10 shadow-sm"
            >
              <Sparkles className="w-3 h-3" />
              {product.category}
            </motion.span>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            />

            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-white/90 text-sm font-light italic mb-4">
                "{product.description}"
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 bg-white/95 hover:bg-white text-primary backdrop-blur-sm border-0 rounded-full font-medium"
                  onClick={handleAddToCart}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/30 hover:bg-white/50 backdrop-blur-sm border-0 rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickView(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/30 hover:bg-white/50 backdrop-blur-sm border-0 rounded-full text-white hover:text-rose-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="p-5 space-y-3 relative" style={{ transform: "translateZ(40px)" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 className="font-display text-xl md:text-2xl text-primary group-hover:text-primary/80 transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs tracking-widest uppercase text-muted-foreground/60 md:hidden">
                  {product.category}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif italic text-lg md:text-xl text-primary/90">
                  AED {product.price}
                </p>
              </div>
            </div>

            <motion.div 
              className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <motion.div
            className="absolute -inset-px rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(130deg, rgba(255,255,255,0.2), transparent 40%, transparent 60%, rgba(255,255,255,0.1))",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-background rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-square relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="text-xs tracking-widest uppercase opacity-70 mb-2 block">{product.category}</span>
                <h2 className="font-display text-4xl mb-2">{product.name}</h2>
                <p className="text-white/80 mb-4 font-light">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="font-serif italic text-2xl">AED {product.price}</p>
                  <Button 
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-6"
                    onClick={handleAddToCart}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                onClick={() => setShowQuickView(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-gradient-to-b from-background via-background to-stone-50/50 dark:to-stone-950/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16 md:mb-24 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6"
          >
            <Sparkles className="w-7 h-7 text-primary" />
          </motion.div>
          
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated Excellence
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary mb-6 leading-none">
            The Collection
          </h1>
          
          <p className="max-w-md text-muted-foreground/80 font-light leading-relaxed">
            Each arrangement is a testament to nature's artistry, 
            handcrafted with passion and delivered with grace.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mt-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase rounded-full border transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-muted-foreground/30 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Complimentary Dubai Delivery
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Same Day Available
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Luxury Packaging
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
