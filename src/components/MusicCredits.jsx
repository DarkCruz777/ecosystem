import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Composant pour afficher les crédits musicaux requis par Uppbeat
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.currentTrack - La piste actuellement en lecture
 */
const MusicCredits = ({ currentTrack }) => {
    if (!currentTrack || !currentTrack.credits) return null;

    return (
        <div className="mt-2 p-3 glass-panel rounded-lg border border-white/10 text-xs">
            <div className="flex items-center justify-between mb-1">
                <span className="text-light-gray/70">
                    Musique de #Uppbeat (free for Creators!)
                </span>
            </div>
            <div className="text-light-gray/60">
                <div className="mt-1 p-2 bg-dark-blue/50 rounded border border-white/5 flex justify-between items-center">
                    <code className="text-green-dark">
                        {currentTrack.credits.url}
                    </code>
                </div>
                <div className="mt-1">
                    <span>License code: </span>
                    <span className="font-mono text-green-dark">
                        {currentTrack.credits.licenseCode}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MusicCredits;
