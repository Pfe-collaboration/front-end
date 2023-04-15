import FormStepper from "./FormStepper.js";
import { CssBaseline, Container, Paper, Box }  from '@mui/material';
 
export const FarmerLogin = ({content}) => {
  return (
    <>
    
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <FormStepper content={content}   />
        </Paper>
      </Container>
    </>
  )
}
