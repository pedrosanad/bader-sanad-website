import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  onViewClick?: () => void;
  onBookClick?: () => void;
}

export function CategoryCard({ title, description, image, onViewClick, onBookClick }: CategoryCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group relative overflow-hidden rounded-md aspect-[4/5]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-serif text-2xl md:text-3xl font-medium mb-2">{title}</h3>
        <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewClick}
            className="border-white/40 text-white bg-white/10 backdrop-blur-md"
            data-testid={`button-view-${title.toLowerCase()}`}
          >
            {t.categoryCard.viewGallery}
          </Button>
          <Button
            size="sm"
            onClick={onBookClick}
            className="bg-white text-black"
            data-testid={`button-book-${title.toLowerCase()}`}
          >
            {t.categoryCard.bookSession} <ArrowRight className="ms-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
