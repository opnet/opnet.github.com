import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

import AssetContainer from './AssetContainer'

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
  const minOffset = 300

  const listener = debounce(() => {
    const scrollOffset = document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop)
    if (minOffset >= scrollOffset) {
      // the bottom of the page has been reached, fire an update event
      onUpdate()
    }
  }, 40)

  window.addEventListener('scroll', listener)
  return () => window.removeEventListener('scroll', listener)
}

/**
 * Renders an asset collection, using a lazily loade list of assets. The list of assets
 * provided will only initially be a few assets. As the user scrolls to the bottom
 * of the page more assets will be lazily loaded.
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

  // TODO: If the body is smaller than the window the scroll listener won't fire.
  // Automatigically fill enough of the viewport with images such that it can scroll
  const [ lazyAssets, more ] = useLazyList({
    list: assets,
    initialLength: 3 * 9, // some cool algorithm to detect how many rows will fill the viewport ... or just 9 rows
    jumpSize: 3 * 3, // 3 rows of assets
    onUpdate: onVerticalScrollEnd
  })

  return (
    <>
      <AssetContainer assets={lazyAssets} />
      {more ? null :
        <Alert variant='secondary'>
          <Alert.Heading>That's it!</Alert.Heading>
        </Alert>
      }
    </>
  )
}
