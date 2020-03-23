import React, {useEffect, useState, useRef} from 'react';
import Modal from 'styled-react-modal'
import {ReactComponent as Icon} from '../assets/tree-icon.svg'
import tree5svg from '../data/trees/tree5.svg'
import tree5nwk from '../data/trees/tree5.json'
import PhyloCanvas from './PhyloCanvas';



const TreeModal = Modal.styled`
  width: 75vw;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 30;
`

// background-color: ${props => props.theme.colors.white};

const Tree = (props) => {
  const targetRef = useRef(null);
  const [show, setShow] = useState(false);
  function toggleShow(){
    setShow(!show)
  };
  console.log(tree5nwk.newick);
  return (
    <>
      <Icon width="48px" onClick={toggleShow} style={{cursor:'pointer'}} />
      <TreeModal
          isOpen={show}
          onBackgroundClick={toggleShow}
          onEscapeKeydown={toggleShow}>
          <PhyloCanvas  className="tree-canvas"
                        data={tree5nwk.newick}
                        treeType="rectangular"
                        style={{width:"100%", height:"100%"}}
                        />
        </TreeModal>
    </>
  )

}

export default Tree;
