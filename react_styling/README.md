# React Styling

This project focuses on styling React applications using modern CSS techniques, particularly Tailwind CSS v4.

## 📚 Tasks

### Task 0: Tailwind CSS Setup
**Files**: `task_0/dashboard/`

Set up a React dashboard with Tailwind CSS v4 and integrate the Roboto font family.

**Key Features**:
- Tailwind CSS v4 via `@tailwindcss/vite`
- Roboto font integration with `@fontsource/roboto`
- Custom theme configuration
- Font weight detection probes

**Learning Objectives**:
- Install and configure Tailwind CSS with Vite
- Self-host fonts using @fontsource
- Configure custom themes
- Use CSS variables

### Task 1: Component Styling
**Files**: `task_1/dashboard/`

Apply styles to React components using Tailwind utility classes.

**Key Features**:
- CourseList component with 85% width container
- Table styling with custom colors
- Alpha-hex color variables
- Responsive layout

**Learning Objectives**:
- Use Tailwind utility classes
- Create reusable styled components
- Implement CSS variables with Tailwind
- Handle transparent backgrounds

### Task 2: Advanced Styling
**Files**: `task_2/dashboard/`

Advanced styling techniques with notifications and dynamic UI elements.

**Key Features**:
- Fixed positioned notification drawer
- Custom color variables for notification types
- Drawer toggle functionality
- Styled notification items

**Learning Objectives**:
- Position elements with Tailwind
- Manage z-index layers
- Create interactive UI components
- Use CSS variables for theming

## 🚀 Quick Start

```bash
# Navigate to a task
cd task_0/dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🎨 Styling Approach

### Tailwind CSS v4
This project uses Tailwind CSS v4 with the new `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Roboto", sans-serif;
  --color-table-header: #deb5b5;
}
```

### Font Integration
Roboto fonts are self-hosted using @fontsource:

```javascript
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

### CSS Variables
Custom properties for dynamic theming:

```css
:root {
  --main-color: #e1003c;
  --color-table-header-66: #deb5b5A8;  /* 66% opacity */
}
```

## 📁 Structure

```
react_styling/
├── task_0/
│   └── dashboard/
│       ├── src/
│       │   ├── main.jsx
│       │   ├── main.css
│       │   └── components/
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
├── task_1/
│   └── dashboard/
└── task_2/
    └── dashboard/
```

## ✅ Requirements

- React 18.3.1+
- Tailwind CSS 4.1.16
- Vite 5.4.8+
- @fontsource/roboto 5.2.8

## 🎯 Learning Outcomes

After completing these tasks, you will understand:
- How to integrate Tailwind CSS with Vite
- Self-hosting fonts vs CDN
- Using CSS variables with Tailwind
- Creating responsive layouts
- Styling tables and lists
- Managing z-index and positioning
- Creating themed components

## 📝 Notes

- All builds must complete without errors
- No console errors in production
- Follow Tailwind CSS v4 syntax
- Use semantic HTML elements
- Maintain accessibility standards

---

**Part of**: Holberton School Web React Curriculum
