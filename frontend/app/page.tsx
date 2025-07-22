'use client';

import { useState, useEffect, useRef } from 'react';
import { BIGRAM_ENDPOINT, TRIGRAM_ENDPOINT } from '@/app/src/config';

const modelMap = {
    suffix: 'Keras',
    next: 'Bigram',
    phrase: 'Trigram',
    sentence: 'KazLLM',
};

export default function BolzhauPage() {
    const [textInput, setTextInput] = useState('');
    const [activeTab, setActiveTab] = useState<'suffix' | 'next' | 'phrase' | 'sentence'>('suffix');
    const [predictions, setPredictions] = useState<{ text: string; score: string }[]>([]);
    const controllerRef = useRef<AbortController | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextInput(value);

        if (value.endsWith(' ')) {
            fetchPredictions(value.trim(), activeTab);
        } else {
            setPredictions([]);
        }
    };

    const fetchPredictions = async (text: string, type: typeof activeTab) => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        let endpoint: string | null = null;

        switch (type) {
            case 'next':
                endpoint = BIGRAM_ENDPOINT;
                break;
            case 'phrase':
                endpoint = TRIGRAM_ENDPOINT;
                break;
            // 'suffix' и 'sentence' можно потом подключить
            default:
                return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
                signal: controller.signal,
            });

            if (!response.ok) throw new Error('Server Error');

            const data = await response.json();
            const results = (data.predictions || []).map((text: string, i: number) => ({
                text,
                score: '-', // backend score жоқ болса, -
            }));

            setPredictions(results);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Prediction fetch error:', error);
            }
        }
    };

    const handlePredictionSelect = (prediction: string) => {
        setTextInput(prev =>
            prev.endsWith(' ') ? prev + prediction : prev + ' ' + prediction
        );
        fetchPredictions(textInput + ' ' + prediction, activeTab);
    };

    const model = modelMap[activeTab];

    return (
        <main className="max-w-screen-xl mx-auto px-4 pt-32">
            {/* Input */}
            <div className="flex justify-center mb-10">
                <input
                    type="text"
                    placeholder="Мәтінді осы жерге енгізіңіз..."
                    className="w-full max-w-2xl border border-gray-300 rounded-full px-6 py-3 shadow text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={textInput}
                    onChange={handleInputChange}
                />
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Мәтін */}
                <div className="w-full border rounded-lg p-6 shadow text-gray-600">
                    <h2 className="text-lg font-semibold mb-2 text-black">Мәтін</h2>
                    <p className="italic text-sm">{textInput || 'Мәтін осы жерде көрсетіледі...'}</p>
                </div>

                {/* Болжамдар */}
                <div className="w-full border rounded-lg p-6 shadow h-[350px] flex flex-col justify-between">
                    <h2 className="text-lg font-bold mb-4 text-black">Болжамдар</h2>

                    {/* Tabs */}
                    <div className="bg-[#F7F7F8] rounded-xl p-1 inline-flex gap-1 text-sm font-bold text-gray-800 shadow-sm border border-gray-200 mb-4">
                        {(['suffix', 'next', 'phrase', 'sentence'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setPredictions([]);
                                    if (textInput.endsWith(' ')) fetchPredictions(textInput.trim(), tab);
                                }}
                                className={`px-4 py-1 rounded-lg ${activeTab === tab
                                    ? 'text-white bg-gradient-to-r from-purple-400 to-blue-400'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                {{
                                    suffix: 'Сөздің соңы',
                                    next: 'Келесі сөз',
                                    phrase: 'Фраза',
                                    sentence: 'Сөйлем',
                                }[tab]}
                            </button>
                        ))}
                    </div>

                    {/* Модель таңдау */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-700 font-medium">Модель таңдау</label>
                        <select className="block w-full mt-1 border border-gray-300 rounded-md px-2 py-2 text-sm min-h-[38px]">
                            <option>{model}</option>
                        </select>
                    </div>

                    {/* Predictions */}
                    <div className="h-[180px] overflow-y-auto pr-1 space-y-2">
                        {predictions.length === 0 ? (
                            <p className="text-gray-400 italic">Болжамдар осы жерде көрсетіледі...</p>
                        ) : (
                            predictions.map((p, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handlePredictionSelect(p.text)}
                                    className="flex justify-between items-center px-4 py-2 bg-white rounded-xl border hover:bg-gray-50 cursor-pointer"
                                >
                                    <span className="font-bold">{p.text}</span>
                                    <span className="text-purple-500 font-bold">{p.score}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

