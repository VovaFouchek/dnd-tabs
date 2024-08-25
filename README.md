# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

# React Tab Component with Drag and Drop, Pinning, and Scrolling

## Description

This project is a React-based tab component with advanced functionality including drag-and-drop, pinning, scrolling, and state persistence. The component is designed with TypeScript and makes use of the Intersection Observer API and drag-and-drop capabilities.

## Features

- **Drag and Drop**:
  - Tabs can be rearranged using drag-and-drop.
  - Pinned tabs cannot be moved to the place of unpinned tabs and vice versa.
  - On mobile devices, dragging tabs is enabled after a 2-second press to avoid conflicts with scrolling.
- **Pinning**:

  - Pinned tabs remain visible and do not scroll with unpinned tabs.

- **Scrolling**:

  - Tabs that do not fit into the visible container area are shown in a dropdown list.
  - Shadows are displayed along the container's edges if tabs extend beyond the visible area.

- **State Persistence**:

  - The state of the tabs (e.g., order, pinned status) is saved and restored after a page reload.

- **Router Integration**:
  - Each tab has an associated URL. Changing the active tab updates the browser's URL to reflect the active tab.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/VovaFouchek/dnd-tabs.git
   cd dnd-tabs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
