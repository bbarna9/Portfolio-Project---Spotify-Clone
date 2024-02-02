import { useContext, useState, useRef, useEffect } from 'react';
import './bottomBar.scss';
import WaveSurfer from 'wavesurfer.js';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../../Player';

import audioFile from '../../assets/Audio.mp3';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#4d4d4d',
  progressColor: '#1ed760',
  cursorColor: 'white',
  responsive: true,
  height: 5,
  normalize: false,
  cursorWidth: 5,
  backend: 'WebAudio',
  dragToSeek: true,
  fillParent: true,
});

function formatTime(seconds) {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

const BottomBar = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState('');
  let volumePower;

  if (volume > 0 && volume < 0.33) {
    volumePower = 'icon fa-solid fa-volume-off';
  } else if (volume >= 0.33 && volume < 0.66) {
    volumePower = 'icon fa-solid fa-volume-low';
  } else if (volume >= 0.66) {
    volumePower = 'icon fa-solid fa-volume-high';
  } else {
    volumePower = 'icon fa-solid fa-volume-xmark';
  }

  const { isOpen, dispatch } = useContext(PlayerContext);
  const [visible, setVisible] = useState(isOpen);

  const sidebarHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SIDEBAR_TOGGLE' });
      setVisible(!visible);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    const loader = async () => {
      await wavesurfer.current.load(audioFile, [0, 0]);
    };

    loader();

    wavesurfer.current.on('ready', () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      setAudioFileName(audioFile.split('/').pop());
    });

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    return () => {
      wavesurfer.current.un('audioprocess');
      wavesurfer.current.un('ready');
      wavesurfer.current.destroy();
    };
  }, [audioFile]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
    wavesurfer.current.setVolume(muted ? volume : 0);
    volumePower = volume;
  };

  return (
    <div className={isOpen ? 'bottombar opened' : 'bottombar closed'}>
      <div className="left">
        <Link to="/album">
          <img
            src="https://m.media-amazon.com/images/I/91rgNXHkQCL._UF1000,1000_QL80_.jpg"
            alt="album"
          />
        </Link>
        <div className="info">
          <Link to="/album" className="title">
            {audioFileName}
          </Link>
          <Link to="/author" className="singer">
            Post Malone
          </Link>
        </div>
      </div>
      <div className="center">
        <div className="top">
          <i className="icon shuffle fa-solid fa-shuffle fa-lg"></i>
          <i className="icon goBack fa-solid fa-backward-step fa-lg"></i>
          {/* ----- PLAY / PAUSE BUTTON ----- */}
          <i
            onClick={handlePlayPause}
            className={
              playing
                ? 'icon pause fa-solid fa-circle-pause fa-2xl'
                : 'icon pause fa-solid fa-circle-play fa-2xl'
            }
          ></i>
          <i className="icon goForward fa-solid fa-forward-step fa-lg"></i>
          <i className="icon repeat fa-solid fa-repeat fa-lg"></i>
        </div>
        <div className="bottom">
          <span className="length">{formatTime(currentTime)}</span>
          <div className="progressContainer">
            <div
              id="waveform"
              ref={waveformRef}
              style={{ width: '100%' }}
            ></div>
            {/* <div className="progressBar">
              <div className="progress"></div>
            </div>
            <div className="progressBall"></div> */}
          </div>
          <span className="length">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="right">
        <i
          className="sideOpen fa-regular fa-square-caret-right"
          onClick={sidebarHandler}
        ></i>
        <i className="icon fa-solid fa-microphone"></i>
        <i className="icon fa-solid fa-bars"></i>
        <i className="icon fa-solid fa-computer"></i>
        <div className="volumeProgress">
          <i onClick={handleMute} className={volumePower}></i>
          <div className="volumeBar">
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <i className="icon fa-solid fa-up-right-and-down-left-from-center"></i>
      </div>
    </div>
  );
};

export default BottomBar;
