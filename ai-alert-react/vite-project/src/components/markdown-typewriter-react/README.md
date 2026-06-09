# Markdown Typewriter React

[![npm version](https://badge.fury.io/js/markdown-typewriter-react.svg)](https://badge.fury.io/js/markdown-typewriter-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A React component that renders markdown content with a smooth, natural typewriter animation. It types the raw markdown character-by-character while rendering it progressively in real time — perfect for demos, docs, and tutorials.



## Live Demo

**[Try it out →](https://hardik500.github.io/markdown-typewriter-react/)**



https://github.com/user-attachments/assets/eb35d43b-2fb4-4f47-8ffb-6e8fe9c0dd05



## Features

- **Simple API** - Just pass markdown content and watch it type out
- **Lightweight** - Minimal dependencies, optimized bundle size
- **Customizable** - Configurable typing speed and behavior
- **Responsive** - Works on all screen sizes
- **TypeScript** - Full TypeScript support with type definitions
- **React 16.8+** - Compatible with modern React versions
- **Well Tested** - Comprehensive test coverage

## Installation

```bash
# Using pnpm (recommended)
pnpm add markdown-typewriter-react

# Using npm
npm install markdown-typewriter-react

# Using yarn
yarn add markdown-typewriter-react
```

## Quick Start

```jsx
import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const App = () => {
  const markdown = `
# Welcome to Markdown Typewriter

This is a **bold** statement with *italic* text.

## Features
- Typewriter animation
- Markdown support
- Easy to use

\`\`\`javascript
console.log('Hello, World!');
\`\`\`
  `;

  return <MarkdownTypewriter markdown={markdown} />;
};

export default App;
```

## 📖 API Reference

### MarkdownTypewriter

The main component that renders markdown with typewriter effect.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `markdown` | `string` | - | **Required.** The markdown content to render |
| `delay` | `number` | `75` | Typing delay per tick in milliseconds |
| `charsPerTick` | `number` | `1` | How many characters to reveal per tick (>= 1) |
| `showRaw` | `boolean` | `false` | Also show the raw markdown being typed with a caret |
| `layout` | `'stack'` or `'split'` | `stack` | Layout when `showRaw` is true. `split` shows raw and rendered side-by-side |
| `className` | `string` | - | Additional CSS class name |
| `style` | `React.CSSProperties` | - | Inline styles |

### Example with Custom Options

```jsx
import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const CustomExample = () => {
  const content = `
# Custom Configuration

This text types out with a **slower** delay.
  `;

  return (
    <MarkdownTypewriter
      markdown={content}
      delay={150}
      className="my-custom-class"
      style={{ fontSize: '18px', lineHeight: '1.6' }}
    />
  );
};
```

## Styling

The component renders a `div` with the class `markdown-typewriter`. You can style it using CSS:

```css
.markdown-typewriter {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.6;
  color: #333;
}

.markdown-typewriter h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.markdown-typewriter code {
  background-color: #f8f9fa;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
```

## Testing

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownTypewriter from 'markdown-typewriter-react';

test('renders markdown content', () => {
  const markdown = '# Test Heading\n\nThis is a test.';
  render(<MarkdownTypewriter markdown={markdown} />);

  // The component will render the content
  expect(document.body).toBeInTheDocument();
});
```

## 🔧 Development

### Prerequisites

- Node.js >= 20.19.0
- pnpm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/Hardik500/markdown-typewriter-react.git
cd markdown-typewriter-react

# Install dependencies
pnpm install

# Start development server
pnpm start
```

### Available Scripts

- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm start` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run Biome lint
- `pnpm run lint:fix` - Apply Biome fixes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/Hardik500/markdown-typewriter-react/issues).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Hardik Khandelwal](https://github.com/Hardik500)
