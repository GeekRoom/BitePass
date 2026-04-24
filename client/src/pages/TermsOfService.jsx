import React from "react";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { FileText, CheckCircle2, AlertCircle, Scale, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const TermsOfService = () => {
  const terms = [
    {
      icon: CheckCircle2,
      title: "Acceptance of Terms",
      content: "By accessing or using BitePass, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      icon: Scale,
      title: "Use License",
      content: "BitePass is provided for event management purposes. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from this platform without explicit permission."
    },
    {
      icon: AlertCircle,
      title: "Account Responsibility",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      icon: FileText,
      title: "Termination",
      content: "We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C77DFF]/10 text-[#C77DFF] text-xs font-bold uppercase tracking-widest mb-4">
            <Scale size={14} />
            Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Terms of <span className="text-[#C77DFF] bg-clip-text text-transparent bg-gradient-to-r from-[#7F5AF0] to-[#C77DFF]">Service</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Last updated: April 23, 2026. Please read these terms carefully before using the BitePass platform.
          </p>
        </motion.div>

        <div className="space-y-8">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl hover:shadow-[#C77DFF]/5 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7F5AF0]/20 to-[#C77DFF]/20 rounded-2xl flex items-center justify-center text-[#C77DFF] flex-shrink-0">
                  <term.icon size={24} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {term.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {term.content}
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
          className="mt-16 p-8 rounded-3xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-center"
        >
          <p className="font-medium mb-2">Questions about our Terms?</p>
          <p className="text-sm opacity-70">
            Contact the BitePass team for any clarifications regarding our service agreements.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
