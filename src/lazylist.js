import { useEffect, useState } from 'react'

import debounce from 'lodash.debounce'

export function onScrollEnd (onUpdate = () => {}) {
  const listener = debounce(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      // the bottom of the page has been reached, fire an update event
      onUpdate()
    }
  }, 100)
  window.addEventListener('scroll', listener)
  return () => window.removeEventListener('scroll', listener)
}

export default function useLazyList ({ list = [], initialLength = 0, jumpSize = 1, onUpdate = () => {} } = {}) {
  const [itemCount, setItemCount] = useState(initialLength)

  useEffect(() => {
    const removeListener = onUpdate(() => {
      itemCount + jumpSize >= list.length && removeListener()
      setItemCount(prevCount => prevCount + jumpSize)
    })
    return () => removeListener()
  }, [ list ])

  return [ list.slice(0, itemCount), itemCount < list.length ]
}
