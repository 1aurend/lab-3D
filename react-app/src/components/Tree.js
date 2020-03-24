import React, {useEffect, useState} from 'react';
import Modal from 'styled-react-modal'
import { ModalProvider } from 'styled-react-modal'
import {ReactComponent as Icon} from '../assets/tree-icon.svg'
import tree5svg from '../data/trees/tree5.svg'
import tree5nwk from '../data/trees/tree5.json'
import PhyloCanvas from './PhyloCanvas';



const TreeModal = Modal.styled`
  width: 75vmin;
  height: 75vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 30;
`

// background-color: ${props => props.theme.colors.white};

const Tree = (props) => {
  const [show, setShow] = useState(false);
  function toggleShow(){
    setShow(!show)
  };
  // console.log(tree5nwk.newick);
  return (
      <ModalProvider>
        <Icon width={props.iconSize} onClick={toggleShow} style={{cursor:'pointer'}} />
        <TreeModal
            isOpen={show}
            onBackgroundClick={toggleShow}
            onEscapeKeydown={toggleShow}>
            <PhyloCanvas  className="tree-canvas"
                          data={tree5nwk.newick}
                          treeType="rectangular"
                          style={{width:"100%", height:"100%"}}
                          showHistory={true}
                          showLabels={false}
                          />
            {/*<Icon width={props.iconSize} onClick={toggleShow} style={{cursor:'pointer', left:'12.5%'}} />*/}
          </TreeModal>
    </ModalProvider>
  )

}

export default Tree;
