import PropTypes from 'prop-types';
import React from 'react';
import PhyloCanvas from 'phylocanvas';
import {treeTypes} from 'phylocanvas';
import _keys from 'lodash/keys';
import styled from 'styled-components';

const CanvasBox = styled.div`
  position: relative;
  overflow: hidden;
  /* padding-top: 56.25%; */
  > canvas {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`


export default class PhylocanvasComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.string,
    style: PropTypes.object,
    treeType: PropTypes.oneOf(_keys(treeTypes)),
  }

  componentDidMount() {
    this.tree = PhyloCanvas.createTree(this.refs.phyloCanvasDiv);
    this.componentDidUpdate({});
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    // this.tree.load(props.data)
    if (prevProps.data !== props.data) {
      this.tree.load(props.data);
    }
    if (prevProps.treeType !== props.treeType) {
      this.tree.setTreeType(props.treeType);
    }
  }

  render() {
    const { className, style } = this.props;
    return (
      <CanvasBox ref="phyloCanvasDiv" style={style} className={className}/ >
    );
  }
}
