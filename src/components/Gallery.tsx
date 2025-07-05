import { motion } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const WhyChooseUs = () => {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Array of all available gallery images
  const availableImages = [
    "IMG_6867.jpeg",
    "IMG_6873.jpeg",
    "IMG_6874.jpeg",
    "IMG_6875.jpeg",
    "IMG_6877.jpeg",
    "IMG_6886.jpeg",
    "IMG_6890.jpeg",
    "IMG_6891.jpeg",
    "IMG_6895.jpeg",
    "IMG_6901.jpeg",
    "IMG_6905.jpeg",
    "IMG_6909.jpeg",
    "IMG_6913.jpeg",
    "IMG_6917.jpeg",
    "IMG_6920.jpeg",
    "IMG_6921.jpeg",
    "IMG_6927.jpeg",
    "IMG_6932.jpeg",
    "IMG_6936.jpeg",
    "IMG_6937.jpeg",
    "IMG_6946.jpeg",
    "IMG_6950.jpeg",
    "IMG_6957.jpeg",
    "IMG_6962.jpeg",
    "IMG_7115.jpeg",
  ];

  // Fisher-Yates shuffle algorithm to randomize images
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Memoize the shuffled images so they don't re-shuffle on every render
  const galleryImages = useMemo(() => shuffleArray(availableImages), []);

  const openPopup = (imageName: string) => {
    setSelectedImage(imageName);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Diagonal Shape Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-primary opacity-10 transform -skew-x-12 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-1/4 h-2/3 bg-white opacity-5 transform skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("gallery.title")}{" "}
            <span className="text-primary">{t("gallery.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* Gallery Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            onClick={scrollLeft}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={scrollRight}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryImages.map((imageName, index) => (
              <motion.div
                key={imageName}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group cursor-pointer flex-shrink-0"
                onClick={() => openPopup(imageName)}
              >
                <Card className="overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-sm group-hover:border-primary transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 w-80 h-60">
                  <div className="w-full h-full relative">
                    <Image
                      src={`/gallery/${imageName}`}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="320px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-3">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popup Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={`/gallery/${selectedImage}`}
                  alt="Expanded gallery image"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl object-contain w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
