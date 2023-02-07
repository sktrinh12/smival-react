const read_smiles = (instance) => {
  return (smiles) => {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(`${smiles}\0`)
    const length = encoded.length
    const pString = instance.exports.alloc(length)
    const view = new Uint8Array(instance.exports.memory.buffer, pString, length)

    view.set(encoded)

    return instance.exports.read_smiles(pString)
  }
}

export { read_smiles }
