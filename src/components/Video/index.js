// @flow
/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint jsx-a11y/control-has-associated-label: 0 */

import React, { memo, useRef, useState } from 'react';
// import Spinner from 'components/Spinner';

type Props = {
  src: string,
  poster: string,
  buttonSize?: 'default' | 'large',
  isLoading?: boolean,
  handleError?: Function
};

export const Video = ({
  src,
  poster,
  buttonSize = 'default',
  isLoading = false,
  handleError = null
}: Props) => {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const playVideo = () => {
    const current = videoRef ? videoRef.current : null;

    if (current && visible) {
      current.setAttribute('controls', 'controls');

      current
        .play()
        .then()
        .catch(e => {
          setVisible(false);

          if (handleError) {
            handleError(e);
          }
        });

      setVisible(false);
    }
  };

  const pauseVideo = () => {
    if (videoRef && videoRef.current && !visible) {
      videoRef.current.removeAttribute('controls');
      setVisible(true);
    }
  };

  return (
    <div className="app-video">
      {src !== '' && (
        <>
          <video
            src={src}
            className="app-video__content"
            ref={videoRef}
            onPause={pauseVideo}
            /** Fix on mobile-safari */
            poster={poster}
          />
          <button
            onClick={playVideo}
            disabled={isLoading}
            type="button"
            className={`app-video__play-button ${
              buttonSize !== 'default'
                ? `app-video__play-button--${buttonSize}`
                : ''
            } ${visible ? 'app-video__play-button--visible' : ''}`}
          />
        </>
      )}
    </div>
  );
};

Video.defaultProps = {
  buttonSize: 'default',
  isLoading: false,
  handleError: null
};

export default memo<Props>(Video);
