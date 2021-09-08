## Props.children
- The child components are the React elements that we define between the opening and closing tags of a component. `props.children` is automatically added by React and always exists. If a component is defined with an automatically closing `/>` tag, then `props.children` is an *empty array*.

- Where to place state: Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.

## useRef
- There are a few good use cases for refs:
  - Managing focus, text selection, or media playback.
  - Triggering imperative animations.
  - Integrating with third-party DOM libraries.

- Avoid using refs for anything that can be done declaratively
- In the component that is referenced:
  - The function that creates the component is wrapped inside of a `React.forwardRef` function call. This way the component can access the ref that is assigned to it.
  - The component uses the `useImperativeHandle` hook to make its function available outside of the component.

  ## Piece information
- Save item for later use: `window.localStorage`. Two common use method: `getItem` and `setItem`.

- React prevent XSS attack by escape every text before render.

- The expected and required props of a component can be defined with the `prop-types` package.
```
npm install prop-types
```