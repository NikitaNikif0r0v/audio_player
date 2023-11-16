import { Song } from "../shared/types";

type Props = {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    currentTrack: number;
    setCurrentTrack: (newTrack: number) => void;
    playlist: Song[];
    setIsPaused: (value: boolean) => void;
    isPaused: boolean;
    firstLoad: boolean;
};

const PlayerControl = (props: Props) => {
    const { setIsPlaying, isPlaying, currentTrack, setCurrentTrack, playlist, setIsPaused, isPaused, firstLoad } = props;

    const playPauseHandler = () => {
        setIsPlaying(!isPlaying);

        if (isPaused && isPlaying === false) {
            setIsPaused(false);
        }

        if (!isPaused && isPlaying) {
            setIsPaused(true);
        }
    };

    const onPrevTrackHandler = () => {
        if (currentTrack > 0) {
            setCurrentTrack(currentTrack - 1);
        } else if (currentTrack === 0) {
            setCurrentTrack(playlist.length - 1);
        }
    }

    const onNextTrackHandler = () => {
        if (currentTrack < playlist.length - 1) {
            setCurrentTrack(currentTrack + 1);
        } else if (currentTrack === playlist.length - 1) {
            setCurrentTrack(0);
        }
    };

    return (
        <div className="player__control">
            <button className="player__control__prev-button" onClick={onPrevTrackHandler} />
            <button className={`${isPlaying ? 'player__control__pause-button' : 'player__control__play-button'} ${firstLoad ? 'player__control__play-button__inactive' : ''}`} onClick={playPauseHandler} />
            <button className="player__control__next-button" onClick={onNextTrackHandler} />
        </div>
    )
};

export default PlayerControl;