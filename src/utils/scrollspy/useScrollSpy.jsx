import React from 'react';
import useThrottledOnScroll from './useThrottledOnScroll';

const tabHeight = 69;

/**
 * This is a public library for scrolling tabs, not OUR OWN work
 * */
/*
Credits: Material UI
Source:
https://github.com/mui-org/material-ui/blob/404c2ba16816f5c7ab7d8b2caf6bbc3d2218b820/docs/src/modules/utils/textToHash.js
*/
const makeUnique = (hash, unique, i = 1) => {
  const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

  if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUnique(hash, unique, i + 1);
};

const textToHash = (text, unique = {}) => makeUnique(
  encodeURI(
    text
      .toLowerCase()
      .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
    // eslint-disable-next-line no-useless-escape
      .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, ''),
  ),
  unique,
);

export default function useScrollSpy(props) {
  const [activeState, setActiveState] = React.useState(null);
  const { tabsInScroll } = props;

  const itemsServer = tabsInScroll.map((tab) => {
    const hash = textToHash(tab.text);
    return {
      text: tab.text,
      label:
  <div>
    {tab.icon}
    {' '}
    {tab.text}
  </div>,
      component: tab.component,
      hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node
                && item.node.offsetTop
                < document.documentElement.scrollTop
                + document.documentElement.clientHeight / 8
                + tabHeight + 150
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);

      if (window) {
        window.scrollTo({
          top:
                        document.getElementById(hash).getBoundingClientRect().top
                        + window.pageYOffset - 150,
          behavior: 'smooth',
        });
      }
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  return [
    activeState,
    itemsServer,
    {
      handleClick: (hash) => handleClick(hash),
    },
  ];
}
