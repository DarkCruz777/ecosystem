import React from 'react';

const StatusPanel = ({ creatureCount, isRunning }) => {
    return (
        <div className="fixed bottom-5 left-5 glass-panel p-3 text-sm z-10 shadow-xl rounded-lg fade-in">
            <div className="my-1 text-light-gray">Créatures: {creatureCount}</div>
            <div className="my-1 text-light-gray">
                Statut: {isRunning ? 'En cours' : 'En pause'}
            </div>
        </div>
    );
};

export default StatusPanel;