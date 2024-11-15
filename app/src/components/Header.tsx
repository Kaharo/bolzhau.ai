'use client';

import { useState } from 'react';

const Header = () => {
  const [selectedModel, setSelectedModel] = useState('Model 1');

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  return (
    <header className="shadow p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* <div className="flex flex-item-center">
          <h1 className="header bold h1">V-Lab</h1>
        </div> */}
        <div className="flex items-center">
          <label htmlFor="model-select" className="mr-2">
            Model
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={handleModelChange}
            className="bg-gray-100 border rounded-full px-4 py-2"
          >
            <option value="Model 1">Llama 3.1 (META) </option>
            <option value="Model 2">GPT-4.o (OpenAI)</option>
            <option value="Model 3">BLOOM (Hugging Face)</option>
            <option value="Model 4">Mistral Large 2 (Mistral AI)</option>
            {/* <option value="Model 5">Mistral Large 2 (Mistral AI)</option>
            <option value="Model 6">Mistral Large 2 (Mistral AI)</option>
            <option value="Model 7">Mistral Large 2 (Mistral AI)</option> */}
          </select>
        </div>
        <div className="flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/040/521/745/non_2x/this-is-silhuoette-of-avatar-aang-free-vector.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
