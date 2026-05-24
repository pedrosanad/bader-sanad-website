import { Button } from "@/components/ui/button";
import heroImage from "@assets/portfolio_images/page_01.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  onBookClick?: () => void;
  onPortfolioClick?: () => void;
}

export function HeroSection({ onBookClick, onPortfolioClick }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={onBookClick}
            className="bg-white text-black border-white/20 backdrop-blur-md"
            data-testid="button-hero-book"
          >
            {t.hero.bookSession}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onPortfolioClick}
            className="border-white/40 text-white bg-white/10 backdrop-blur-md"
            data-testid="button-hero-portfolio"
          >
            {t.hero.viewPortfolio}
          </Button>
        </div>
      </div>
    </section>
  );
}
