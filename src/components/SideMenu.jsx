import React, { useState } from 'react';
import {
    Menu,
    X,
    Activity,
    Music,
    Settings,
    Play,
    Pause,
    RefreshCw,
} from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import { playlist } from '../audio/playlist';

const SideMenu = ({
    isRunning,
    onStart,
    onPause,
    onReset,
    creatureCount,
    simulationParams,
    onParamChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('controls'); // 'controls', 'music', 'stats'

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={toggleMenu}
                    className="fixed top-5 left-5 z-50 glass-panel rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                    aria-label="Ouvrir le menu">
                    <Menu size={20} className="text-light-gray" />
                </button>
            )}

            <div
                className={`fixed top-0 left-0 glass-panel border-l border-solid border-white/10 bg-blue-950 z-40 transition-all duration-300 overflow-hidden shadow-lg ${
                    isOpen ? 'w-100' : 'w-0'
                }`}>
                <div className="p-6 flex flex-col">
                    {/* En-tête du menu */}
                    <div className="mb-6 fade-in flex justify-between items-center">
                        <div>
                            <h2 className="text-light-gray text-2xl font-semibold mb-1">
                                Simulateur
                            </h2>
                            <p className="text-light-gray/60 text-sm">
                                Configuration et contrôles
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={toggleMenu}
                                className="glass-panel rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                                aria-label="Fermer le menu">
                                <X size={20} className="text-light-gray" />
                            </button>
                        </div>
                    </div>

                    {/* Onglets de navigation */}
                    <div className="flex mb-6 gap-1 p-1 rounded-lg fade-in">
                        <button
                            onClick={() => setActiveTab('controls')}
                            className={`py-2 px-4 flex-1 flex items-center justify-center gap-2 rounded-md transition-all duration-300 ${
                                activeTab === 'controls'
                                    ? 'bg-green text-white shadow-md'
                                    : 'text-light-gray bg-dark-blue hover:bg-white/10'
                            }`}>
                            <Settings size={16} />
                            <span>Contrôles</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('music')}
                            className={`py-2 px-4 flex-1 flex items-center justify-center gap-2 rounded-md transition-all duration-300 ${
                                activeTab === 'music'
                                    ? 'bg-green text-white shadow-md'
                                    : 'text-light-gray bg-dark-blue hover:bg-white/10'
                            }`}>
                            <Music size={16} />
                            <span>Musique</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`py-2 px-4 flex-1 flex items-center justify-center gap-2 rounded-md transition-all duration-300 ${
                                activeTab === 'stats'
                                    ? 'bg-green text-white shadow-md'
                                    : 'text-light-gray bg-dark-blue hover:bg-white/10'
                            }`}>
                            <Activity size={16} />
                            <span>Stats</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2">
                        <div
                            className={`${activeTab === 'controls' ? 'block' : 'hidden'} pb-4 fade-in`}>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {isRunning ? (
                                    <button
                                        className="btn-pause rounded-xl flex items-center justify-center gap-2 p-1  transition-all duration-300 hover:shadow-lg"
                                        onClick={onPause}>
                                        <Pause size={18} />
                                        <span>Pause</span>
                                    </button>
                                ) : (
                                    <button
                                        className="btn-start rounded-xl flex items-center justify-center gap-2 p-1 transition-all duration-300 hover:shadow-lg"
                                        onClick={onStart}>
                                        <Play size={18} />
                                        <span>Démarrer</span>
                                    </button>
                                )}
                                <button
                                    className="btn-reset rounded-xl flex items-center justify-center gap-2 p-1 transition-all duration-300 hover:shadow-lg"
                                    onClick={onReset}>
                                    <RefreshCw size={18} />
                                    <span>Réinitialiser</span>
                                </button>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-light-gray text-lg font-medium mb-4 flex items-center">
                                    <Settings size={18} className="mr-2" />
                                    Paramètres
                                </h3>
                            </div>

                            <div className="space-y-5">
                                {/* Vitesse de simulation pour plus tard
                                <div className="glass-panel p-4 rounded-lg border border-white/20 shadow-sm">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-light-gray">
                                            Vitesse de simulation
                                        </label>
                                        <span className="text-green font-medium">
                                            {simulationParams.speed}x
                                        </span>
                                    </div>
                                    <div className="relative pt-1">
                                        <div className="w-full h-2 bg-dark-blue/80 rounded-full relative mb-2">
                                            <div
                                                className="absolute h-full bg-green/70 rounded-full"
                                                style={{
                                                    width: `${(simulationParams.speed / 2) * 100}%`,
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="2"
                                                step="0.1"
                                                value={simulationParams.speed}
                                                onChange={(e) =>
                                                    onParamChange(
                                                        'speed',
                                                        parseFloat(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="absolute w-full h-2 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="w-full flex justify-between text-xs text-light-gray/70 px-1">
                                            <span>Lent</span>
                                            <span>Rapide</span>
                                        </div>
                                    </div>
                                </div>*/}

                                {/* Taux de nourriture pour plus tard
                                <div className="glass-panel p-4 rounded-lg border border-white/20 shadow-sm">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-light-gray">
                                            Taux de nourriture
                                        </label>
                                        <span className="text-green font-medium">
                                            {simulationParams.foodRate}
                                        </span>
                                    </div>
                                    <div className="relative pt-1">
                                        <div className="w-full h-2 bg-dark-blue/80 rounded-full relative mb-2">
                                            <div
                                                className="absolute h-full bg-green/70 rounded-full"
                                                style={{
                                                    width: `${(simulationParams.foodRate / 20) * 100}%`,
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="1"
                                                max="20"
                                                step="1"
                                                value={
                                                    simulationParams.foodRate
                                                }
                                                onChange={(e) =>
                                                    onParamChange(
                                                        'foodRate',
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="absolute w-full h-2 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="w-full flex justify-between text-xs text-light-gray/70 px-1">
                                            <span>Peu</span>
                                            <span>Beaucoup</span>
                                        </div>
                                    </div>
                                </div>*/}

                                {/* Taux de mutation pour plus tard
                                <div className="glass-panel p-4 rounded-lg border border-white/5">
                                    <div className="flex justify-between mb-1">
                                        <label className="text-light-gray">Taux de mutation</label>
                                        <span className="text-green font-medium">{simulationParams.mutationRate}</span>
                                    </div>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="0"
                                            max="0.5"
                                            step="0.01"
                                            value={simulationParams.mutationRate}
                                            onChange={(e) => onParamChange('mutationRate', parseFloat(e.target.value))}
                                            className="w-full h-2 bg-dark-blue rounded-full appearance-none cursor-pointer"
                                        />
                                        <div className="w-full flex justify-between text-xs text-light-gray/50 px-1 mt-1">
                                            <span>Stable</span>
                                            <span>Évolutif</span>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="glass-panel p-4 rounded-lg border border-white/20 shadow-sm">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-light-gray">
                                            Nombre de créatures
                                        </label>
                                        <span className="text-green font-medium">
                                            {
                                                simulationParams.initialCreatureCount
                                            }
                                        </span>
                                    </div>
                                    <div className="relative pt-1">
                                        <div className="w-full h-2 bg-dark-blue/80 rounded-full relative mb-2">
                                            <div
                                                className="absolute h-full bg-green/70 rounded-full"
                                                style={{
                                                    width: `${(simulationParams.initialCreatureCount / 200) * 100}%`,
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="5"
                                                max="200"
                                                step="5"
                                                value={
                                                    simulationParams.initialCreatureCount
                                                }
                                                onChange={(e) =>
                                                    onParamChange(
                                                        'initialCreatureCount',
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="absolute w-full h-2 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="w-full flex justify-between text-xs text-light-gray/70 px-1">
                                            <span>Peu</span>
                                            <span>Beaucoup</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${activeTab === 'music' ? 'block' : 'hidden'} pb-4 fade-in`}>
                            <MusicPlayer tracks={playlist} />
                        </div>

                        {/* Contenu onglet statistiques */}
                        <div
                            className={`${activeTab === 'stats' ? 'block' : 'hidden'} pb-4 fade-in`}>
                            <div className="glass-panel p-4 rounded-lg border border-white/5 mb-4">
                                <h3 className="text-light-gray text-lg font-medium mb-2 flex items-center">
                                    <Activity size={18} className="mr-2" />
                                    Statistiques
                                </h3>
                                <p className="text-light-gray/60 text-sm">
                                    Analysez l'évolution de votre écosystème.
                                </p>
                            </div>

                            {/* Cartes de statistiques */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="glass-panel p-4 rounded-lg border border-white/5 flex flex-col items-center">
                                    <span className="text-light-gray/60 text-sm mb-1">
                                        Créatures
                                    </span>
                                    <span className="text-green text-2xl font-semibold">
                                        {creatureCount}
                                    </span>
                                </div>

                                <div className="glass-panel p-4 rounded-lg border border-white/5 flex flex-col items-center">
                                    <span className="text-light-gray/60 text-sm mb-1">
                                        Statut
                                    </span>
                                    <span className="text-green text-lg font-medium">
                                        {isRunning ? 'En cours' : 'En pause'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="glass-panel p-4 rounded-lg border border-white/5 flex flex-col items-center">
                                    <span className="text-light-gray/60 text-sm mb-1">
                                        Génération
                                    </span>
                                    <span className="text-green text-2xl font-semibold">
                                        1
                                    </span>
                                </div>

                                <div className="glass-panel p-4 rounded-lg border border-white/5 flex flex-col items-center">
                                    <span className="text-light-gray/60 text-sm mb-1">
                                        Temps
                                    </span>
                                    <span className="text-green text-lg font-medium">
                                        00:00:00
                                    </span>
                                </div>
                            </div>

                            {/* Placeholder pour graphique */}
                            <div className="mt-4 glass-panel p-4 rounded-lg border border-white/5 h-40 flex items-center justify-center">
                                <span className="text-light-gray/40 text-sm">
                                    Graphique d'évolution (à venir)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pied de page */}
                    <div className="pt-4 mt-auto border-t border-white/10">
                        <p className="text-light-gray/40 text-xs text-center">
                            Simulateur d'Écosystème v1.0.0
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideMenu;
