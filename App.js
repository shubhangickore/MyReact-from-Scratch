// App.js
import { createElement, useState } from './React.js';

export default function App() {
  const [count, setCount] = useState(0);

  return createElement(
    'div',
    null,
    createElement('h1', null, ` Here is the Count: ${count}`),
    createElement(
      'button',
      { onClick: () => setCount(count + 2) },
      'Increment'
    )
  );
}
