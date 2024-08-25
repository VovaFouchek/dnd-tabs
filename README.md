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
