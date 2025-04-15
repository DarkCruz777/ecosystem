import React, { useState } from 'react';
import EcosystemSimulation from './components/EcosystemSimulation';
import Controls from './components/Controls';
import StatusPanel from './components/StatusPanel';

function App() {
    const [isRunning, setIsRunning] = useState(true);
    const [creatureCount, setCreatureCount] = useState(50);
    const [simulationKey, setSimulationKey] = useState(0); // Pour forcer une réinitialisation

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        // Force une nouvelle instance du composant en changeant sa key
        setSimulationKey(prevKey => prevKey + 1);
        setCreatureCount(50);
    };

    const updateCreatureCount = (count) => {
        setCreatureCount(count);
    };

    return (
        <div className="relative w-full h-screen">
            <Controls
                isRunning={isRunning}
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleReset}
            />

            <EcosystemSimulation
                key={simulationKey}
                isRunning={isRunning}
                initialCreatureCount={50}
                onCreatureCountChange={updateCreatureCount}
            />

            <StatusPanel
                creatureCount={creatureCount}
                isRunning={isRunning}
            />
        </div>
    );
}

export default App;