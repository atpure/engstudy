import { useState, useEffect } from 'react';
import type { Word } from '../types';
import { RotateCcw, AlertTriangle, ThumbsUp, Calendar } from 'lucide-react';

interface CardProps {
    word: Word;
    onRate: (rating: 'again' | 'hard' | 'good' | 'easy') => void;
}

export function Card({ word, onRate }: CardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // If word changes, reset flip.
    useEffect(() => {
        setIsFlipped(false);
    }, [word.id]);

    const handleFlip = () => setIsFlipped(!isFlipped);

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto perspective-1000">
            <div
                className={`relative w-full h-80 transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                onClick={handleFlip}
            >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-xl flex items-center justify-center p-8 border-2 border-gray-100 dark:border-gray-700">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center break-words">
                        {word.text}
                    </h2>
                    <div className="absolute bottom-4 text-gray-400 text-sm">Tap to flip</div>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-xl flex flex-col items-center justify-center p-8 border-2 border-blue-100 dark:border-gray-700">
                    <div className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
                        <span className="font-semibold block mb-2 text-sm uppercase tracking-wider text-gray-400">Context</span>
                        "{word.originalText}"
                        {/* Note: Showing the WHOLE text as context might be too long if the input was long. 
                For now we assume the input is checked/split reasonable or we clamp it. 
                Ideally we show the sentence surrounding the word. 
                But let's stick to this for MVP. */}
                    </div>
                    {word.definition && (
                        <div className="text-md text-gray-600 dark:text-gray-400 italic">
                            {word.definition}
                        </div>
                    )}
                </div>
            </div>

            {/* Controls - Only visible when flipped or always? Anki shows buttons after answer. */}
            {isFlipped && (
                <div className="mt-8 grid grid-cols-4 gap-2 w-full">
                    <button
                        onClick={(e) => { e.stopPropagation(); onRate('again'); }}
                        className="flex flex-col items-center p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                        <RotateCcw className="w-5 h-5 mb-1" />
                        <span className="text-xs font-bold">Again</span>
                        <span className="text-[10px]">1m</span>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onRate('hard'); }}
                        className="flex flex-col items-center p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                    >
                        <AlertTriangle className="w-5 h-5 mb-1" />
                        <span className="text-xs font-bold">Hard</span>
                        <span className="text-[10px]">6m</span>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onRate('good'); }}
                        className="flex flex-col items-center p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    >
                        <ThumbsUp className="w-5 h-5 mb-1" />
                        <span className="text-xs font-bold">Good</span>
                        <span className="text-[10px]">10m</span>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onRate('easy'); }}
                        className="flex flex-col items-center p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs font-bold">Easy</span>
                        <span className="text-[10px]">4d</span>
                    </button>
                </div>
            )}
        </div>
    );
}
