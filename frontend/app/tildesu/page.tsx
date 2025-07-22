'use client';

import React from 'react';

export default function Tildesu() {
    return (
        <main className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-purple-500 to-blue-400 text-white p-6 pt-24 space-y-4">
                <h2 className="text-2xl font-bold mb-4">Тарих</h2>

                <div className="bg-white/20 rounded-xl px-4 py-2">
                    <p className="text-white font-bold">2024 жылғы жобалар</p>
                    <p className="text-sm text-white/80">Қазір</p>
                </div>

                <div className="text-white/80">
                    <p className="font-bold">Ауыл шаруашылығы субсидияларын беру процесі</p>
                    <p className="text-sm">2 сағат бұрын</p>
                </div>

                <div className="text-white/80">
                    <p className="font-bold">Автомобиль жолдарының цифрлық паспорттары</p>
                    <p className="text-sm">Бүгін</p>
                </div>

                <div className="text-white/80">
                    <p className="font-bold">Қаржылық бақылау панелі</p>
                    <p className="text-sm">Кеше</p>
                </div>
            </aside>

            {/* Chat area */}
            <section className="flex flex-col flex-1 h-screen">
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto px-6 space-y-6 pt-24">
                    <div className="flex items-start gap-3">
                        <div className="border border-purple-400 rounded-xl px-4 py-2 text-sm text-gray-700 max-w-2xl">
                            Сәлеметсіз бе! Мен Тілдесу — қазақ тіліндегі AI көмекшісімін. Сізге қалай көмектесе аламын?
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-4 py-2 rounded-xl max-w-2xl text-sm">
                            Маған 2024 жыл бойынша жобалар туралы айтып бер
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <div className="border border-purple-300 rounded-xl px-4 py-2 text-sm text-gray-700 max-w-2xl">
                            <p className="font-semibold mb-1">
                                2024 жыл бойынша мемлекеттік органдардың жобалары туралы ақпарат:
                            </p>
                            <p>
                                2024 жылы Қазақстан Республикасының түрлі мемлекеттік органдары бірқатар стратегиялық жобаларды іске асырып, цифрлық трансформация мен халыққа көрсетілетін қызметтердің сапасын арттыруға бағытталған бастамалар қабылдады.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Input bar */}
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                    <form className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
                        <input
                            type="text"
                            placeholder="Сұрақты енгізіңіз..."
                            className="flex-1 text-sm focus:outline-none"
                        />
                        <button type="submit" className="text-blue-500 text-xl hover:text-purple-500">➤</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

