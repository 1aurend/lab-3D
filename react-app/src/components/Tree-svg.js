import React, {useContext, useEffect, useState} from 'react';
import Modal from 'styled-react-modal'
import { ModalProvider } from 'styled-react-modal'
import {ReactComponent as Icon} from '../assets/tree-icon.svg'
import Tree7svg from '../data/trees/tree7.svg';
import Tree6svg from '../data/trees/tree6.svg';
import Tree5svg from '../data/trees/tree5.svg';
import PhyloCanvas from './PhyloCanvas';
import { labContext } from '../data/DataContexts';
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
  let treeToDisplay = null
  if (lab=="Lab 5") {
    treeToDisplay = Tree5svg
  } else if (lab=="Lab 6"){
    treeToDisplay = Tree6svg
  } else if (lab =="Lab 7"){
    treeToDisplay = Tree7svg
  }
  return (
      <ModalProvider>
        <Icon width={props.iconSize} onClick={toggleShow} style={{cursor:'pointer'}} />
        <TreeModal
            isOpen={show}
            onBackgroundClick={toggleShow}
            onEscapeKeydown={toggleShow}>

                <img src={treeToDisplay} style={{width:'100%', height:'100%'}} alt="Tree 7" />

          </TreeModal>
    </ModalProvider>
  )

}

export default Tree;
