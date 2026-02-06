import { addMinutes, addDays } from 'date-fns';
import type { Word, SRSInterval } from '../types';

export const SRS_INTERVALS = {
    again: 1, // minutes
    hard: 6, // minutes
    good: 10, // minutes
    easy: 4, // days
};

export const calculateNextReview = (_word: Word, rating: SRSInterval): number => {
    const now = new Date();

    // User explicit requirement:
    // Again (1m)
    // Hard (6m)
    // Good (10m)
    // Easy (4d)

    // Note: Standard SRS usually increases interval based on previous interval.
    // The user requirement seems to imply fixed intervals for options.
    // "다시(1분) 어려움(6분) 괜찮음(10분) 4일(쉬움)"
    // Does this mean if I hit "Good" it's ALWAYS 10 minutes? Or adds 10 minutes?
    // Usually in Anki: 
    // - Again: reset to first step (e.g. 1m)
    // - Hard: 1.2 * current
    // - Good: 2.5 * current
    // - Easy: 4 * current

    // However, the prompt is specific: "괄호 안의 시간은 단어를 노출시키는 주기야" (The time in brackets is the exposure cycle).
    // This sounds like fixed next-intervals for the buttons, at least for the learning phase.
    // But if it's "4 days (Easy)", and I encounter it after 4 days, what happens next?
    // If I hit Easy again, is it 4 days again? Or does it graduate?
    // For a simple MVP based on the prompt "단어를 외웠는지 점검하기 위해서 ... 구분하고", I will implement these as the immediate next intervals.
    // I will add a multiplier logic for 'Easy' to allow growth if needed, but for now strict adherence to the requested buttons for the UI.
    // Let's assume:
    // Again -> 1m
    // Hard -> 6m
    // Good -> 10m
    // Easy -> 4d

    // If the card is already 'graduated' (e.g. interval > 1 day), 'Easy' might grow it. 
    // But strictly following "Easy (4 days)" implies setting it to 4 days from now.

    let nextDate: Date;

    switch (rating) {
        case 'again':
            nextDate = addMinutes(now, 1);
            break;
        case 'hard':
            nextDate = addMinutes(now, 6);
            break;
        case 'good':
            nextDate = addMinutes(now, 10);
            break;
        case 'easy':
            nextDate = addDays(now, 4);
            break;
    }

    return nextDate.getTime();
};
