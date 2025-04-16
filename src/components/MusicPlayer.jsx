import React, { useState, useEffect, useRef } from 'react';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    Music,
} from 'lucide-react';
import MusicCredits from './MusicCredits.jsx';

const MusicPlayer = ({ tracks = [], autoPlay = false }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [volume, setVolume] = useState(0.5); // Volume entre 0 et 1
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const audioRef = useRef(new Audio());
    const progressIntervalRef = useRef(null);

    // Initialize Tone.js player
    useEffect(() => {
        if (tracks.length === 0) return;

        const audio = audioRef.current;

        // Configuration des événements audio
        audio.addEventListener('loadedmetadata', handleAudioLoaded);
        audio.addEventListener('ended', handleTrackEnd);
        audio.addEventListener('error', handleAudioError);

        // Charger la piste initiale
        loadTrack(tracks[currentTrackIndex].url);

        // Nettoyage des événements à la désinstallation
        return () => {
            audio.pause();
            audio.src = '';
            audio.removeEventListener('loadedmetadata', handleAudioLoaded);
            audio.removeEventListener('ended', handleTrackEnd);
            audio.removeEventListener('error', handleAudioError);
            clearProgressInterval();
        };
    }, []);

    // Mettre à jour le volume quand il change
    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const changeTrack = (trackIndex, play = false) => {
        setCurrentTrackIndex(trackIndex);
        loadTrack(tracks[trackIndex].url);
        if (play) {
            playTrack();
        }
    };

    const loadTrack = (url) => {
        const audio = audioRef.current;
        setIsLoaded(false);
        audio.pause();

        audio.src = url;
        audio.load();
    };

    const handleAudioLoaded = () => {
        setIsLoaded(true);
        setDuration(audioRef.current.duration);

        if (autoPlay || isPlaying) {
            handlePlay();
        }
    };

    const handleAudioError = () => {
        console.error(
            "Erreur lors du chargement de l'audio:",
            audioRef.current.error,
        );
        setIsLoaded(false);
    };

    const startProgressUpdate = () => {
        clearProgressInterval();

        progressIntervalRef.current = setInterval(() => {
            setProgress(audioRef.current.currentTime);
        }, 1000);
    };

    const clearProgressInterval = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    const handleTrackEnd = () => {
        clearProgressInterval();

        if (isRepeat) {
            audioRef.current.currentTime = 0;
            handlePlay();
        } else {
            handleNext();
        }
    };

    const handlePlay = () => {
        if (!isLoaded) return;

        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
            clearProgressInterval();
        } else {
            playTrack();
        }

        setIsPlaying(!isPlaying);
    };

    const playTrack = () => {
        const audio = audioRef.current;

        if (isPlaying) {
            clearProgressInterval();
        } else {
            setIsPlaying(true);
        }
        audio
            .play()
            .then(() => {
                startProgressUpdate();
            })
            .catch((error) => {
                console.error('Erreur de lecture:', error);
            });
    };

    const handleNext = () => {
        if (tracks.length <= 1) return;

        let nextIndex;

        if (isShuffle) {
            do {
                nextIndex = Math.floor(Math.random() * tracks.length);
            } while (nextIndex === currentTrackIndex && tracks.length > 1);
        } else {
            nextIndex = (currentTrackIndex + 1) % tracks.length;
        }

        setCurrentTrackIndex(nextIndex);
    };

    const handlePrevious = () => {
        if (tracks.length <= 1) return;

        let prevIndex;

        if (isShuffle) {
            do {
                prevIndex = Math.floor(Math.random() * tracks.length);
            } while (prevIndex === currentTrackIndex && tracks.length > 1);
        } else {
            prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        }

        setCurrentTrackIndex(prevIndex);
    };

    const handleSeek = (e) => {
        if (!isLoaded) return;

        const seekPosition = parseFloat(e.target.value);
        audioRef.current.currentTime = seekPosition;
        setProgress(seekPosition);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (tracks.length === 0) {
        return (
            <div className="glass-panel p-4 rounded-lg border border-white/5">
                <p className="text-light-gray text-center">
                    Aucune piste audio disponible
                </p>
            </div>
        );
    }

    const currentTrack = tracks[currentTrackIndex];

    const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

    return (
        <div className="glass-panel rounded-lg border border-white/5 overflow-hidden fade-in">
            <div className="relative h-16 overflow-hidden bg-dark-blue flex items-center justify-center">
                {/* Visualizer effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                        <Music size={20} className="text-green" />
                    </div>
                </div>

                {/* Track info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-blue to-transparent">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-light-gray font-medium">
                                {currentTrack.title}
                            </h3>
                            <p className="text-light-gray/70 text-sm">
                                {currentTrack.artist}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {currentTrack.credits && (
                <MusicCredits currentTrack={currentTrack} />
            )}

            <div className="px-4 pt-4">
                <div className="relative h-2 bg-dark-blue rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-green/80"
                        style={{ width: `${progressPercentage}%` }}></div>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        className="w-full h-2 absolute top-0 opacity-0 cursor-pointer"
                    />
                </div>
                <div className="flex justify-between text-light-gray/70 text-xs mt-1">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={`text-light-gray p-2 rounded-full transition-all duration-300 ${isShuffle ? 'bg-green text-white' : 'bg-dark-blue hover:bg-white/10'}`}
                        title="Lecture aléatoire">
                        <Shuffle size={18} />
                    </button>

                    <button
                        onClick={handlePrevious}
                        className="text-light-gray p-2 rounded-full bg-dark-blue hover:bg-white/10 transition-all duration-300"
                        disabled={tracks.length <= 1}
                        title="Piste précédente">
                        <SkipBack size={20} />
                    </button>

                    <button
                        onClick={handlePlay}
                        className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
                            isPlaying ? 'btn-pause' : 'btn-start'
                        }`}
                        disabled={!isLoaded}
                        title={isPlaying ? 'Pause' : 'Lecture'}>
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <button
                        onClick={handleNext}
                        className="text-light-gray p-2 rounded-full bg-dark-blue hover:bg-white/10 transition-all duration-300"
                        disabled={tracks.length <= 1}
                        title="Piste suivante">
                        <SkipForward size={20} />
                    </button>

                    <button
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`text-light-gray p-2 rounded-full transition-all duration-300 ${isRepeat ? 'bg-green text-white' : 'bg-dark-blue hover:bg-white/10'}`}
                        title="Répéter">
                        <Repeat size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-3 px-2">
                    <Volume2 size={16} className="text-light-gray" />
                    <div className="flex-1 relative h-1 bg-dark-blue rounded-full overflow-hidden">
                        <input
                            type="range"
                            min="-40"
                            max="0"
                            step="1"
                            value={volume}
                            onChange={(e) =>
                                setVolume(parseInt(e.target.value))
                            }
                            className="w-full absolute top-0 opacity-0 h-6 cursor-pointer"
                        />
                        <div
                            className="absolute top-0 left-0 h-full bg-green/80"
                            style={{
                                width: `${((volume + 40) / 40) * 100}%`,
                            }}></div>
                    </div>
                </div>
            </div>

            {tracks.length > 1 && (
                <div className="border-t border-white/5 max-h-80 overflow-y-auto">
                    {tracks.map((track, index) => (
                        <div
                            key={index}
                            className={`py-2 px-3 my-1 mx-2 rounded-md cursor-pointer transition-all duration-300 ${
                                index === currentTrackIndex
                                    ? 'bg-white/10 text-green'
                                    : 'text-light-gray hover:bg-white/5'
                            }`}
                            onClick={() => {
                                changeTrack(index, true);
                            }}>
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full glass-panel flex items-center justify-center mr-2">
                                    <span className="text-xs">{index + 1}</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">
                                        {track.title}
                                    </div>
                                    <div className="text-xs opacity-70">
                                        {track.artist}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
