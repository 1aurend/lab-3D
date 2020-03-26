import React, {useContext, useEffect, useState} from 'react';
import Modal from 'styled-react-modal'
import { ModalProvider } from 'styled-react-modal'
import {ReactComponent as Icon} from '../assets/tree-icon.svg'
import tree5nwk from '../data/trees/tree5.json'
import tree6nwk from '../data/trees/tree6.json'

import PhyloCanvas from './PhyloCanvas';
import { labContext } from '../data/DataContexts';
import labList from '../data/labList';





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
  const {lab, setLab} = useContext(labContext);
  const [show, setShow] = useState(false);
  const [tree, setTree] = useState(labList[lab]["tree"]);
  function toggleShow(){
    setShow(!show)
  };
  useEffect (() => {
    setTree(labList[lab]["tree"])
  },[lab])
  return (
      <ModalProvider>
        <Icon width={props.iconSize} onClick={toggleShow} style={{cursor:'pointer'}} />
        <TreeModal
            isOpen={show}
            onBackgroundClick={toggleShow}
            onEscapeKeydown={toggleShow}>
            <PhyloCanvas  className="tree-canvas"
                          data={tree6nwk.newick}
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
