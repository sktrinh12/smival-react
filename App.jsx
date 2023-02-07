import React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { read_smiles } from './SMIval'

const path = '/target/wasm32-unknown-unknown/release/smival.wasm'
class App extends React.Component {
  state = {
    inputValue: '',
    textFieldColor: '',
    wasm: null,
  }

  async componentDidMount() {
    WebAssembly.instantiateStreaming(fetch(path), {})
      .then((wasm) => {
        console.log('wasm file loaded successfully:', wasm)
        this.setState({ wasm })
      })
      .catch((err) => {
        console.log('error loading wasm file:', err)
      })
  }

  handleChange = async (event) => {
    this.setState({ inputValue: event.target.value })
    const handleRead = read_smiles(this.state.wasm.instance)
    const result = handleRead(event.target.value)
    console.log(result)
    if (result === 0) {
      this.setState({ textFieldColor: 'green' })
    } else {
      this.setState({ textFieldColor: 'red' })
    }
  }

  render() {
    return (
      <>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <TextField
            id='standard-basic'
            label='Enter SMILES string here'
            value={this.state.inputValue}
            onChange={this.handleChange}
            style={{ backgroundColor: this.state.textFieldColor }}
            InputProps={{
              style: {
                fontSize: 45,
                padding: 22,
              },
            }}
          />
        </Box>
      </>
    )
  }
}

export default App
