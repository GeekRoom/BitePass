import React from "react";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Shield, Lock, Eye, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect information you provide directly to us when you create an account, such as your name, email address, and any other information you choose to provide. We also collect data related to your event participation and meal redemptions."
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, including processing meal redemptions, communicating with you about events, and ensuring the security of our platform."
    },
    {
      icon: Shield,
      title: "Data Security",
      content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. Your data is stored securely and accessed only by authorized personnel."
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time. If you have any questions or concerns about how your data is being handled, please contact us."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0b14] text-gray-900 dark:text-white transition-colors duration-300 selection:bg-[#7F5AF0]/30 font-inter">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7F5AF0]/10 text-[#7F5AF0] text-xs font-bold uppercase tracking-widest mb-4">
            <Shield size={14} />
            Legal
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Privacy <span className="text-[#C77DFF] bg-clip-text text-transparent bg-gradient-to-r from-[#7F5AF0] to-[#C77DFF]">Policy</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Last updated: April 23, 2026. We value your privacy and are committed to protecting your personal data.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl hover:shadow-[#7F5AF0]/5 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7F5AF0]/20 to-[#C77DFF]/20 rounded-2xl flex items-center justify-center text-[#7F5AF0] flex-shrink-0">
                  <section.icon size={24} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#7F5AF0]/5 to-[#C77DFF]/5 border border-[#7F5AF0]/10 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            By using BitePass, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this policy, please refrain from using our services.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
