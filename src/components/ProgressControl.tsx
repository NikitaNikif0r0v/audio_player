import { useEffect, useRef, useState } from "react";

type Props = {
    progress: number;
    setProgress: (newProgress: number) => void;
    setIsPlaying: (value: boolean) => void;
    isPlaying: boolean;
    isPaused: boolean;
    firstLoad: boolean;
};

const ProgressControl = (props: Props) => {
    const { progress, setProgress, setIsPlaying, isPlaying, isPaused, firstLoad } = props;
    const progressRef = useRef<HTMLDivElement>(null);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const onMoveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && event.clientX && event.buttons === 1) {
            const rect = progressRef.current.getBoundingClientRect();
            const position = ((event.clientX - rect.left) / rect.width) * 100;
            setProgress(position);
            setIsMoving(true);
            setIsClicked(false);
            setIsActive(true);
        }
    }

    const onDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && event.clientX) {
            const rect = progressRef.current.getBoundingClientRect();
            const position = ((event.clientX - rect.left) / rect.width) * 100;
            setProgress(position);
            setIsClicked(true);
            setIsMoving(false);
            setIsActive(true);
        }
    }

    const onUpHandler = () => {
        setIsMoving(false);
        setIsClicked(false);
        setIsActive(false);
    }

    const onLeaveHandler = () => {
        setIsMoving(false);
        setIsClicked(false);
        setIsActive(false);
    }

    console.log('isMoving, isClicked, isPlaying, isPaused', !isMoving, !isClicked, !isPaused);

    useEffect(() => {
        if (isClicked && isPlaying) {
            setIsPlaying(false);
        }

        if (isMoving && isPlaying) {
            setIsPlaying(false);
        }

        if (!isMoving && !isClicked && isPaused) {
            setIsPlaying(false);
        }

        if (!isMoving && isClicked && isPlaying) {
            setIsPlaying(false);
        }

        if (!isMoving && !isClicked && !isPaused && !firstLoad) {
            setIsPlaying(true);
        }

    }, [isMoving, isPlaying, isClicked, isPaused, setIsPlaying, firstLoad]);

    return (
        <div ref={progressRef} className={`player__progress-control ${isActive ? 'player__progress-control__active' : ''}`} onMouseMove={onMoveHandler} onMouseUp={onUpHandler} onMouseDown={onDownHandler} onMouseLeave={onLeaveHandler}>
            <div className="player__progress-control__bar" />
            <div className="player__progress-control__bar__value" style={{ width: `${progress}%` }} />
            <div className="player__progress-control__pin" style={{ left: `${progress}%` }} />
        </div>
    );
};

export default ProgressControl;