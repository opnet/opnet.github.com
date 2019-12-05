import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Alert } from 'react-bootstrap'

import debounce from 'lodash.debounce'
import useLazyList from './lazylist'

/**
 * Notify the provided callback whenever the scroll status is close to the bottom of the document
 *
 * @param {Function} onUpdate function to notify
 * @returns {Function} function to remove listener
 */
export function onVerticalScrollEnd (onUpdate = () => {}) {
  // TODO: Make offset configurable
  const minOffset = 100

  const listener = debounce(() => {
    const scrollOffset = document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop)
    if (minOffset >= scrollOffset) {
      // the bottom of the page has been reached, fire an update event
      onUpdate()
    }
  }, 100)

  window.addEventListener('scroll', listener)
  return () => window.removeEventListener('scroll', listener)
}

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
 * Renders a collection of image assets within a Container. The list of assets
 * provided will only initially be a few assets. As the user scrolls to the bottom
 * of the provided assets more assets will be lazily loaded.
 *
 * @param {Object} props react props
 * @param {Array<String>} props.assets set of assets to render
 * @returns {React.Element} A JSX rendering of a Container containing Rows of Images
 */
export function AssetContainer ({ assets = [] } = {}) {
  // TODO: If the body is smaller than the window the scroll listener won't fire.
  // Automatigically fill enough of the viewport with images such that it can scroll
  const [ list, more ] = useLazyList({
    list: assets,
    initialLength: 3 * 9, // some cool algorithm to detect how many rows will fill the viewport ... or just 9 rows
    jumpSize: 3 * 3, // 3 rows of assets
    onUpdate: onVerticalScrollEnd
  })

  // build rows with three sets of images each
  const imageRows = []
  while (list.length) {
    imageRows.push(<ImageRow assets={list.splice(0, 3)} />)
  }
  return (
    <>
      <Container fluid={true}>
        {imageRows}
      </Container>
      {more ? null :
        <Alert variant='secondary'>
          <Alert.Heading>That's it!</Alert.Heading>
        </Alert>
      }
    </>
  )
}

/**
 * Renders the asset container using the list of fetched assets from the manifest.
 *
 * @returns {AssetContainer} A JSX rendering of the AssetContainer component
 */
export default function App () {
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
