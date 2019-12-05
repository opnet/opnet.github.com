import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Alert } from 'react-bootstrap'

export function ImageRow ({ assets = [] } = {}) {
  return (
    <Row noGutters={true}>
      {assets.map(asset => (
        <Col>
          <Image fluid key={asset} src={asset} />
        </Col>
      ))}
    </Row>
  )
}

export function AssetContainer ({ assets = [] } = {}) {
  const [ list, more ] = useLazyList({
    list: assets,
    initialLength: 3 * 5, // do math to find required screen size ... or 5 rows
    jumpSize: 3 * 3, // 3 rows of assets
    onUpdate: onScrollEnd
  })

  const imageRows = []
  while (list.length) {
    imageRows.push(<ImageRow assets={list.splice(0, 3)} />)
  }
  return (
    <>
      <Container fluid={true}>
        {imageRows}
      </Container>
      <Alert variant={more ? 'primary' : 'secondary'}>
        <Alert.Heading>{more ? 'There\'s so much more left to see!' : 'Aww that\'s it'}</Alert.Heading>
      </Alert>
    </>
  )
}

export default function App (props) {
  const [assets, setAssets] = useState([])
  useEffect(() => {
    (async () => {
      try {
        setAssets(await (await fetch('dist/asset-manifest.json')).json())
      } catch (err) {
        console.error(`Failed to fetch manifest: ${err.message}`)
      }
    })()
  }, [])

  return <AssetContainer assets={assets} />
}
