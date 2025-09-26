
import React from 'react';
import { Itinerary, ItineraryDay } from '../types';

const ClockIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const InfoIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ItineraryDayCard: React.FC<{ dayData: ItineraryDay }> = ({ dayData }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-xl">
    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">Day {dayData.day}</h3>
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 italic">"{dayData.theme}"</p>
    <div className="space-y-4">
      {dayData.activities.map((activity, index) => (
        <div key={index} className="pl-4 border-l-4 border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-1">
            <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="font-semibold text-gray-800 dark:text-gray-200">{activity.time}</p>
          </div>
          <p className="font-bold text-lg text-gray-900 dark:text-white">{activity.description}</p>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <LocationIcon className="h-5 w-5" />
            <span>{activity.location}</span>
          </div>
          {activity.details && (
            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
              <InfoIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{activity.details}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  return (
    <div className="mt-8 animate-fade-in">
      <header className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">{itinerary.city}</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400">{itinerary.country}</p>
      </header>
      <div className="space-y-6">
        {itinerary.days.map(day => (
          <ItineraryDayCard key={day.day} dayData={day} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
