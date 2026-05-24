import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Camera } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Navigation({ onNavigate, currentPage = "home" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const categoryKeys = ["Portrait", "Events", "Commercial", "Headshots"] as const;
  const categoryLabels: Record<string, string> = {
    Portrait: t.nav.categories.portrait,
    Events: t.nav.categories.events,
    Commercial: t.nav.categories.commercial,
    Headshots: t.nav.categories.headshots,
  };

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between gap-4 h-16">
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md p-1"
            data-testid="link-home"
          >
            <Camera className="h-6 w-6" />
            <span className="font-serif text-xl font-medium">Bader Sanad</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={currentPage === "portfolio" ? "secondary" : "ghost"}
                  data-testid="button-portfolio-dropdown"
                >
                  {t.nav.portfolio}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {categoryKeys.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => handleNavigate(`portfolio-${cat.toLowerCase()}`)}
                    data-testid={`link-portfolio-${cat.toLowerCase()}`}
                  >
                    {categoryLabels[cat]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={currentPage === "packages" ? "secondary" : "ghost"}
              onClick={() => handleNavigate("packages")}
              data-testid="link-packages"
            >
              {t.nav.packages}
            </Button>

            <Button
              variant={currentPage === "about" ? "secondary" : "ghost"}
              onClick={() => handleNavigate("about")}
              data-testid="link-about"
            >
              {t.nav.about}
            </Button>

            <Button
              variant="default"
              onClick={() => handleNavigate("booking")}
              data-testid="button-book-session"
            >
              {t.nav.bookSession}
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-medium text-sm px-2"
              data-testid="button-toggle-language"
            >
              {language === "en" ? "عربي" : "EN"}
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col p-4 gap-2">
            {categoryKeys.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                className="justify-start"
                onClick={() => handleNavigate(`portfolio-${cat.toLowerCase()}`)}
                data-testid={`mobile-link-portfolio-${cat.toLowerCase()}`}
              >
                {categoryLabels[cat]}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigate("packages")}
              data-testid="mobile-link-packages"
            >
              {t.nav.packages}
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigate("about")}
              data-testid="mobile-link-about"
            >
              {t.nav.about}
            </Button>
            <Button
              variant="default"
              onClick={() => handleNavigate("booking")}
              data-testid="mobile-button-book-session"
            >
              {t.nav.bookSession}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
