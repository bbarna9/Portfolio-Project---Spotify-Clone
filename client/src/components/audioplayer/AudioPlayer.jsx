import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import './audioplayer.scss';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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
  // barWidth: 2,
  // barGap: 3,
});

// Helper function to format time
function formatTime(seconds) {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

export default function AudioPlayer() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState('');

  // Initialize wavesurfer and set up event listeners
  useEffect(() => {
    // Create WaveSurfer instance with options
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    // Load the audio file
    console.log(audioFile);
    const loader = async () => {
      await wavesurfer.current.load(audioFile, [0, 0]);
    };

    loader();

    // When wavesurfer is ready
    wavesurfer.current.on('ready', () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      setAudioFileName(audioFile.split('/').pop());
    });

    // Update current time in state as audio plays
    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    // Clean up event listeners and destroy instance on unmount
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
  };

  const handleVolumeUp = () => {
    handleVolumeChange(Math.min(volume + 0.1, 1));
  };

  const handleVolumeDown = () => {
    handleVolumeChange(Math.max(volume - 0.1, 1));
  };

  return (
    <div className="audioplayer">
      <div id="waveform" ref={waveformRef} style={{ width: '100%' }}></div>
      <div className="controls">
        {/* PLAY/PAUSE BUTTON */}
        <button onClick={handlePlayPause}>{playing ? 'PAUSE' : 'PLAY'}</button>
        {/* MUTE/UNMUTE BUTTON */}
        <button onClick={handleMute}>{muted ? 'UNMUTE' : 'MUTE'}</button>
        {/* VOLUME SLIDER */}
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
        {/* VOL DOWN BUTTON */}
        <button onClick={handleVolumeDown}>-</button>
        {/* VOL UP BUTTON */}
        <button onClick={handleVolumeUp}>+</button>
      </div>
      <div className="audio-info">
        {/* AUDIO FILE NAME/CURRENT PLAY TIME */}
        <span>
          Playing: {audioFileName} <br />
        </span>
        <span>
          Duration {formatTime(duration)} | Current Time:{' '}
          {formatTime(currentTime)} <br />
        </span>
        <span>Volume: {Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}
