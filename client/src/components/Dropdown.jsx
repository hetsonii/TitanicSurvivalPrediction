import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Knob } from 'primereact/knob';

import ModelList from './ModelList.jsx';

const Dropdown = () => {
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
    const [selectedAccuracy, setSelectedAccuracy] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const handleModelClick = (model) => {
        setSelectedModel(model);
        setInputValue(model.modelName);
        setIsOpen(true);
        setSelectedAlgorithm('');
    };

    const handleAlgorithmClick = (algorithm) => {
        const model = ModelList.find((model) => model.modelName === selectedModel.modelName);
        const algorithmIndex = model.algorithms.indexOf(algorithm);
        setSelectedAlgorithm(algorithm);
        setSelectedAccuracy(model.accuracy[algorithmIndex]);
        setIsOpen(false);
    };


    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        setIsOpen(true);
        if (!ModelList.find((model) => model.modelName === value)) {
            setSelectedModel('');
        }
    };

    const getFilteredModels = () => {
        try {
            const regex = new RegExp(inputValue, 'i');
            return ModelList.filter((model) => regex.test(model.modelName));
        } catch (error) {
            console.error('Invalid regular expression:', error.message);
            return [];
        }
    };

    const filteredModels = inputValue !== '' ? getFilteredModels() : ModelList;

    return (
        <div className="flex flex-col w-auto">
            <AnimatePresence>
                <motion.div className="flex w-auto content-center relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={() => setIsOpen(true)}
                        className="flex flex-col w-64 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </motion.div>
            </AnimatePresence>
            {isOpen && inputValue !== '' && filteredModels.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col mt-2 bg-white border border-gray-300 rounded shadow-md"
                >
                    <ul>
                        {filteredModels.map((model) => (
                            <li
                                key={model.modelName}
                                onClick={() => handleModelClick(model)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {model.modelName}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {selectedModel && ModelList.find((model) => model === selectedModel) && isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col mt-2 bg-white border border-gray-300 rounded shadow-md"
                >
                    <ul>
                        {selectedModel.algorithms.map((algorithm, index) => (
                            <li
                                key={algorithm}
                                onClick={() => handleAlgorithmClick(algorithm)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {algorithm}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            <motion.div className="flex flex-col items-center mt-2">

                { selectedModel && selectedAlgorithm && selectedAccuracy && (
                    <>
                        <Knob value={selectedAccuracy} readOnly />
                        <span> Accuracy </span>
                        <Link to={selectedModel.path}>
                            <motion.button className="p-1 m-1 bg-slate-300 border-2 border-black">
                                {selectedModel.modelName}
                            </motion.button>
                        </Link>
                    </>
                )}

            </motion.div>


        </div >
    );
};

export default Dropdown;