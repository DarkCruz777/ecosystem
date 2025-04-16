import React, { useState } from 'react';
import EcosystemSimulation from './components/EcosystemSimulation';
import SideMenu from './components/SideMenu.jsx';

const initialSimulationParams = {
    speed: 1.0,
    foodRate: 5,
    mutationRate: 0.1,
    initialCreatureCount: 50,
};

function App() {
    const [isRunning, setIsRunning] = useState(true);
    const [creatureCount, setCreatureCount] = useState(
        initialSimulationParams.initialCreatureCount,
    );
    const [simulationKey, setSimulationKey] = useState(0); // Pour forcer une réinitialisation
    const [simulationParams, setSimulationParams] = useState(
        initialSimulationParams,
    );

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        // Force une nouvelle instance du composant en changeant sa key
        setSimulationKey((prevKey) => prevKey + 1);
        setCreatureCount(simulationParams.initialCreatureCount);
    };

    const updateCreatureCount = (count) => {
        setCreatureCount(count);
    };

    const handleParamChange = (paramName, value) => {
        setSimulationParams((prev) => ({
            ...prev,
            [paramName]: value,
        }));
    };

    return (
        <div className="relative w-full h-screen bg-dark-blue">
            <EcosystemSimulation
                key={simulationKey}
                isRunning={isRunning}
                creatureCount={creatureCount}
                simulationSpeed={simulationParams.speed}
                foodRate={simulationParams.foodRate}
                mutationRate={simulationParams.mutationRate}
            />

            <SideMenu
                isRunning={isRunning}
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleReset}
                creatureCount={creatureCount}
                simulationParams={simulationParams}
                onParamChange={handleParamChange}
            />
        </div>
    );
}

export default App;
