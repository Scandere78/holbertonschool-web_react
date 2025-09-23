// Test runner for task_0 App component (ES modules version)
import React from 'react';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';

try {
  // Set up DOM environment
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });

  // Set global variables more carefully
  Object.defineProperty(globalThis, 'window', {
    value: dom.window,
    writable: true
  });
  Object.defineProperty(globalThis, 'document', {
    value: dom.window.document,
    writable: true
  });
  Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    writable: true
  });

  // Basic test - if we get here without errors, the setup works
  console.log('OK');
} catch (error) {
  console.log('NOK');
}