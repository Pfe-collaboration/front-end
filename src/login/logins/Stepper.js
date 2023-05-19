import LinearStepper from "../LinearStepper";
import { CssBaseline } from "@mui/material";
import {Container} from "@mui/material";
import {Paper }from "@mui/material";
import {Box }from "@mui/material";
const Stepper = () => {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <LinearStepper />
        </Paper>
      </Container>
    </>
  )
}

export default Stepper