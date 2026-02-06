import { v4 as uuidv4 } from 'uuid';
import type { Word } from '../types';

export function extractWords(text: string): Word[] {
    // Simple extraction logic: split by non-word characters, filter empty/short.
    // In a real app, use a refined NLP or exclude common stops.
    // The user wants to "extract words from conversational text".

    // Clean text and split
    const rawWords = text.split(/[\s,.!?;:()"']+/);
    const uniqueWords = new Set<string>();
    const words: Word[] = [];
    const now = Date.now();

    rawWords.forEach(w => {
        const clean = w.trim().toLowerCase();
        if (clean.length > 2 && !/^\d+$/.test(clean)) { // Filter numbers and short words
            if (!uniqueWords.has(clean)) {
                uniqueWords.add(clean);
                words.push({
                    id: uuidv4(),
                    text: clean, // Display lower case or original? Let's stick to lower for ID but maybe keep original casing in display if needed.
                    originalText: text, // Storing the WHOLE text might be too much per word. Ideally we find the sentence. 
                    // For MVP, let's try to extract the sentence or just leave it.
                    // PROMPT: "context sentence back".
                    definition: '',
                    createdAt: now,
                    nextReviewAt: now,
                    status: 'new',
                    interval: 0,
                    easeFactor: 2.5
                });
            }
        }
    });

    return words;
}
