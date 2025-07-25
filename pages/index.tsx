"use client";
import Link from "next/link" ;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Mock data for visiting places
const visitingPlaces = [
  {
    id: 1,
    name: "Radio Astronomy Centre",
    location: "Ooty",
    description: "India's premier radio astronomy facility with giant telescopes exploring the universe.",
    image: "/astro",
  },
  {
    id: 2,
    name: "Doddabetta Peak",
    location: "Ooty",
    description: "The highest mountain in the Nilgiris at 2,637 meters, offering panoramic views of the valley.",
    image: "/peak",
  },
  {
    id: 3,
    name: "Tea Factory & Museum",
    location: "Ooty",
    description: "Discover the art of tea processing and sample the finest Nilgiri tea varieties.",
    image: "/tea",
  },
  {
    id: 4,
    name: "Ooty Botanical Gardens",
    location: "Ooty",
    description: "55-acre garden established in 1848, home to rare trees, ferns, and a fossil tree trunk.",
    image: "/garden",
  },
  {
    id: 5,
    name: "Ooty Lake",
    location: "Ooty",
    description: "Artificial lake built in 1824, popular for boating with stunning mountain views.",
    image: "/lake",
  },
  {
    id: 6,
    name: "Maruthamalai Temple",
    location: "Coimbatore",
    description: "Ancient hill temple dedicated to Lord Murugan, accessible by 800 steps with panoramic views.",
    image: "/temple",
  },
  {
    id: 7,
    name: "Gass Forest Museum",
    location: "Coimbatore",
    description: "Museum showcasing the biodiversity of the Western Ghats with rare specimens.",
    image: "/museum",
  },
  {
    id: 8,
    name: "Kovai Kutralam Waterfalls",
    location: "Coimbatore",
    description: "Stunning 300-ft waterfall nestled in dense forest, known as the Niagara of South India.",
    image: "/waterfall",
  },
  {
    id: 9,
    name: "Isha Foundation",
    location: "Coimbatore",
    description: "Spiritual center featuring the iconic Dhyanalinga Yogic Temple and Adiyogi Shiva statue.",
    image: "/isha",
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
      { time: "4:45 pm", description: "Departure from Puttur (10hrs to Mettupalayam)" },
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
      { time: "11:30 am", description: "Site seeing at Ooty (Including Lunch and Dinner)" },
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
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans overflow-x-hidden">
      {/* Premium Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-center backdrop-blur-sm bg-white/80"
       
      >
         <div className="flex space-x-8">
        
        <img src="/favicon.ico" alt="Logo" className="flex space-x-8" />
      
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-lg font-medium tracking-wide transition-all duration-300 hover:shadow-xl"
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg font-medium tracking-wide transition-all duration-300 hover:shadow-xl"
          >
            <Link href="/gps">
            GPS Tracker
            </Link>
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-100/30 z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <motion.div 
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Ooty & Coimbatore
            </motion.h1>
            <motion.h2 
              className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Industrial Visit Experience
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Journey through the Queen of Hill Stations and the Manchester of South India
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-700">Duration</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">4 Days</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-700">Dates</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">Jul 31 - Aug 3, 2025</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-700">Participants</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">45 Students</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Trip Schedule */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Journey Itinerary
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-indigo-400 to-purple-300 transform -translate-x-1/2"></div>
            
            {schedule.map((day, index) => (
              <motion.div 
                key={index}
                className={`relative mb-16 md:mb-24 ${index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'} pl-16 md:pl-0`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                    <h3 className="text-2xl font-bold text-white">{day.day}</h3>
                    <p className="text-blue-100">{day.date}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex">
                          <div className="font-medium text-blue-600 min-w-[120px]">{event.time}</div>
                          <div className="text-gray-700">{event.description}</div>
                        </div>
                      ))}
                    </div>
                    
                    {day.places && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-3">Visiting Places:</h4>
                        <div className="flex flex-wrap gap-2">
                          {day.places.map((place, placeIndex) => (
                            <span key={placeIndex} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                              {place}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Visiting Places Section */}
      <div className="py-24 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Destinations
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Discover the breathtaking locations we'll explore during our journey
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visitingPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-56 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{place.name}</h3>
                      <div className="flex items-center mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-300 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-teal-200">{place.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{place.description}</p>
                  <button className="mt-6 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready for an Unforgettable Journey?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Track our journey in real-time and stay updated with our progress
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 font-bold rounded-full text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              View Real-time GPS Tracking
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg mb-6">Department of CSE Industrial Visit</p>
          <p className="text-sm text-center">
  © 2025. All rights reserved.
   Developed by{" "}
  <a
    href="https://www.linkedin.com/in/kalyanpannangala"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    Kalyan Pannangala
  </a>{" "}
  &{" "}
  <a
    href="https://www.linkedin.com/in/vaigandladurgesh"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    Durgesh Vaigandla
  </a>
</p>

        </div>
      </footer>
    </div>
  );
};

export default HomePage;