import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ContainedButtons({zones, drawZones, selectedShape, setSelectedShape, deleteZone}) {
    const handlePrevShape = () => {
      selectedShape >= 0 && setSelectedShape(selectedShape - 1)
    }
  
    const handleNextShape = () => {
      selectedShape < zones.length && setSelectedShape(selectedShape + 1)
    }
    
    return (
      <div>
        {drawZones()}
        <Stack direction="row" spacing={2} marginLeft={5}>
         <Button variant="contained" onClick={handlePrevShape} disabled={selectedShape <= 0}>Prev Shape</Button>
         <Button variant="contained" onClick={handleNextShape} disabled={selectedShape >= zones.length - 1}> Next Shape</Button>
         <Button variant="contained" onClick={deleteZone}>Delete Shape</Button>
       </Stack>
    </div>
    );
  }
  
