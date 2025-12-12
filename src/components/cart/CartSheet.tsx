import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, removeItem, updateQuantity, total } = useCart();

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "971562901494";
    const message = encodeURIComponent(
      `Hello Rooted Flowers, I would like to place an order:\n\n${items
        .map((item) => `- ${item.name} (x${item.quantity}) - AED ${item.price * item.quantity}`)
        .join("\n")}\n\nTotal: AED ${total()}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border">
        <SheetHeader className="space-y-4 pb-6 border-b border-border/40">
          <SheetTitle className="font-display text-2xl">Your Selection</SheetTitle>
          <SheetDescription className="font-sans text-xs uppercase tracking-widest">
            {items.length === 0 ? "Your cart is currently empty." : `${items.length} items in cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-8 py-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-24 w-20 bg-secondary overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-lg leading-none">{item.name}</h4>
                        <p className="font-serif italic text-sm">AED {item.price * item.quantity}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button 
                            className="p-2 hover:bg-muted transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`decrease-${item.id}`}
                          >
                             <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-mono min-w-[2rem] text-center">{item.quantity}</span>
                          <button 
                            className="p-2 hover:bg-muted transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`increase-${item.id}`}
                          >
                             <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-destructive text-xs uppercase tracking-widest"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-6 border-t border-border/40 space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-sans text-xs uppercase tracking-widest">Subtotal</span>
                <span className="font-display text-2xl">AED {total()}</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center px-4">
                Shipping and taxes calculated at checkout via WhatsApp.
              </p>
              <Button 
                className="w-full h-12 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs uppercase tracking-[0.2em]"
                onClick={handleWhatsAppCheckout}
              >
                Checkout via WhatsApp
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <ShoppingBag className="h-12 w-12 stroke-1" />
            <p className="font-serif italic">Start adding blooms to your collection.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
