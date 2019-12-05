# opnet.github.com - Lazily Loading Cats
A simple demo showing off a collection of react components used to implement inifinite scrolling. This is accomplished by lazily loading dom images when the user scrolls close to the bottom of the page.

### Breakdown
##### `useLazyList`
The backbone of the whole collection, a simple react hook that subscribes to an notifying function, rendering a continuously larger subset of the provided assets. By using `useEffect` we can create a reusable component that ocntains the logic for subscribing to the notifying function. By returning the state held by `useState`, any components can seamlessly hook into updates to the list by simply using the returned data from the hook. When `setState` is called any components using the hook will be re-rendered.

##### The Rest
The rest of the components are just generic bootstrap wrappers. `ImageRow` renders a set of assets within a bootstrap Row, `AssetContainer` renders the provided asset list, pulling three images off of the asset list to be rendered in a Row. `App` is responsible for fetching the asset manifest and subscribing to the lazy list hook. This allows the view components to be fairly composable, as they are purely functional and only responsible for rendering the provided props.
