/*
 * Copyright (c) 2026. Market America/SHOP.com. All rights reserved.
 */
const debugButton = '.js-cc-widget-debug';
const debugInfo = '.js-cc-widget-debug-info';

export const initiateDebugListener = () => {
  handleDebugEventListener();
}

function handleDebugEventListener(){
  const debug = document.querySelector(debugButton);
  if(debug){
    debug.addEventListener('click', () => {
      document.querySelector(debugInfo).style.display = "block";
    })
  }
}
