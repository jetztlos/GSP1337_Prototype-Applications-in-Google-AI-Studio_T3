
import React, { useState, useCallback, FormEvent } from 'react';
import { generateItinerary } from './services/geminiService';
import { Itinerary } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ItineraryDisplay from './components/ItineraryDisplay';

const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!city.trim()) {
            setError("Please enter a city name.");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setItinerary(null);

        try {
            const result = await generateItinerary(city);
            setItinerary(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [city]);
    
    const WelcomeContent: React.FC = () => (
        <div className="text-center p-8 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">Ready for an adventure?</h2>
            <p className="text-gray-500 dark:text-gray-300">Enter a city above and click "Generate Itinerary" to get your personalized 3-day travel plan.</p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans text-gray-900 dark:text-gray-100">
            <main className="container mx-auto max-w-4xl">
                <Header />
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g., Tokyo, Paris, Rome..."
                            className="flex-grow w-full px-4 py-3 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generating...' : 'Generate Itinerary'}
                        </button>
                    </form>
                    
                    <div className="mt-4">
                        {isLoading && <LoadingSpinner />}
                        {error && <ErrorMessage message={error} />}
                        {itinerary && <ItineraryDisplay itinerary={itinerary} />}
                        {!isLoading && !error && !itinerary && <WelcomeContent />}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
