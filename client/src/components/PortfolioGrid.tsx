import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface PortfolioGridProps {
  images: PortfolioImage[];
  category?: string;
}

export function PortfolioGrid({ images, category }: PortfolioGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const filteredImages = category
    ? images.filter((img) => img.category.toLowerCase() === category.toLowerCase())
    : images;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="relative aspect-[3/4] overflow-hidden rounded-md group cursor-pointer"
            data-testid={`portfolio-image-${image.id}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative flex items-center justify-center min-h-[80vh]">
            <Button
              size="icon"
              variant="ghost"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white"
              data-testid="button-close-lightbox"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={goPrev}
              className="absolute left-4 z-10 text-white"
              data-testid="button-lightbox-prev"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {selectedIndex !== null && (
              <img
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
            )}

            <Button
              size="icon"
              variant="ghost"
              onClick={goNext}
              className="absolute right-4 z-10 text-white"
              data-testid="button-lightbox-next"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {selectedIndex !== null && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedIndex + 1} / {filteredImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
