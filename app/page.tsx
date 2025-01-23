'use client';

import { useState } from 'react';
import Layout from './src/components/Layout';
import Card from './src/components/Card'; // Adjusted the import path
import predictions from './src/data/predictions'; // Adjusted the import path

const Home = () => {
  const [selectedModel, setSelectedModel] = useState('Model 1');

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Center Section */}
        <div className="text-center mb-8">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full text-lg hover:from-purple-700 hover:to-blue-700">
            Bozhau.AI
          </button>
        </div>

        <div className="flex justify-center items-center mb-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Іздеу..."
              className="border rounded-full px-4 py-2 w-full pl-10"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <i className="fas fa-robot text-gray-500"></i>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-center mb-8 md:space-x-4 md:space-y-0 space-y-4 overflow-x-auto">
          {Object.keys(predictions).map((key) => (
            <Card
              key={key}
              topic={predictions[key].topic}
              predictions={predictions[key].data}
            />
          ))}
        </div> */}
      </div>
    </Layout>
  );
};

export default Home;
