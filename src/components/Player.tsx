import { useState, useRef, useEffect } from 'react';

import { Song } from '../shared/types';

import audio_1 from '../assets/audio/allthat.mp3';
import audio_2 from '../assets/audio/creativeminds.mp3';
import audio_3 from '../assets/audio/dreams.mp3';

import cover_1 from '../assets/images/allthat-X2.webp';
import cover_2 from '../assets/images/creativeminds-X2.webp';
import cover_3 from '../assets/images/dreams-X2.webp';

import VolumeControl from './VolumeControl';
import ProgressControl from './ProgressControl';
import PlayerControl from './PlayerControl';


const playlist: Song[] = [{ audio: audio_1, cover: cover_1, title: 'All That' }, { audio: audio_2, cover: cover_2, title: 'Creative Minds' }, { audio: audio_3, cover: cover_3, title: 'Dreams' }];

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (isPlaying) {
            setFirstLoad(false);
        }
    }, [isPlaying]);


    useEffect(() => {
        if (audioRef.current && audioRef.current.paused && isPlaying) {
            audioRef.current.play();
        } else if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (audioRef.current && isPlaying) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;
                const percentage = (currentTime / duration) * 100;
                setProgress(percentage);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isPlaying, progress]);

    useEffect(() => {
        if (audioRef.current && !isPlaying && audioRef.current.currentTime) {
            const timepiece = audioRef.current.duration / 100;
            audioRef.current.currentTime = progress * timepiece;
        }
    }, [progress, isPlaying]);

    useEffect(() => {
        if (audioRef.current && isPlaying && audioRef.current.currentTime === audioRef.current.duration) {
            if (currentTrack === playlist.length - 1) {
                setCurrentTrack(0);
            } else {
                setCurrentTrack(currentTrack + 1);
            }
        }
    }, [progress, isPlaying, currentTrack]);

    return (
        <div className={`player ${isPlaying ? 'player__active' : ''} ${firstLoad ? 'player__is-loaded' : ''}`}>
            <audio ref={audioRef} src={playlist[currentTrack].audio} />
            <PlayerControl isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} playlist={playlist} setIsPaused={setIsPaused} isPaused={isPaused} firstLoad={firstLoad} />
            <div className="player__container">
                <VolumeControl volume={volume} setVolume={setVolume} />
                <div className='player__song-title'>{playlist[currentTrack].title}</div>
                <ProgressControl progress={progress} setProgress={setProgress} setIsPlaying={setIsPlaying} isPlaying={isPlaying} isPaused={isPaused} firstLoad={firstLoad} />
            </div>
            <div className={`player__cover ${isPlaying ? 'player__cover__play' : ''}`}>
                <img src={playlist[currentTrack].cover} alt="Cover" />
            </div>
        </div>
    );
};

export default AudioPlayer;
