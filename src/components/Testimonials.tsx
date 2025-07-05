import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Testimonials = () => {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Array of all feedback images
  const feedbackImages = [
    "IMG_4523.JPG",
    "IMG_4525.JPG",
    "IMG_4529.JPG",
    "IMG_4534.JPG",
    "IMG_4535.JPG",
    "IMG_4536.JPG",
    "IMG_4540.JPG",
    "IMG_4541.JPG",
    "IMG_4542.JPG",
    "IMG_4543.JPG",
    "IMG_4544.JPG",
    "IMG_4546.JPG",
    "IMG_4547.JPG",
    "IMG_4548.JPG",
    "IMG_4550.JPG",
    "IMG_4551.JPG",
    "IMG_4552.JPG",
    "IMG_4553.JPG",
    "IMG_4554.JPG",
    "IMG_4555.JPG",
    "IMG_4556.JPG",
    "IMG_4557.JPG",
    "IMG_4558.JPG",
    "IMG_4559.JPG",
    "IMG_4561.JPG",
    "IMG_4562.JPG",
    "IMG_4563.JPG",
    "IMG_4564.JPG",
    "IMG_4565.JPG",
    "IMG_4566.JPG",
    "IMG_4567.JPG",
    "IMG_4568.JPG",
    "IMG_4569.JPG",
    "IMG_4570.JPG",
    "IMG_4571.JPG",
    "IMG_4572.JPG",
    "IMG_4573.JPG",
    "IMG_4574.JPG",
    "IMG_4575.JPG",
    "IMG_4576.JPG",
    "IMG_4577.JPG",
    "IMG_4578.JPG",
    "IMG_4579.JPG",
    "IMG_4580.JPG",
    "IMG_4581.JPG",
    "IMG_4582.JPG",
  ];

  const openPopup = (imageName: string) => {
    setSelectedImage(imageName);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Diagonal Background Elements */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-primary opacity-5 transform skew-x-12 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-secondary opacity-5 transform -skew-x-12 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("testimonials.title")}{" "}
            <span className="text-primary">
              {t("testimonials.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.alternativeSubtitle")}
          </p>
        </motion.div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-0.5">
          {feedbackImages.map((imageName, index) => {
            // Calculate wave delay based on position in grid
            const cols = 10; // Use max columns for consistent calculation
            const row = Math.floor(index / cols);
            const col = index % cols;
            // Create wave effect: diagonal wave from top-left to bottom-right
            const waveDelay =
              row * 0.08 + col * 0.03 + Math.sin((row + col) * 0.5) * 0.02;

            return (
              <motion.div
                key={imageName}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: waveDelay, // Wave-like animation
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openPopup(imageName)}
              >
                <Card className="overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  <div className="aspect-square relative">
                    <Image
                      src={`/feedbacks/${imageName}`}
                      alt={`Customer feedback ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, (max-width: 1280px) 12.5vw, 10vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-2">
                        <svg
                          className="w-4 h-4 text-primary"
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
            );
          })}
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
                  src={`/feedbacks/${selectedImage}`}
                  alt="Expanded customer feedback"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl object-contain w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
