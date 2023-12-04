import { ProgressSpinner } from 'primereact/progressspinner';
import { Container } from '@mui/material';
import './layout.css'
const Spinner = () => {
  return (
    <div className="layout">
   <Container >
    <div className='spinner'>
            <ProgressSpinner />
        </div>
   </Container>
</div>
  )
}

export default Spinner