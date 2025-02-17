"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// 1) Import EmailJS
import emailjs from "@emailjs/browser";

import type React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: IContactFormProps) {
  // Keep your existing state
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2) Update handleSubmit to use EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the data to EmailJS
      const result = await emailjs.send(
        "service_yxu012j", // e.g., "service_123abc"
        "template_n133h4p", // e.g., "template_xyz"
        {
          // Must match the variable names in your EmailJS template
          email: formData.email,
          message: formData.message,
        },
        "PhHv2V3_T-zyOlRQf" // e.g., "abcdEfghIJKLmnOPQr"
      );

      console.log("EmailJS result:", result.text);
      setIsSubmitted(true);
    } catch (error) {
      console.error("EmailJS error:", error);
      // Optionally show an error message to the user
    }
  };

  // Close the form automatically 5 seconds after successful submission
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg p-8 bg-black border border-white overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-white" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-white" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center">
                <span className="text-2xl mr-2">[</span>
                Contact Us
                <span className="text-2xl ml-2">]</span>
              </h2>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm text-white">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 bg-black border border-white focus:border-gray-300 outline-none transition-colors text-white"
                    required
                  />
                  {/* Corner pseudo-borders */}
                  <div className="absolute -top-px -left-px w-3 h-3 border-l border-t border-white" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-r border-t border-white" />
                  <div className="absolute -bottom-px -left-px w-3 h-3 border-l border-b border-white" />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-r border-b border-white" />
                </div>
              </div>

              {/* Message Selection */}
              <div className="space-y-2">
                <label className="block text-sm text-white">Message</label>
                <div className="relative">
                  <Select
                    value={formData.message}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, message: value }))
                    }
                  >
                    <SelectTrigger className="w-full px-4 py-2 bg-black border border-white focus:border-gray-300 outline-none transition-colors text-white">
                      <SelectValue placeholder="Select a message" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="like">
                        I like my demo site
                      </SelectItem>
                      <SelectItem value="changes">
                        I would like to make some changes
                      </SelectItem>
                      <SelectItem value="questions">
                        I have a few questions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Corner pseudo-borders */}
                  <div className="absolute -top-px -left-px w-3 h-3 border-l border-t border-white" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-r border-t border-white" />
                  <div className="absolute -bottom-px -left-px w-3 h-3 border-l border-b border-white" />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-r border-b border-white" />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full py-3 text-white font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 border border-white">
                  {/* Corner pseudo-borders */}
                  <div className="absolute -top-px -left-px w-3 h-3 border-l border-t border-white" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-r border-t border-white" />
                  <div className="absolute -bottom-px -left-px w-3 h-3 border-l border-b border-white" />
                  <div className="absolute -bottom-px -right-px w-3 h-3 border-r border-b border-white" />
                </div>
                <span className="relative z-10">Submit</span>
              </motion.button>
            </motion.form>
          ) : (
            // Confirmation screen once the email is sent
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center text-white space-y-4"
            >
              <h2 className="text-3xl font-bold">Message sent, thank you</h2>
              <p className="text-lg">We will get back to you soon!</p>
              {/* The "progress bar" that fills over 5 seconds */}
              <motion.div
                className="w-full h-1 bg-white mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
