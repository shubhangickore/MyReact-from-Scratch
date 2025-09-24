// React.js
let state = [];
let cursor = 0;

let rootComponent = null;
let rootContainer = null;

export function createElement(type, props, ...children) {
  return { type, props: { ...props, children } };
}

export function render(vNode, container) {
  rootComponent = vNode;
  rootContainer = container;

  container.innerHTML = '';
  _render(vNode, container);
  cursor = 0;
}

function _render(vNode, container) {
  if (vNode === null || vNode === undefined) return;

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    container.appendChild(document.createTextNode(vNode));
    return;
  }

  if (typeof vNode.type === 'function') {
    _render(vNode.type(vNode.props || {}), container);
    return;
  }

  const dom = document.createElement(vNode.type);
  const props = vNode.props || {};

  for (const [key, value] of Object.entries(props)) {
    if (key === 'children') continue;
    if (key.startsWith('on') && typeof value === 'function') {
      dom.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      dom[key] = value;
    }
  }

  (props.children || []).forEach(child => _render(child, dom));
  container.appendChild(dom);
}

export function useState(initial) {
  const currentIndex = cursor;
  state[currentIndex] = state[currentIndex] ?? initial;

  function setState(newState) {
    state[currentIndex] = newState;
    render(rootComponent, rootContainer);
  }

  cursor++;
  
  return [state[currentIndex], setState];
}
