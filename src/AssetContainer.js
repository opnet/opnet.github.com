import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

/**
 * Renders a Columns of images within a single row.
 *
 * @param {Object} props react props
 * @param {Array<String>} props.assets set of image assets to render
 * @returns {React.Element} A JSX rendering of images within Cols within a single Row
 */
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

/**
 * Renders a collection of image assets within a Container.
 *
 * @param {Object} props react props
 * @param {Array<String>} props.assets set of assets to render
 * @returns {React.Element} A JSX rendering of a Container containing Rows of Images
 */
export default function AssetContainer ({ assets = [] } = {}) {
  // build rows with three sets of images each
  const imageRows = []
  while (assets.length) {
    imageRows.push(<ImageRow assets={assets.splice(0, 3)} />)
  }
  return (
    <Container fluid={true}>
        {imageRows}
    </Container>
  )
}
