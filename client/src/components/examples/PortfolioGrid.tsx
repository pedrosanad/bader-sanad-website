import { PortfolioGrid } from "../PortfolioGrid";
import portraitImage from "@assets/generated_images/portrait_photography_sample.png";
import eventImage from "@assets/generated_images/event_photography_sample.png";
import commercialImage from "@assets/generated_images/commercial_photography_sample.png";
import headshotImage from "@assets/generated_images/headshot_photography_sample.png";

// todo: remove mock functionality
const mockImages = [
  { id: "1", src: portraitImage, alt: "Portrait 1", category: "portrait" },
  { id: "2", src: eventImage, alt: "Event 1", category: "events" },
  { id: "3", src: commercialImage, alt: "Commercial 1", category: "commercial" },
  { id: "4", src: headshotImage, alt: "Headshot 1", category: "headshots" },
  { id: "5", src: portraitImage, alt: "Portrait 2", category: "portrait" },
  { id: "6", src: eventImage, alt: "Event 2", category: "events" },
];

export default function PortfolioGridExample() {
  return (
    <div className="p-6">
      <PortfolioGrid images={mockImages} />
    </div>
  );
}
