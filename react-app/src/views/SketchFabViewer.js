import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Box } from 'rebass/styled-components'


const ViewerBox = props =>
  <Box
    {...props}
    sx={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '56.25%'
    }}
  />


const ViewerFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`



const Viewer = (props) => {
    const targetRef = useRef(null);
    const urlid = props.url.split("-").slice(-1);
    useEffect(() => {
      const client = new window.Sketchfab(targetRef.current);
      client.init(urlid, {
          success: (api) => {
              api.start();
              api.addEventListener('viewerready', function() {
                  api.setPostProcessing({
                    enable: true,
                    vignetteEnable: false
                  })
              });
              console.log('Viewer initialized!');
          },
          error: function onError() {
              console.log('Viewer failed to initialize');
          },
          autospin: 0,
          autostart: 0,
          camera: 0,
          dof: 0,
          ui_stop: 0,
          transparent: 1,
          annotations_visible: 0,
          ui_annotations: 0,
          ui_animations: 1,
          ui_inspector: 0,
          ui_settings: 0,
          ui_vr: 0,
          ui_infos: 0,
          ui_hint: 0
      });
    }, [props.url])

    return (
        <ViewerBox className="ViewerBox">

            <ViewerFrame ref={targetRef}
            src="about:blank"
            allowFullScreen="allowfullscreen"
            title="Viewer" width="640" height="400"
            frameBorder="0"></ViewerFrame>
        </ViewerBox>
    );
}

export default Viewer;
