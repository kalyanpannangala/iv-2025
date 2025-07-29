"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  MapPin,
  Clock,
  Users,
  Calendar,
  ChevronDown,
  Navigation,
  Heart,
  Eye,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Github,
  Linkedin,
  Smartphone,
  Star,
  Info,
  Mountain,
  Camera,
  TreePine,
  Building,
  Waves,
  Flower2,
  ArrowRight,
} from "lucide-react";

// Enhanced data for visiting places with Google Maps integration
const visitingPlaces = [
  {
    id: 1,
    name: "Radio Astronomy Centre",
    location: "Ooty, Tamil Nadu",
    description:
      "India's premier radio astronomy facility featuring giant telescopes that explore the mysteries of the universe. A fascinating glimpse into cutting-edge space research.",
    image: "http://rac.ncra.tifr.res.in/images/rac_images/rac-gate1.jpg",
    details:
      "Established by the Tata Institute of Fundamental Research, this center houses the Ooty Radio Telescope - one of the largest radio telescopes in the world.",
    mapUrl: "https://maps.google.com/?q=Radio+Astronomy+Centre+Ooty",
    category: "Technology",
    icon: Building,
    highlights: [
      "Giant Radio Telescopes",
      "Space Research Center",
      "Scientific Innovation",
    ],
  },
  {
    id: 2,
    name: "Doddabetta Peak",
    location: "Ooty, Tamil Nadu",
    description:
      "The highest mountain peak in the Nilgiris at 2,637 meters, offering breathtaking panoramic views of the surrounding valleys and tea estates.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/3d/3d/ce/doddabetta-peak.jpg?w=1100&h=600&s=1",
    details:
      "Experience the thrill of standing atop South India's highest peak with telescopic views of the beautiful Nilgiri landscape stretching for miles.",
    mapUrl: "https://maps.google.com/?q=Doddabetta+Peak+Ooty",
    category: "Nature",
    icon: Mountain,
    highlights: [
      "Highest Peak in Nilgiris",
      "Telescopic Views",
      "Mountain Adventure",
    ],
  },
  {
    id: 3,
    name: "Tea Factory & Museum",
    location: "Ooty, Tamil Nadu",
    description:
      "Discover the fascinating journey of tea from leaf to cup at this working tea factory. Learn about traditional tea processing methods and sample premium Nilgiri teas.",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-o/07/4d/e4/b7/dodabetta-tea-museum.jpg",
    details:
      "Watch the complete tea manufacturing process and understand how Ooty's unique climate creates some of the world's finest tea varieties.",
    mapUrl: "https://maps.google.com/?q=Tea+Factory+Museum+Ooty",
    category: "Culture",
    icon: TreePine,
    highlights: [
      "Tea Processing Tour",
      "Premium Tea Tasting",
      "Traditional Methods",
    ],
  },
  {
    id: 4,
    name: "Ooty Botanical Gardens",
    location: "Ooty, Tamil Nadu",
    description:
      "A 55-acre paradise established in 1848, home to rare trees, exotic ferns, and a 20-million-year-old fossilized tree trunk that tells ancient stories.",
    image:
      "https://scontent.fhyd14-2.fna.fbcdn.net/v/t39.30808-6/475271722_618993217191172_1440793912567144003_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=HTGMW8YcC7MQ7kNvwErwD-_&_nc_oc=AdlReilNjF4I7yv1DieuId7-t3_0ZpsynDp3byWNhUeJI0qPN8vSVYkfybLElZ6lc6xbvFzySwsv3QN1RfTxv7g7&_nc_zt=23&_nc_ht=scontent.fhyd14-2.fna&_nc_gid=7yOvgVR-bOGoeM4reo2YSA&oh=00_AfRRLf_i5aQUqCPyuDy_rTW6c3wGNc9nFIZb20mwJqiE8w&oe=688A82BE",
    details:
      "Explore diverse flora from around the world, including rare species of plants, beautiful flower beds, and the famous fossil tree trunk.",
    mapUrl: "https://maps.google.com/?q=Government+Botanical+Garden+Ooty",
    category: "Nature",
    icon: Flower2,
    highlights: [
      "Rare Plant Species",
      "20-Million-Year Fossil",
      "Historic Garden",
    ],
  },
  {
    id: 5,
    name: "Ooty Lake",
    location: "Ooty, Tamil Nadu",
    description:
      "A serene artificial lake built in 1824, perfect for boating adventures surrounded by eucalyptus trees and stunning mountain backdrop views.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/72/6e/a0/ooty-lake.jpg?w=1400&h=800&s=1",
    details:
      "Enjoy peaceful boat rides while surrounded by the natural beauty of the Nilgiris, with options for paddle boats and rowboats.",
    mapUrl: "https://maps.google.com/?q=Ooty+Lake+Tamil+Nadu",
    category: "Recreation",
    icon: Waves,
    highlights: ["Boating Experience", "Mountain Views", "Historic Lake"],
  },
  {
    id: 6,
    name: "Maruthamalai Temple",
    location: "Coimbatore, Tamil Nadu",
    description:
      "Ancient hilltop temple dedicated to Lord Murugan, accessible by climbing 800 steps. Offers spiritual serenity and panoramic city views.",
    image:
      "https://www.connectingtraveller.com/images/localtip/1656664309images%20(9).jpeg",
    details:
      "This sacred temple atop Marudhamalai hill provides a spiritual experience combined with stunning views of Coimbatore city.",
    mapUrl: "https://maps.google.com/?q=Maruthamalai+Murugan+Temple+Coimbatore",
    category: "Spiritual",
    icon: Mountain,
    highlights: ["800-Step Climb", "Spiritual Experience", "City Panorama"],
  },
  {
    id: 7,
    name: "Gass Forest Museum",
    location: "Coimbatore, Tamil Nadu",
    description:
      "A unique museum showcasing the rich biodiversity of the Western Ghats with rare specimens, wildlife exhibits, and conservation displays.",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nobk1tDEHiwx0YKSszGGSRe5fZmTcpCy33ubUiRtHORwDeJ2rUJPMWam-aHFDPk00cYzJaN-9QJyHLirgIBv6pLKYFEsvKIKq57vVQqVck8QJlImVXbQbgFlHTPJQ4SIlOxzzFqi5CboJMO=s1360-w1360-h1020-rw",
    details:
      "Explore the fascinating world of Western Ghats biodiversity through interactive exhibits and learn about forest conservation efforts.",
    mapUrl: "https://maps.google.com/?q=Gass+Forest+Museum+Coimbatore",
    category: "Education",
    icon: TreePine,
    highlights: [
      "Wildlife Exhibits",
      "Biodiversity Display",
      "Conservation Education",
    ],
  },
  {
    id: 8,
    name: "Kovai Kutralam Waterfalls",
    location: "Coimbatore, Tamil Nadu",
    description:
      "Magnificent 300-foot waterfall cascading through dense forest, often called the 'Niagara of South India' for its spectacular beauty.",
    image:
      "/kovaikutralam.webp",
    details:
      "Experience the raw power and beauty of nature as water cascades down rocky cliffs surrounded by lush greenery and misty atmosphere.",
    mapUrl: "https://maps.google.com/?q=Kovai+Kutralam+Falls+Coimbatore",
    category: "Nature",
    icon: Waves,
    highlights: ["300-Foot Waterfall", "Dense Forest Trek", "Natural Swimming"],
  },
  {
    id: 9,
    name: "Isha Foundation",
    location: "Coimbatore, Tamil Nadu",
    description:
      "World-renowned spiritual center featuring the mystical Dhyanalinga temple and the awe-inspiring 112-foot Adiyogi Shiva statue.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/3d/72/e9/caption.jpg?w=1200&h=-1&s=1",
    details:
      "Experience inner peace at this spiritual oasis, home to powerful energy centers and the world's largest bust sculpture recognized by Guinness World Records.",
    mapUrl: "https://maps.google.com/?q=Isha+Foundation+Coimbatore",
    category: "Spiritual",
    icon: Heart,
    highlights: [
      "Dhyanalinga Temple",
      "112-Foot Adiyogi",
      "Spiritual Programs",
    ],
  },
];

// Schedule data
const schedule = [
  {
    day: "Day-01",
    date: "Thursday (31-07-2025)",
    events: [
      { time: "3:30 pm", description: "Starts at Tirupati" },
      { time: "4:30 pm", description: "Reach to Puttur" },
      {
        time: "4:45 pm",
        description: "Departure from Puttur (10hrs to Mettupalayam)",
      },
    ],
  },
  {
    day: "Day-02",
    date: "Friday (01-08-2025)",
    events: [
      { time: "3:30 am", description: "Arrival at Mettupalayam" },
      { time: "3:30 am to 5:30 am", description: "Refreshments (2 hrs)" },
      { time: "7:30 am", description: "Arrival at Ooty" },
      { time: "7:30 am to 9:00 am", description: "Breakfast at Ooty" },
      { time: "9:30 am to 11:00 am", description: "Radio Astronomy Centre" },
      {
        time: "11:30 am",
        description: "Site seeing at Ooty (Including Lunch and Dinner)",
      },
      { time: "10:30 pm", description: "Starts to Mettupalayam" },
    ],
    places: [
      "Doddabetta Peak",
      "Tea Factory",
      "Chocolate Factory",
      "Rose Garden",
      "Tree Park",
      "Ooty Lake",
      "Tea Estate",
      "Karnataka Garden",
      "Botanical Garden (Drop)",
    ],
  },
  {
    day: "Day-03",
    date: "Saturday(02-08-2025)",
    events: [
      { time: "12:30 am to 4:00 am", description: "Refreshments" },
      { time: "4:30 am", description: "Starts to Coimbatore" },
      { time: "6:30 am", description: "Maruthamalai Temple" },
      { time: "8:00 am to 9:30 am", description: "Breakfast" },
      { time: "10:30 am", description: "Gass Forest Museum" },
      { time: "12:00 pm to 1:30 pm", description: "Lunch Break" },
      { time: "2:30 pm", description: "Kovai kutralam Waterfalls" },
      { time: "5:30 pm", description: "Isha Foundation" },
      { time: "9:00 pm", description: "Dinner at CNBT" },
    ],
  },
  {
    day: "Day-04",
    date: "Sunday(03-08-2025)",
    events: [
      { time: "9:00 am", description: "Arrives Puttur" },
      { time: "10:30 am", description: "Arrives Tirupati" },
    ],
  },
];

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const itineraryRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Mobile detection with proper cleanup
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check for saved modal state
    const savedModalState = sessionStorage.getItem("hasShownModal");
    if (savedModalState === "true") {
      setHasShownModal(true);
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Countdown timer logic
    const targetDate = new Date("2025-07-29T23:59:59");
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    // Intersection Observer for modal trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !hasShownModal &&
            new Date() < new Date("2025-07-29T23:59:59")
          ) {
            setTimeout(() => {
              setShowModal(true);
              setHasShownModal(true);
              sessionStorage.setItem("hasShownModal", "true");
            }, 2000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (itineraryRef.current) {
      observer.observe(itineraryRef.current);
    }

    // Video fallback timer - if video doesn't load within 5 seconds, show banner
    const videoFallbackTimer = setTimeout(() => {
      if (!videoLoaded && !hasVideoEnded) {
        console.log("Video loading timeout, showing banner");
        setVideoLoaded(true);
        setHasVideoEnded(true);
        setIsVideoPlaying(false);
      }
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      clearInterval(countdownTimer);
      clearTimeout(videoFallbackTimer);
      observer.disconnect();
    };
  }, [hasShownModal, videoLoaded, hasVideoEnded]);

  // Consolidated video autoplay effect
  useEffect(() => {
    if (!videoRef.current || !videoLoaded || hasVideoEnded) return;

    const attemptAutoplay = async () => {
      try {
        console.log("Attempting video autoplay");
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        video.muted = true; // Required for autoplay in most browsers

        await video.play();
        setIsVideoPlaying(true);
        console.log("Video autoplay successful");
      } catch (error) {
        console.log("Video autoplay failed, showing banner:", error);
        setIsVideoPlaying(false);
        setHasVideoEnded(true);
      }
    };

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(attemptAutoplay, 100);
    return () => clearTimeout(timeout);
  }, [videoLoaded, hasVideoEnded]);

  // Handle video load and autoplay
  const handleVideoLoad = () => {
    console.log("Video data loaded");
    setVideoLoaded(true);
  };

  const handleVideoError = (error: any) => {
    console.log("Video failed to load:", error);
    setIsVideoPlaying(false);
    setHasVideoEnded(true);
    setVideoLoaded(true); // Set to true to hide loading indicator
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play");
    // Don't autoplay here, let the useEffect handle it
    setVideoLoaded(true);
  };

  const handleVideoEnded = () => {
    console.log("Video ended");
    setIsVideoPlaying(false);
    setHasVideoEnded(true);
  };

  const playVideoFromStart = async () => {
    if (videoRef.current) {
      try {
        console.log("Attempting to play video from start");

        // Reset states first
        setHasVideoEnded(false);
        setIsVideoPlaying(false);

        // Reset video to start
        videoRef.current.currentTime = 0;

        // Attempt to play
        await videoRef.current.play();
        setIsVideoPlaying(true);
        console.log("Video playing from start");
      } catch (error) {
        console.log("Video play failed:", error);
        setIsVideoPlaying(false);
        setHasVideoEnded(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white font-sans overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-indigo-700/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-700/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", stiffness: 30 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-700/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015,
          }}
          transition={{ type: "spring", stiffness: 40 }}
        />
      </div>

      {/* Countdown Modal */}
      <AnimatePresence>
        {showModal &&
          !hasShownModal &&
          new Date() < new Date("2025-07-29T23:59:59") && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowModal(false);
                setHasShownModal(true);
                sessionStorage.setItem("hasShownModal", "true");
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 max-w-md mx-4"
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    ⏰ Limited Time Offer!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Registration closes soon! Contact your class in-charge to
                    secure your spot for this amazing journey.
                  </p>

                  {/* Countdown Display */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-3"
                      >
                        <div className="text-2xl font-bold text-white">
                          {item.value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs text-blue-200">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowModal(false);
                        setHasShownModal(true);
                        sessionStorage.setItem("hasShownModal", "true");
                      }}
                    >
                      Register Now!
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowModal(false);
                        setHasShownModal(true);
                        sessionStorage.setItem("hasShownModal", "true");
                      }}
                    >
                      Later
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Enhanced Mobile-First Responsive Navigation */}
      <AnimatePresence>
        {(hasVideoEnded || isMobile) && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/10 shadow-2xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Mobile-optimized container */}
            <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
              <div className="flex items-center justify-between h-12 sm:h-14">
                {/* Logo Section - Optimized for mobile */}
                <motion.div
                  className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src="/favicon.ico"
                      alt="Logo"
                      className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg"
                    />
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>

                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg lg:text-xl font-black bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent leading-tight">
                      Industrial Visit 2025
                    </span>
                    <span className="text-xs text-blue-300/80 font-medium hidden sm:block leading-none">
                      Dept of CSE - Siddartha Institute of Science and Technology
                    </span>
                  </div>
                </motion.div>

                {/* Navigation Buttons - Mobile Optimized */}
                <motion.div
                  className="flex items-center space-x-2 sm:space-x-3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                >
                  {/* Home Button - Compact for mobile */}
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -1,
                      boxShadow: "0 8px 25px rgba(255,255,255,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-white/5 hover:bg-white/15 backdrop-blur-md text-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/10 hover:border-white/30 font-medium text-xs sm:text-sm lg:text-base tracking-wide transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                      <span className="hidden sm:inline">🏠</span>
                      <span>Home</span>
                    </span>
                  </motion.button>

                  {/* GPS Button - Enhanced for mobile */}
                  <Link href="/gps">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        y: -1,
                        boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-gradient-to-r from-emerald-500/70 to-teal-600/70 hover:from-emerald-500/90 hover:to-teal-600/90 backdrop-blur-md text-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-emerald-400/30 hover:border-emerald-400/60 font-medium text-xs sm:text-sm lg:text-base tracking-wide transition-all duration-300 overflow-hidden shadow-lg"
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />

                      {/* Content with responsive text */}
                      <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>

                        {/* Responsive text */}
                        <span className="hidden min-[380px]:inline sm:hidden lg:inline">
                          GPS Tracker
                        </span>
                        <span className="min-[380px]:hidden sm:inline lg:hidden">
                          GPS
                        </span>
                        <span className="hidden sm:hidden min-[380px]:hidden">
                          📍
                        </span>
                      </span>
                    </motion.button>
                  </Link>

                  {/* Mobile Menu Indicator - Shows current page */}


                </motion.div>

              </div>

              {/* Subtle bottom border animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Full Screen Video Hero Section - Responsive */}
      <div
        className={`relative w-full overflow-hidden ${isMobile ? "h-[70vh] min-h-[500px]" : "h-screen"
          }`}
      >
        {/* Video Loading Indicator - only show when video is not loaded and not ended */}
        {!videoLoaded && (
          <motion.div
            className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center text-white">
              <motion.div
                className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-xl font-semibold">Loading Video...</p>
              <p className="text-sm text-gray-400 mt-2">
                Preparing your amazing journey
              </p>
            </div>
          </motion.div>
        )}

        {/* Video Container with responsive padding for mobile navbar */}
        <div className="absolute inset-0 w-full h-full">
          {/* Video element - responsive */}
          <video
            ref={videoRef}
            className={`w-full ${isMobile ? "h-full object-cover" : "h-full object-cover"
              } transition-opacity duration-500 ${hasVideoEnded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            style={{
              paddingTop: isMobile ? "60px" : "0",
              aspectRatio: isMobile ? "16/9" : "auto",
              minHeight: isMobile ? "400px" : "auto",
              objectPosition: isMobile ? "center top" : "center center",
            }}
            autoPlay
            muted
            playsInline
            loop={false}
            controls={false}
            preload="metadata"
            poster="/Banner.jpg"
            onLoadedData={handleVideoLoad}
            onLoadedMetadata={() => {
              console.log("Video metadata loaded");
              setVideoLoaded(true);
            }}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onCanPlay={handleVideoCanPlay}
            onPlay={() => {
              console.log("Video started playing");
              setIsVideoPlaying(true);
            }}
            onPause={() => {
              console.log("Video paused");
              setIsVideoPlaying(false);
            }}
            onWaiting={() => {
              console.log("Video is waiting for data");
            }}
            onPlaying={() => {
              console.log("Video is playing");
              setIsVideoPlaying(true);
            }}
            onLoadStart={() => {
              console.log("Video load started");
            }}
            onProgress={() => {
              console.log("Video loading progress");
            }}
          >
            <source src="/Hero.mp4" type="video/mp4" />
            <source src="/Hero.webm" type="video/webm" />
            {/* Fallback for when video fails to load */}
            Your browser does not support the video tag.
          </video>

          {/* Banner with content - only show when video has ended */}
          {hasVideoEnded && (
            <motion.div
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat ${isMobile ? "bg-[center_30%]" : "bg-center"
                }`}
              style={{
                backgroundImage: "url('/Banner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: isMobile ? "center 30%" : "center center",
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content overlay when video has ended - with mobile padding */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  paddingTop: isMobile ? "60px" : "0",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    Ooty & Coimbatore
                  </motion.h1>

                  <motion.h2
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    Industrial Visit Experience
                  </motion.h2>

                  <motion.p
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-4 sm:mb-6 leading-relaxed px-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  >
                    Journey through the Queen of Hill Stations and the
                    Manchester of South India
                  </motion.p>

                  {/* Quick action buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
                      onClick={() =>
                        document
                          .getElementById("itinerary")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      View Itinerary
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 text-sm sm:text-base flex items-center justify-center space-x-2"
                      onClick={playVideoFromStart}
                    >
                      <Play className="w-4 h-4" />
                      <span>Watch Video</span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Video Play Button (when video has ended) - Responsive */}
        {hasVideoEnded && (
          <motion.button
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/40 transition-all duration-300 group shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playVideoFromStart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white ml-2 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}

        {/* Enhanced Scroll Indicator - Responsive */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex flex-col items-center text-white/70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs sm:text-sm mb-1 sm:mb-2 font-medium hidden sm:block">
            Scroll Down
          </span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>

        {/* Video Controls Overlay (only visible during video playback) */}
        {isVideoPlaying && !hasVideoEnded && videoLoaded && (
          <motion.div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 flex items-center space-x-3 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/60 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                  setIsVideoPlaying(false);
                  setHasVideoEnded(true);
                }
              }}
            >
              <span className="text-white text-lg">⏸</span>
            </motion.button>

            <div className="hidden sm:flex items-center text-white/80 text-xs sm:text-sm bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Playing Hero Video
            </div>
          </motion.div>
        )}

        {/* Skip Video Button (appears after a few seconds of playback) */}
        {isVideoPlaying && !hasVideoEnded && videoLoaded && (
          <motion.button
            className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-black/60 transition-all duration-300 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
                setHasVideoEnded(true);
              }
            }}
          >
            Skip Video
          </motion.button>
        )}
      </div>

      {/* Clean Travel Experience Section */}
      <div className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Clean Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-400/30"
              whileHover={{ scale: 1.05 }}
            >
              ✨ TRAVEL EXPERIENCES
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beyond the Classroom
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create lifelong memories with your squad as we explore stunning
              destinations and discover the beauty of South India together.
            </motion.p>
          </motion.div>

          {/* Main Travel Image Feature */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Travel Image */}
              <motion.img
                src="/Travel.avif"
                alt="Travel Experience"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Floating Content */}
              <motion.div
                className="absolute bottom-8 left-8 right-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Camera className="w-6 h-6" />,
                      title: "Capture Moments",
                      desc: "Instagram-worthy shots at every turn",
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Squad Goals",
                      desc: "Bond with your classmates forever",
                    },
                    {
                      icon: <MapPin className="w-6 h-6" />,
                      title: "Epic Destinations",
                      desc: "Explore South India's treasures",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-blue-300">{item.icon}</div>
                        <h3 className="text-white font-semibold text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                whileHover={{ rotate: 10, scale: 1.1 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-red-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Clean Experience Highlights */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                icon: <Mountain className="w-8 h-8" />,
                title: "Scenic Routes",
                desc: "Mountain views",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Perfect Shots",
                desc: "Photo moments",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <TreePine className="w-8 h-8" />,
                title: "Nature Trails",
                desc: "Forest walks",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: <Waves className="w-8 h-8" />,
                title: "Adventure",
                desc: "Thrilling experiences",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group text-center p-6 bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Clean Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl text-lg shadow-xl relative overflow-hidden border border-blue-500/30"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("itinerary")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Join The Adventure</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Subtle hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Revolutionary Journey Timeline */}
      <div
        id="itinerary"
        className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-full border border-blue-400/30 mb-8"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="w-6 h-6 text-blue-300" />
              </motion.div>
              <span className="text-blue-200 font-semibold text-lg">
                DETAILED JOURNEY TIMELINE
              </span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-8xl font-black mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Epic
              </span>
              <br />
              <span className="text-white">Adventure</span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Follow our meticulously planned 4-day journey through Tamil Nadu's
              technological marvels and breathtaking landscapes
            </motion.p>
          </motion.div>

          {/* Revolutionary Day Navigation */}
          <motion.div
            className="flex justify-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>

              <div className="relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-gray-700/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {schedule.map((day, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveDay(index)}
                      className={`relative px-6 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden group ${activeDay === index
                        ? "text-white shadow-2xl"
                        : "text-gray-400 hover:text-white"
                        }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${index === 0
                          ? "from-blue-500 to-cyan-500"
                          : index === 1
                            ? "from-purple-500 to-pink-500"
                            : index === 2
                              ? "from-emerald-500 to-teal-500"
                              : "from-orange-500 to-red-500"
                          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        animate={
                          activeDay === index ? { opacity: 1 } : { opacity: 0 }
                        }
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-sm opacity-80 mb-1">
                          {day.day.split("-")[1]}
                        </div>
                        <div className="text-lg font-black">
                          Day {index + 1}
                        </div>
                      </div>

                      {/* Animated border */}
                      {activeDay === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-white/50"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spectacular Timeline Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                {/* Main Timeline Card */}
                <div className="relative bg-gray-900/60 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-gray-700/50 overflow-hidden">
                  {/* Dynamic Header */}
                  <div
                    className={`relative p-8 bg-gradient-to-r ${activeDay === 0
                      ? "from-blue-600 via-cyan-600 to-blue-700"
                      : activeDay === 1
                        ? "from-purple-600 via-pink-600 to-purple-700"
                        : activeDay === 2
                          ? "from-emerald-600 via-teal-600 to-emerald-700"
                          : "from-orange-600 via-red-600 to-orange-700"
                      } text-white overflow-hidden`}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <motion.div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"
                        animate={{
                          background: [
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 70%)",
                            "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3), transparent 70%)",
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 70%)",
                          ],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <motion.h3
                          className="text-4xl md:text-5xl font-black mb-3"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {schedule[activeDay].day}
                        </motion.h3>
                        <motion.p
                          className="text-xl opacity-90 font-medium"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {schedule[activeDay].date}
                        </motion.p>
                      </div>

                      <motion.div
                        className="text-8xl md:text-9xl font-black opacity-20"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {String(activeDay + 1).padStart(2, "0")}
                      </motion.div>
                    </div>
                  </div>

                  {/* Timeline Events */}
                  <div className="p-8">
                    <div className="relative">
                      {/* Vertical timeline line */}
                      <div className="absolute left-16 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30"></div>

                      <div className="space-y-8">
                        {schedule[activeDay].events.map((event, eventIndex) => (
                          <motion.div
                            key={eventIndex}
                            className="relative flex items-center group"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: eventIndex * 0.15 + 0.4 }}
                          >
                            {/* Timeline dot */}
                            <motion.div
                              className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg z-10 ${activeDay === 0
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                : activeDay === 1
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                  : activeDay === 2
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                    : "bg-gradient-to-r from-orange-500 to-red-500"
                                }`}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Clock className="w-6 h-6" />
                            </motion.div>

                            {/* Event card */}
                            <motion.div
                              className="flex-1 ml-8 p-6 bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300"
                              whileHover={{ y: -5, scale: 1.02 }}
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-bold mb-2 ${activeDay === 0
                                      ? "text-cyan-300"
                                      : activeDay === 1
                                        ? "text-pink-300"
                                        : activeDay === 2
                                          ? "text-teal-300"
                                          : "text-orange-300"
                                      }`}
                                  >
                                    {event.time}
                                  </div>
                                  <p className="text-gray-200 font-medium text-lg leading-relaxed">
                                    {event.description}
                                  </p>
                                </div>

                                {/* Animated icon */}
                                <motion.div
                                  className="mt-4 md:mt-0 md:ml-6"
                                  animate={{ rotate: [0, 10, 0] }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                >
                                  <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeDay === 0
                                      ? "bg-blue-500/20 text-blue-300"
                                      : activeDay === 1
                                        ? "bg-purple-500/20 text-purple-300"
                                        : activeDay === 2
                                          ? "bg-emerald-500/20 text-emerald-300"
                                          : "bg-orange-500/20 text-orange-300"
                                      }`}
                                  >
                                    {eventIndex % 4 === 0
                                      ? "🚌"
                                      : eventIndex % 4 === 1
                                        ? "🍽️"
                                        : eventIndex % 4 === 2
                                          ? "🏛️"
                                          : "🌟"}
                                  </div>
                                </motion.div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Special Places Section */}
                    {schedule[activeDay].places && (
                      <motion.div
                        className="mt-12 p-8 bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-center mb-6">
                          <motion.div
                            className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <MapPin className="w-6 h-6 text-white" />
                          </motion.div>
                          <h4 className="text-2xl font-black text-emerald-300">
                            Visiting Places
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {schedule[activeDay].places.map(
                            (place, placeIndex) => (
                              <motion.div
                                key={placeIndex}
                                className="group px-6 py-4 bg-gray-800/60 backdrop-blur-xl text-emerald-200 rounded-2xl font-medium shadow-lg border border-emerald-600/30 hover:border-emerald-400/50 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: placeIndex * 0.1 + 1 }}
                                whileHover={{
                                  scale: 1.05,
                                  y: -3,
                                  boxShadow:
                                    "0 20px 40px rgba(16, 185, 129, 0.2)",
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm md:text-base">
                                    {place}
                                  </span>
                                  <motion.div
                                    className="w-6 h-6 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={{ rotate: 0 }}
                                    whileHover={{ rotate: 180 }}
                                  >
                                    ✨
                                  </motion.div>
                                </div>
                              </motion.div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Floating action elements */}
                <motion.div
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.button
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-2xl"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Journey Progress Indicator */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 px-8 py-4 bg-gray-900/60 backdrop-blur-xl rounded-full border border-gray-700/50">
              <span className="text-gray-300 font-medium">
                Journey Progress:
              </span>
              <div className="flex space-x-2">
                {schedule.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${index <= activeDay
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gray-600"
                      }`}
                    animate={index === activeDay ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ))}
              </div>
              <span className="text-blue-300 font-bold">
                {Math.round(((activeDay + 1) / schedule.length) * 100)}%
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spectacular Destinations Showcase */}
      <div className="py-32 bg-gradient-to-br from-gray-800 via-slate-900 to-black relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/15 to-teal-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-indigo-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-emerald-400/30 mb-8"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <MapPin className="w-6 h-6 text-emerald-300" />
              </motion.div>
              <span className="text-emerald-200 font-semibold text-lg">
                FEATURED DESTINATIONS
              </span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-8xl font-black mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Incredible
              </span>
              <br />
              <span className="text-white">Destinations</span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Explore breathtaking locations, rich heritage sites, and natural
              wonders that showcase the diverse beauty of Tamil Nadu's cultural
              and technological landscape.
            </motion.p>
          </motion.div>

          {/* Enhanced Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {visitingPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                className="group relative bg-gray-900/60 backdrop-blur-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-gray-700/50 transform transition-all duration-700"
                initial={{ opacity: 0, y: 80, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                }}
              >
                {/* Enhanced Image Section */}
                <div className="relative h-72 overflow-hidden">
                  {/* Real place images */}
                  <motion.img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />

                  {/* Dynamic overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Category Badge */}
                  <motion.div
                    className={`absolute top-4 left-4 px-4 py-2 rounded-2xl backdrop-blur-md border font-semibold text-sm ${place.category === "Technology"
                      ? "bg-blue-500/20 border-blue-400/30 text-blue-200"
                      : place.category === "Nature"
                        ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-200"
                        : place.category === "Culture"
                          ? "bg-purple-500/20 border-purple-400/30 text-purple-200"
                          : place.category === "Spiritual"
                            ? "bg-orange-500/20 border-orange-400/30 text-orange-200"
                            : place.category === "Recreation"
                              ? "bg-cyan-500/20 border-cyan-400/30 text-cyan-200"
                              : "bg-pink-500/20 border-pink-400/30 text-pink-200"
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {place.category}
                  </motion.div>

                  {/* Icon Badge */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <place.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Place Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.h3
                      className="text-2xl md:text-3xl font-black text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {place.name}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {place.location}
                    </motion.p>
                  </div>
                </div>

                {/* Enhanced Content Section */}
                <div className="p-8">
                  {/* Description */}
                  <motion.p
                    className="text-gray-300 leading-relaxed mb-6 text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {place.description}
                  </motion.p>

                  {/* Detailed Information */}
                  <motion.div
                    className="mb-6 p-4 bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {place.details}
                      </p>
                    </div>
                  </motion.div>

                  {/* Highlights */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    <h4 className="text-white font-bold text-sm mb-3 flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Key Highlights</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {place.highlights.map((highlight, hIndex) => (
                        <motion.span
                          key={hIndex}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 rounded-full text-xs font-medium border border-emerald-500/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.9 + hIndex * 0.1,
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Button - Only Google Maps */}
                  <div className="flex justify-center">
                    <motion.a
                      href={place.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>View on Maps</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Animated Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, #10b981, #14b8a6, #3b82f6)",
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "border-box",
                  }}
                />

                {/* Floating Particles Effect */}
                {[...Array(3)].map((_, pIndex) => (
                  <motion.div
                    key={pIndex}
                    className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${20 + pIndex * 30}%`,
                      top: `${30 + pIndex * 20}%`,
                    }}
                    animate={{
                      y: [-20, -40, -20],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: pIndex * 0.5,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Enhanced Statistics Section */}
          <motion.div
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              {
                number: "9+",
                label: "Amazing Places",
                icon: MapPin,
                color: "from-emerald-500 to-teal-500",
              },
              {
                number: "4",
                label: "Days Journey",
                icon: Calendar,
                color: "from-blue-500 to-indigo-500",
              },
              {
                number: "105+",
                label: "Students",
                icon: Users,
                color: "from-purple-500 to-pink-500",
              },
              {
                number: "100%",
                label: "Memories",
                icon: Camera,
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-gray-700/50 shadow-xl group"
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  className="text-4xl font-black text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.8,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.number}
                </motion.div>

                <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>

                {/* Animated background pulse */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="py-20 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-800/95 backdrop-blur-xl text-gray-300 relative overflow-hidden border-t border-white/10">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-2xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Main Footer Content */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Section */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-10 h-10 mr-2 drop-shadow-lg"
                style={{ minWidth: '2.5rem' }}
              />
              <div className="text-left">
                <h3 className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                  Industrial Visit 2025
                </h3>
                <p className="text-blue-300 font-medium">
                  Computer Science Engineering - Siddartha Institute of Science and Technology
                </p>
              </div>
            </div>

            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              An unforgettable journey through South India's technological
              marvels and natural wonders, creating memories that will last a
              lifetime.
            </motion.p>

            {/* Quick Links & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Quick Links */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h4 className="text-white font-bold text-lg mb-4 flex items-center justify-center space-x-2">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  <span>Quick Links</span>
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      label: "View Itinerary",
                      action: () =>
                        document
                          .getElementById("itinerary")
                          ?.scrollIntoView({ behavior: "smooth" }),
                    },
                    { label: "Destinations", action: () => { } },
                    { label: "GPS Tracker", href: "/gps" },
                  ].map((link, index) => (
                    <motion.button
                      key={index}
                      onClick={link.action}
                      className="block w-full text-gray-300 hover:text-blue-300 transition-colors duration-300 font-medium"
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h4 className="text-white font-bold text-lg mb-4 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>Contact</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">+91 9440850545</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">College Campus</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <img src="/Travel.png" alt="" className="h-42 mx-auto" />
              </motion.div>
            </div>
          </motion.div>

          {/* Developer Credits Section */}
          <motion.div
            className="border-t border-gray-700/50 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex flex-col items-center space-y-1">
                <p className="text-gray-400 text-sm text-center">
                  © 2025 Industrial Visit Experience. All rights reserved.
                </p>
                <div className="text-gray-400 text-sm flex flex-col items-center sm:flex-row sm:space-x-1">
                  <span className="flex items-center">
                    Crafted with
                    <span className="text-red-400 mx-1">
                      <Heart className="inline w-4 h-4 fill-current" />
                    </span>
                    by
                  </span>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 items-center mt-1 sm:mt-0">
                    <motion.a
                      href="https://www.linkedin.com/in/kalyanpannangala"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm mt-1 sm:mt-0"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-medium">Kalyan Pannangala</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/vaigandladurgesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm mt-1 sm:mt-0"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-medium">Durgesh Vaigandla</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Footer Info */}
          <motion.div
            className="mt-6 pt-6 border-t border-gray-800/50 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3" />
                <span>July 2025 Industrial Visit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3" />
                <span>100+ Students Participating</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>Ooty & Coimbatore</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
