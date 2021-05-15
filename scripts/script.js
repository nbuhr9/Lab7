// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// To track specific entries
let numEntries = 0;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        // Each entry is assigned its count as its id
        numEntries++;
        newPost.id = numEntries;

        // Handle click on entry (display single entry)
        newPost.addEventListener('click', () => {
          setState({name: 'entry', id: newPost.id}, false);
        });

        document.querySelector('main').appendChild(newPost);
      });
    });

    // Handle click on header (display home page if not on home page)
    document.querySelector('header h1').addEventListener('click', () => {
      if (history.state != null && history.state.name != 'home') {
        setState({name: 'home'}, false);
      };
    });
    
    // Handle click on settings button (display settings page if not on settings page)
    document.querySelector('header img').addEventListener('click', () => {
      if (history.state == null || history.state.name != 'settings') {
        setState({name: 'settings'}, false);
      }
    });
});

// Handle click on undo/revert button
window.addEventListener('popstate', (event) => {
  setState(event.state, true);
});
