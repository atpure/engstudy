import { useState } from 'react';
import { extractWords } from '../lib/wordUtils';
import type { Word } from '../types';

interface InputViewProps {
    onWordsExtracted: (words: Word[]) => void;
}

export function InputView({ onWordsExtracted }: InputViewProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        const words = extractWords(text);
        onWordsExtracted(words);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Text</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    className="w-full h-64 p-4 border border-gray-700 rounded-lg bg-[#2a2a2a] focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Paste your conversation here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={!text}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generate Flashcards
                </button>
            </form>
        </div>
    );
}
