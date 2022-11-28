import { createContext, useState, useEffect } from 'react';
import useSound from 'use-sound';
import volumeOnMP3 from '../assets/volume_on.mp3';
import volumeOffMP3 from '../assets/volume_off.mp3';
import PropTypes from 'prop-types';

const VOLUME = 0.2;

const VolumeContext = createContext({
  isVolumeOn: true,
  volume: VOLUME,
  toggleVolumeOn: () => {},
});

export default VolumeContext;

const IS_VOLUME_ON_LS = 'is_volume_on';

export function VolumeContextProvider({ children }) {
  const getInitialVolume = () => {
    const localStorageVolume = localStorage.getItem(IS_VOLUME_ON_LS);
    return localStorageVolume === 'true' ? true : false;
  };
  const [isVolumeOn, setIsVolumeOn] = useState(getInitialVolume);

  const [volumeOnSound] = useSound(volumeOnMP3, { volume: VOLUME });
  const [volumeOffSound] = useSound(volumeOffMP3, { volume: VOLUME });

  const toggleVolumeHandler = () => {
    setIsVolumeOn((prevState) => {
      if (prevState === true) {
        volumeOffSound();
        return false;
      }
      volumeOnSound();
      return true;
    });
  };

  useEffect(() => {
    localStorage.setItem(IS_VOLUME_ON_LS, isVolumeOn.toString());
  }, [isVolumeOn]);

  return (
    <VolumeContext.Provider value={{ isVolumeOn, volume: VOLUME, toggleVolumeOn: toggleVolumeHandler }}>
      {children}
    </VolumeContext.Provider>
  );
}

VolumeContextProvider.propTypes = {
  children: PropTypes.node,
};
