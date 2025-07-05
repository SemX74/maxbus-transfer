import { motion } from "framer-motion";
import { MapPin, Clock, Bus } from "lucide-react";
import { useTranslations } from "next-intl";
import Logo from "@/assets/logo.svg";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Logo className="h-12 mb-6 text-primary" />
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                {t("footer.alternativeDescription")}
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>{t("footer.address")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <span>{t("footer.availability")}</span>
                </div>
                <div className="flex items-center">
                  <Bus className="h-5 w-5 text-primary mr-3" />
                  <span>{t("footer.fleet")}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-secondary-foreground/60 text-sm">
              © 2025 {t("footer.company")}. {t("footer.rights")}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
