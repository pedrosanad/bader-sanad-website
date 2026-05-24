import { CategoryCard } from "../CategoryCard";
import portraitImage from "@assets/generated_images/portrait_photography_sample.png";

export default function CategoryCardExample() {
  return (
    <div className="max-w-md">
      <CategoryCard
        title="Portrait"
        description="Professional portrait photography capturing your unique personality and style."
        image={portraitImage}
        onViewClick={() => console.log("View Portrait Gallery")}
        onBookClick={() => console.log("Book Portrait Session")}
      />
    </div>
  );
}
