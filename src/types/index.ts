export type SRSInterval = 'again' | 'hard' | 'good' | 'easy';

export interface Word {
    id: string;
    text: string;
    originalText: string; // The context sentence or paragraph
    definition?: string;
    createdAt: number; // Timestamp
    nextReviewAt: number; // Timestamp
    status: 'new' | 'learning' | 'review' | 'graduated';
    interval: number; // Current interval in milliseconds (or logic step)
    easeFactor: number; // Default 2.5 usually, but here fixed Logic? User specified specific times.
}

// User specified fixed intervals: 1m, 6m, 10m, 4d.
// We can store the next step directly or just the next review time.
