import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ContainedButtons({zones, drawZones, selectedShape, setSelectedShape, deleteZone}) {
    const handlePrevShape = () => {
      console.log(`In handlePrevShape with: ${selectedShape}`)
      selectedShape >= 0 && setSelectedShape(selectedShape - 1)
    }
  
    const handleNextShape = () => {
      console.log(`In handleNextShape with: ${selectedShape}`)
      selectedShape < zones.length && setSelectedShape(selectedShape + 1)
    }
  
    return (
      <div>
        {zones.length > 0 && drawZones()}
        <Stack direction="row" spacing={2} marginLeft={5}>
         <Button variant="contained" onClick={handlePrevShape}>Prev Shape</Button>
         <Button variant="contained" onClick={handleNextShape}> Next Shape</Button>
         <Button variant="contained" onClick={deleteZone}>Delete Shape</Button>
       </Stack>
    </div>
    );
  }
  