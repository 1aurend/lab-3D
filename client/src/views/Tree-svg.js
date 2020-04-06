import React, {useContext, useEffect, useState} from 'react';
import Modal from 'styled-react-modal'
import { ModalProvider } from 'styled-react-modal'
import {ReactComponent as Icon} from '../assets/tree-icon.svg'
import PhyloCanvas from './PhyloCanvas';
import { LabContext } from '../Viewer';
import labList from '../data/labList';





const TreeModal = Modal.styled`
  width: 85vmax;
  height: 85vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 30;
`


const Tree = (props) => {
  const lab = useContext(LabContext);
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

              <img src={require("../data/trees/"+tree)} style={{width:'100%', height:'100%'}} />

          </TreeModal>
    </ModalProvider>
  )

}

export default Tree;
