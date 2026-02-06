import { useState } from 'react';
import type { Word, SRSInterval } from '../types';
import { Card } from './Card';
import { calculateNextReview } from '../lib/srs';

interface FlashcardDataProps {
    initialWords: Word[];
    onExit: () => void;
}

export function FlashcardData({ initialWords, onExit }: FlashcardDataProps) {
    // In a real app, we would fetch due cards from Firestore here.
    // For now, we take the just-generated list and put them in a "Learning" queue.
    const [queue, setQueue] = useState<Word[]>(initialWords);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);

    const currentWord = queue[currentWordIndex];

    const handleRate = (rating: SRSInterval) => {
        if (!currentWord) return;

        // Calculate next review (logic only returns time, but we also handle queue placement here)
        calculateNextReview(currentWord, rating); // Unused in local only version, but would save to DB.

        // Logic for current session:
        // If 'Again' (1m): Re-queue this card soon (e.g. at end of current small batch or plain end of queue).
        // If 'Hard' (6m): Re-queue? Or is 6m long enough to define "done for now"? 
        // Usually < 10m is "learning step".
        // Let's simplified logic: 
        // - Again: Push to end of queue.
        // - Hard/Good/Easy: Remove from queue (Mark as "Done" for this session).
        // wait, "Again" is 1m. "Hard" is 6m. "Good" is 10m.
        // If user wants to study *now*, 1 minute is short. 6 minute is short.
        // Maybe we just loop until all are > 10m or "Easy".

        // Simpler MVP:
        // Again -> Keep in queue (move to back).
        // Hard/Good/Easy -> Remove from immediate queue (Done for this session).

        if (rating === 'again') {
            // Move to back
            const newQueue = [...queue];
            newQueue.push(newQueue.splice(currentWordIndex, 1)[0]);
            setQueue(newQueue);
            // Index stays same essentially (next card shifts in), but we need to be careful if it was standard array.
            // If we move current to back, the next item becomes current at the same index?
            // Wait, splice modification in place is tricky with React state.

            const remaining = queue.filter(w => w.id !== currentWord.id);
            setQueue([...remaining, currentWord]);
            // Current index stays 0? Yes if we always take from 0.
            setCurrentWordIndex(0);
        } else {
            // Remove
            setCompletedCount(c => c + 1);
            const remaining = queue.filter(w => w.id !== currentWord.id);
            setQueue(remaining);
            setCurrentWordIndex(0);
        }
    };

    if (queue.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold mb-4">You're done!</h2>
                <p className="text-gray-600 mb-6">You've reviewed {completedCount} cards.</p>
                <button
                    onClick={onExit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Add More Text
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
            <div className="mb-4 text-sm font-medium text-gray-500">
                Reviewing {queue.length} cards remaining
            </div>
            <Card
                word={currentWord}
                onRate={handleRate}
            />
        </div>
    );
}
