import { useEffect, useState } from 'react'

/**
 * A hook that will return a subset of the provided list, providing more of the list when the update callback fires.
 *
 * @param {Object} props react props
 * @param {Array<T>} props.list collection of items to lazily return
 * @param {Integer} [props.initialLength=0] length of the firs subset of assets returned
 * @param {Integer} [props.jumpsize=1] length of subsequent subsets to return
 * @param {Function} props.onUpdate notify function to tell hook to return more items
 * @returns {[ Array<T>, Boolean ]} subset of assets and a boolean, true if more items are available in the list
 */
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
