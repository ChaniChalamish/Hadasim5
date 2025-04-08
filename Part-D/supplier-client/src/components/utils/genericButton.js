import { Button } from 'react-bootstrap'

function GenericButton({ label, variant = 'primary', onClick }) {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  )
}

export default GenericButton
