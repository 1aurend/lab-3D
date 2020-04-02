import labs from '../data/labList.json'


export default function listAvailableLabs() {
  const now = Date.now()
  return Object.keys(labs).filter(lab => {
    console.log(lab)
    console.log(labs[lab].lastAvailable <= now)
    return labs[lab].lastAvailable <= now //flip this to greater than when done testing
  }).map(lab => labs[lab])
}
