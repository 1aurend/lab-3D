import {createContext} from 'react';

export const idContext = createContext({
  specimen: null,
  setSpecimen: () => {}
})

export const nodeContext = createContext({
  node: null,
  setNode: () => {}
})

export const labContext = createContext({
  lab: null,
  setLab: () => {}
})
