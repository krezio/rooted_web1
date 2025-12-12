import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/CartSheet";
import { useCart } from "@/hooks/use-cart";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartOpen, setCartOpen, items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/80 backdrop-blur-xl py-3 shadow-lg border-b border-white/20"
          : "bg-transparent py-6 text-white"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background border-r-0">
            <div className="flex flex-col items-center space-y-8 mt-12 text-center">
              <Logo className="text-foreground" textClassName="text-4xl" />
              <div className="flex flex-col space-y-6 font-sans text-xs tracking-[0.2em] uppercase mt-8">
                <Link href="/shop" className="hover:text-primary transition-colors">Shop Collection</Link>
                <Link href="/about" className="hover:text-primary transition-colors">Our Story</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Left Links */}
        <div className={cn(
          "hidden md:flex items-center space-x-10 text-[10px] tracking-[0.25em] font-medium uppercase transition-colors duration-300",
          scrolled ? "text-foreground" : "text-white"
        )}>
          <Link href="/shop" className="hover:opacity-60 transition-opacity">Shop</Link>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-1 md:flex-none flex justify-center hover:opacity-90 transition-opacity">
          <Logo 
            className={cn("transition-colors duration-300", scrolled ? "text-primary" : "text-white")} 
            textClassName="text-3xl md:text-5xl" 
          />
        </Link>

        {/* Desktop Right Links */}
        <div className={cn(
          "hidden md:flex items-center space-x-10 text-[10px] tracking-[0.25em] font-medium uppercase transition-colors duration-300",
          scrolled ? "text-foreground" : "text-white"
        )}>
          <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("hover:bg-transparent hover:opacity-60 relative", scrolled ? "text-foreground" : "text-white")}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {items.length}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Cart */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("md:hidden relative", scrolled ? "text-foreground" : "text-white")}
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {items.length}
            </span>
          )}
        </Button>

        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </nav>
  );
}
