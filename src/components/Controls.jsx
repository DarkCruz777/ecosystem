import React from 'react';

const Controls = ({ onStart, onPause, onReset, isRunning }) => {
    return (
        <div className="fixed top-5 left-0 right-0 z-10 flex justify-center">
            <div className="flex justify-center gap-3 p-3 glass-panel border-b fade-in">
                {isRunning ?
                    <button
                        className="btn btn-pause"
                        onClick={onPause}
                    >
                        Pause
                    </button>
                    : <button
                        className="btn btn-start"
                        onClick={onStart}
                    >
                        Démarrer
                    </button>}
                <button
                    className="btn btn-reset"
                    onClick={onReset}
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    );
};

export default Controls;