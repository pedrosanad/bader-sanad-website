import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { CategoryCard } from "@/components/CategoryCard";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { BookingForm } from "@/components/BookingForm";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import AdminPage from "@/pages/admin";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

import p02 from "@assets/portfolio_images/page_02.jpg";
import p03 from "@assets/portfolio_images/page_03.jpg";
import p04 from "@assets/portfolio_images/page_04.jpg";
import p05 from "@assets/portfolio_images/page_05.jpg";
import p06 from "@assets/portfolio_images/page_06.jpg";
import p07 from "@assets/portfolio_images/page_07.jpg";
import p08 from "@assets/portfolio_images/page_08.jpg";
import p09 from "@assets/portfolio_images/page_09.jpg";
import p10 from "@assets/portfolio_images/page_10.jpg";
import p11 from "@assets/portfolio_images/page_11.jpg";
import p12 from "@assets/portfolio_images/page_12.jpg";
import p13 from "@assets/portfolio_images/page_13.jpg";
import p14 from "@assets/portfolio_images/page_14.jpg";
import p15 from "@assets/portfolio_images/page_15.jpg";

// Category cover images
const portraitImage = p11;
const eventImage = p05;
const commercialImage = p04;
const headshotImage = p06;

const mockPortfolioImages = [
  // Portrait
  { id: "port1", src: p10, alt: "Portrait", category: "portrait" },
  { id: "port2", src: p11, alt: "Portrait", category: "portrait" },
  { id: "port3", src: p12, alt: "Portrait", category: "portrait" },
  { id: "port4", src: p13, alt: "Portrait", category: "portrait" },
  { id: "port5", src: p14, alt: "Portrait", category: "portrait" },
  // Events / Corporate
  { id: "ev1", src: p04, alt: "Corporate session", category: "events" },
  { id: "ev2", src: p05, alt: "Group photo", category: "events" },
  { id: "ev3", src: p09, alt: "Corporate session collage", category: "events" },
  // Commercial
  { id: "com1", src: p02, alt: "Corporate headshot", category: "commercial" },
  { id: "com2", src: p03, alt: "Corporate headshot", category: "commercial" },
  { id: "com3", src: p15, alt: "Professional portrait", category: "commercial" },
  // Headshots
  { id: "hs1", src: p06, alt: "Professional headshot", category: "headshots" },
  { id: "hs2", src: p07, alt: "Professional headshot", category: "headshots" },
  { id: "hs3", src: p08, alt: "Professional headshot", category: "headshots" },
];

type Page = "home" | "about" | "booking" | "admin" | "packages" | `portfolio-${string}`;

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [bookingCategory, setBookingCategory] = useState<string>("");
  const { t } = useLanguage();

  const categories = [
    {
      id: "portrait",
      title: t.categories.portrait.title,
      description: t.categories.portrait.description,
      image: portraitImage,
    },
    {
      id: "events",
      title: t.categories.events.title,
      description: t.categories.events.description,
      image: eventImage,
    },
    {
      id: "commercial",
      title: t.categories.commercial.title,
      description: t.categories.commercial.description,
      image: commercialImage,
    },
    {
      id: "headshots",
      title: t.categories.headshots.title,
      description: t.categories.headshots.description,
      image: headshotImage,
    },
  ];

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookSession = (category?: string) => {
    if (category) setBookingCategory(category);
    setCurrentPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCurrentCategory = () => {
    if (currentPage.startsWith("portfolio-")) {
      return currentPage.replace("portfolio-", "");
    }
    return null;
  };

  const renderPage = () => {
    if (currentPage === "admin") {
      return <AdminPage onBack={() => handleNavigate("home")} />;
    }

    const category = getCurrentCategory();

    if (category) {
      const categoryInfo = categories.find(
        (c) => c.id.toLowerCase() === category.toLowerCase()
      );
      return (
        <main className="pt-16">
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <Button
                variant="ghost"
                onClick={() => handleNavigate("home")}
                className="mb-6"
                data-testid="button-back-home"
              >
                <ArrowLeft className="me-2 h-4 w-4" /> {t.booking.backPortfolio}
              </Button>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-serif text-3xl md:text-5xl font-light mb-2">
                    {categoryInfo?.title}
                  </h1>
                  <p className="text-muted-foreground max-w-2xl">
                    {categoryInfo?.description}
                  </p>
                </div>
                <Button
                  onClick={() => handleBookSession(category)}
                  data-testid={`button-book-${category}-session`}
                >
                  {t.categoryCard.bookSession}
                </Button>
              </div>
              <PortfolioGrid images={mockPortfolioImages} category={category} />
            </div>
          </section>
          <Footer onNavigate={handleNavigate} />
        </main>
      );
    }

    if (currentPage === "booking") {
      return (
        <main className="pt-16">
          <section className="py-12 md:py-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <Button
                variant="ghost"
                onClick={() => handleNavigate("home")}
                className="mb-6"
                data-testid="button-back-home-booking"
              >
                <ArrowLeft className="me-2 h-4 w-4" /> {t.booking.back}
              </Button>
              <div className="text-center mb-12">
                <h1 className="font-serif text-3xl md:text-5xl font-light mb-4">
                  {t.booking.title}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.booking.subtitle}
                </p>
              </div>
              <BookingForm preselectedCategory={bookingCategory} />
            </div>
          </section>
          <Footer onNavigate={handleNavigate} />
        </main>
      );
    }

    if (currentPage === "about") {
      return (
        <main className="pt-16">
          <AboutSection onBookClick={() => handleBookSession()} />
          <Footer onNavigate={handleNavigate} />
        </main>
      );
    }

    if (currentPage === "packages") {
      return (
        <main className="pt-16">
          <section className="py-12 md:py-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <Button
                variant="ghost"
                onClick={() => handleNavigate("home")}
                className="mb-6"
                data-testid="button-back-home-packages"
              >
                <ArrowLeft className="me-2 h-4 w-4" /> {t.booking.back}
              </Button>
              <div className="text-center mb-12">
                <h1 className="font-serif text-3xl md:text-5xl font-light mb-4">
                  {t.packages.title}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.packages.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                <div className="bg-card border border-border rounded-md p-8 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl mb-2">{t.packages.premium.title}</h3>
                    <div className="text-4xl font-bold mb-2">650 <span className="text-lg font-normal text-muted-foreground">SAR</span></div>
                  </div>
                  <ul className="space-y-4 flex-1 mb-8">
                    {t.packages.premium.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="text-green-500 mt-0.5">&#10003;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => handleBookSession()} className="w-full" data-testid="button-book-premium">
                    {t.packages.premium.book}
                  </Button>
                </div>

                <div className="bg-card border border-border rounded-md p-8 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl mb-2">{t.packages.standard.title}</h3>
                    <div className="text-4xl font-bold mb-2">450 <span className="text-lg font-normal text-muted-foreground">SAR</span></div>
                  </div>
                  <ul className="space-y-4 flex-1 mb-8">
                    {t.packages.standard.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="text-green-500 mt-0.5">&#10003;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => handleBookSession()} className="w-full" data-testid="button-book-standard">
                    {t.packages.standard.book}
                  </Button>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="bg-muted rounded-md p-8">
                  <h2 className="font-serif text-2xl mb-4 text-center">{t.packages.cancellation.title}</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{t.packages.cancellation.intro}</p>
                    <ul className="space-y-2">
                      {t.packages.cancellation.rules.map((rule) => (
                        <li key={rule.label} className="flex items-start gap-3">
                          <span className="font-medium text-foreground min-w-[140px]">{rule.label}</span>
                          <span>{rule.text}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-4">{t.packages.cancellation.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer onNavigate={handleNavigate} />
        </main>
      );
    }

    return (
      <main>
        <HeroSection
          onBookClick={() => handleBookSession()}
          onPortfolioClick={() => {
            document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <section id="portfolio" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
                {t.portfolio.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.portfolio.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  title={cat.title}
                  description={cat.description}
                  image={cat.image}
                  onViewClick={() => handleNavigate(`portfolio-${cat.id}`)}
                  onBookClick={() => handleBookSession(cat.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <AboutSection onBookClick={() => handleBookSession()} />

        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-light mb-6">
              {t.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <Button
              size="lg"
              onClick={() => handleBookSession()}
              data-testid="button-cta-book"
            >
              {t.cta.bookNow}
            </Button>
          </div>
        </section>

        <Footer onNavigate={handleNavigate} />

        <Button
          variant="default"
          className="fixed bottom-6 end-6 z-50 shadow-lg"
          onClick={() => handleNavigate("admin")}
          data-testid="button-admin"
        >
          <Settings className="h-4 w-4 me-2" />
          {t.admin}
        </Button>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== "admin" && (
        <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
