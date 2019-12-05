# Lazily Loading Cats
A simple demo showing off a collection of react components used to implement inifinite scrolling. This is accomplished by lazily loading dom images when the user scrolls close to the bottom of the page.

### Breakdown
##### `useLazyList`
The backbone of the whole collection, a simple react hook that subscribes to an notifying function, rendering a continuously larger subset of the provided assets. By using `useEffect` we can create a reusable component that ocntains the logic for subscribing to the notifying function. By returning the state held by `useState`, any components can seamlessly hook into updates to the list by simply using the returned data from the hook. When `setState` is called any components using the hook will be re-rendered.

##### The Rest
The rest of the components are just generic bootstrap wrappers. `ImageRow` renders a set of assets within a bootstrap Row, `AssetContainer` renders the provided asset list, pulling three images off of the asset list to be rendered in a Row. `App` is responsible for fetching the asset manifest and subscribing to the lazy list hook. This allows the view components to be fairly composable, as they are purely functional and only responsible for rendering the provided props.

##### Oddities
As this is hosted through gh-pages, everything that's in the repo is what's deployed to the site. This is why the `index.html` is in the root directory and the `dist/` is committed to the repo. Also, as this is just a demo, it's much easier to host the images through gh-pages rather than a CDN which is why all assets are committed to the repo.

Check it out at https://opnet.github.io/
