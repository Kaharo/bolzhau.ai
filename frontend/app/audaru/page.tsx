'use client';

import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { AUDARU_ENDPOINT } from '@/app/src/config';

const langCodeMap: Record<string, string> = {
  Қазақша: 'kk',
  Орысша: 'ru',
  Ағылшынша: 'en',
};

export default function AudaruPage() {
  const [sourceLang, setSourceLang] = useState('Орысша');
  const [targetLang, setTargetLang] = useState('Қазақша');
  const [options, setOptions] = useState({
    idioms: false,
    wordByWord: false,
    translit: false,
  });
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedText, setDebouncedText] = useState('');

  // Debounce: ждём 500мс после последнего ввода
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(inputText);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputText]);

  // Отправка перевода
  useEffect(() => {
    const fetchTranslation = async () => {
      if (!debouncedText.trim()) {
        setTranslatedText('');
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(AUDARU_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: debouncedText,
            source_lang: langCodeMap[sourceLang],
            target_lang: langCodeMap[targetLang],
            idioms: options.idioms,
            word_by_word: options.wordByWord,
            translit: options.translit,
          }),
        });

        const data = await res.json();
        setTranslatedText(data.translation);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText('Қате орын алды...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslation();
  }, [debouncedText, sourceLang, targetLang, options]);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText('');
  };

  return (
    <main className="w-full max-w-screen-xl mx-auto px-8 pt-32 text-black">

      {/* Верхняя панель языков и кнопка */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6 justify-between">
        <div className="flex-1">
          <select
            className="w-full border rounded-lg px-4 py-2 text-lg focus:outline-none"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option>Қазақша</option>
            <option>Орысша</option>
            <option>Ағылшынша</option>
          </select>
        </div>

        <div className="flex justify-center my-4 md:my-0">
          <button
            onClick={swapLanguages}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 p-2 rounded-md transition"
          >
            <ArrowLeftRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1">
          <select
            className="w-full border rounded-lg px-4 py-2 text-lg focus:outline-none"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option>Қазақша</option>
            <option>Орысша</option>
            <option>Ағылшынша</option>
          </select>
        </div>
      </div>

      {/* Чекбоксы */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Қосымша мүмкіндіктер</label>
        <div className="flex flex-wrap gap-4">
          {[
            { key: 'idioms', label: 'Идиомалармен аудару' },
            { key: 'wordByWord', label: 'Сөзбе сөз аудару' },
            { key: 'translit', label: 'Транслитерация' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options[key as keyof typeof options]}
                onChange={() =>
                  setOptions({ ...options, [key]: !options[key as keyof typeof options] })
                }
                className="form-checkbox rounded text-purple-500"
              />
              <span className="text-gray-800">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Текстовые поля */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <textarea
          placeholder="Аударғыңыз келетін мәтінді енгізіңіз..."
          className="w-full h-56 p-4 border rounded-xl bg-gray-50 placeholder-gray-400 resize-none italic focus:outline-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <textarea
          placeholder="Аударылған мәтін осы жерде көрсетіледі..."
          className="w-full h-56 p-4 border rounded-xl bg-gray-50 placeholder-gray-400 resize-none italic focus:outline-none"
          value={isLoading ? 'Аударылуда...' : translatedText}
          readOnly
        />
      </div>
    </main>
  );
}

