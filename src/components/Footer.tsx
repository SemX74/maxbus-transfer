import { motion } from "framer-motion";
import { MapPin, Clock, Bus } from "lucide-react";
import { useTranslations } from "next-intl";
import Logo from "@/assets/logo.svg";

const Footer = () => {
  const t = useTranslations();

  const quickLinks = [
    t("navigation.bookNow"),
    "Our Fleet",
    t("navigation.routes"),
    "Corporate Services",
    "Airport Transfers",
    "Group Bookings",
  ];

  const supportLinks = [
    "Help Center",
    t("navigation.contact"),
    "Live Chat",
    "Track Your Bus",
    "Cancellation Policy",
    "Safety Guidelines",
  ];

  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Logo className="h-12 mb-6 text-primary" />
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed max-w-md">
                {t("footer.alternativeDescription")}
              </p>

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

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="mt-8 space-y-2">
                <div className="text-white font-semibold">24/7 Hotline:</div>
                <div className="text-2xl font-bold text-primary">
                  +1 (555) 123-4567
                </div>
                <div className="text-secondary-foreground/80">
                  support@maxbustransfer.com
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
              © 2024 {t("footer.company")}. {t("footer.rights")}
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
