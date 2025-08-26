# Design System Platform 🎨

**The world's first browser-based component customizer that exports native Figma components**

This revolutionary tool bridges the gap between browser-based customization and professional design software, allowing users to visually customize components without design skills and get production-ready Figma components.

## ✨ Features

- **🔍 Component Search & Browse**: Search and browse component libraries directly in your browser
- **🎨 Real-time Customization**: Customize components live with controls for colors, sizes, corner radius, padding, and more
- **👀 Live Preview**: See changes instantly as you customize
- **📦 Figma Export**: Export customized components as downloadable Figma plugin ZIP files
- **🔧 Native Component Creation**: Install plugins in Figma to create actual native components with auto layout and responsive properties
- **🌙 Dark/Light Mode**: Full theme support with system preference detection

## 🚀 What Makes This Special

This is the **first tool ever** to allow:
- Browser-based component editing with professional-grade output
- Direct export to native Figma components (not just images or shapes)
- Components that appear in Figma's Assets panel for reuse
- Full auto layout and responsive properties preservation

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom Figma Plugin Architecture** for native component creation

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── builder/           # Main builder interface
│   ├── design-system/     # Design system components
│   └── figma/            # Figma integration components
├── guidelines/           # Design guidelines and documentation
└── styles/              # Global styles and themes
```

## 🎯 How It Works

1. **Browse Components**: Search through available design system components
2. **Customize**: Use intuitive controls to modify colors, sizes, spacing, and more
3. **Preview**: See real-time updates as you make changes
4. **Export**: Generate a Figma plugin ZIP file with your customized component
5. **Install**: Load the plugin in Figma to create native, reusable components

## 🤝 Contributing

This project represents a breakthrough in design tool workflows. Contributions are welcome!

## 📄 License

MIT License - feel free to use this revolutionary approach in your own projects!

---

*Built with ❤️ for designers and developers who want to bridge the gap between browser-based editing and professional design tools.*