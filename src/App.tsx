import { useState } from 'react';
import { InputView } from './components/InputView';
import { FlashcardData } from './components/FlashcardData';
import type { Word } from './types';
import { BookOpen } from 'lucide-react';

function App() {
  const [sessionWords, setSessionWords] = useState<Word[]>([]);

  const handleWordsExtracted = (words: Word[]) => {
    // In a real app, we would merge these into Firestore and only fetch due ones.
    // For now, we take these extracted words as the "session".
    setSessionWords(words);
  };

  const handleExitSession = () => {
    // Clear session to go back to input. 
    // In real app, we might go to a Dashboard instead.
    setSessionWords([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center">
        <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
        <h1 className="text-xl font-bold tracking-tight">EngStudy Flashcards</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {sessionWords.length === 0 ? (
          <InputView onWordsExtracted={handleWordsExtracted} />
        ) : (
          <FlashcardData
            initialWords={sessionWords}
            onExit={handleExitSession}
          />
        )}
      </main>

      <footer className="p-4 text-center text-xs text-gray-400">
        <p>PWA Flashcard App • SRS Enabled</p>
      </footer>
    </div>
  );
}

export default App;
