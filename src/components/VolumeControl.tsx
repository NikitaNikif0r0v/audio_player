import { useRef, useState } from "react";

import loud from '../assets/images/volume-loud.svg';
import quiet from '../assets/images/volume-cross.svg';

type Props = {
    volume: number;
    setVolume: (newVolume: number) => void;
};

const VolumeControl = (props: Props) => {
    const { volume, setVolume } = props;
    const volumeRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);

    const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (volumeRef.current && event.clientX) {
            const rect = volumeRef.current.getBoundingClientRect();
            const position = ((event.clientX - rect.left) / rect.width) * 100;
            if (position >= 0 && position <= 100) {
                setVolume(position / 100);
            }
        }
    };

    const onMoveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (volumeRef.current && event.clientX && event.buttons === 1) {
            const rect = volumeRef.current.getBoundingClientRect();
            const position = ((event.clientX - rect.left) / rect.width) * 100;
            if (position >= 0 && position <= 100) {
                setVolume(position / 100);
            }
            setIsActive(true);
        }
    }



    const onDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (volumeRef.current && event.clientX) {
            setIsActive(true);
        }
    }

    const onUpHandler = () => {
        setIsActive(false);
    }

    const onLeaveHandler = () => {
        setIsActive(false);
    }


    return (
        <div className="player__volume-control">
            <img src={quiet} alt="Quiet" className="player__volume-control__icon" />
            <div ref={volumeRef} className={`player__volume-control__container ${isActive ? 'player__volume-control__container__active' : ''}`} onClick={onClickHandler} onMouseMove={onMoveHandler} onMouseUp={onUpHandler} onMouseDown={onDownHandler} onMouseLeave={onLeaveHandler}>
                <div className="player__volume-control__bar" />
                <div className="player__volume-control__bar__value" style={{ width: `${volume * 100}%` }} />
                <div className="player__volume-control__pin" style={{ left: `${volume * 100}%` }} />
            </div>
            <img src={loud} alt="Louder" className="player__volume-control__icon" />
        </div>
    );
};

export default VolumeControl;