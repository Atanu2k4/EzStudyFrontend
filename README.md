# EzStudy Frontend ⚛️

The frontend component of EzStudy, a modern React application providing a beautiful, responsive user interface for the AI-powered learning platform.

## 📋 Overview

EzStudy Frontend is a stunning React application that offers:
- 🎨 **Beautiful UI/UX** with modern design principles
- 🤖 **AI Chat Interface** with rich text formatting
- 📱 **Responsive Design** optimized for all devices
- 🌙 **Dark/Light Themes** with smooth transitions
- 🔐 **User Authentication** and profile management
- 📤 **File Upload** capabilities for document analysis

## 🚀 Features

- 🤖 **AI Learning Assistant**: Interactive chat interface with Groq-powered AI featuring **rich text formatting** with *bold* and *italic* emphasis
- 📄 **File Analysis**: Upload and analyze documents (PDFs, images, text files) for AI processing
- 🔐 **Smart Authentication**: Secure localStorage-based authentication with user registration, login, and profile management
- 🎯 **Multi-format Support**: Support for PDF parsing, image analysis, text file processing, and video content description
- 🌙 **Smart Theming**: Beautiful Dark and Light modes with smooth transitions
- 📱 **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices
- ✨ **Interactive UI**: Glassmorphic components, smooth animations, and hover effects powered by Tailwind CSS v4
- 🎨 **Beautiful Typography**: Custom font stack with Inter, Poppins, Playfair Display, Rubik, and Merriweather
- 🌈 **Gradient Text Effects**: Stunning blue-purple-red gradient text on all headings
- 💫 **Smooth Animations**: Hover effects with scale/transform animations on all interactive elements
- 💬 **Real-time Chat**: Multi-line message support with Shift+Enter, copy-to-clipboard functionality, and **rich text formatting** buttons
- 📊 **Learning Analytics**: Track study progress with interactive stat cards and progress indicators
- 🖼️ **Profile Management**: Upload and crop profile pictures with intuitive cropping interface

## 🛠️ Tech Stack

- ⚛️ **React 19** with Vite for fast development
- 🎨 **Tailwind CSS v4** for modern styling and animations
- 🔤 **Google Fonts**: Inter, Poppins, Playfair Display, Rubik, Merriweather for beautiful typography
- 🎯 **Lucide React** for beautiful icons
- 🎬 **DotLottie Player** for smooth animations
- 🖼️ **React Image Crop** for profile picture cropping
- 📱 **Headless UI** for accessible components
- 📝 **React Markdown** for rich text rendering
- 🔍 **Remark GFM** for GitHub Flavored Markdown support
- 💾 **localStorage** for client-side data persistence

### Styling Features
- 🌈 **Gradient Text**: Blue-purple-red gradients on all headings
- ✨ **Hover Effects**: Scale and transform animations on interactive elements
- 🎨 **Section-Specific Fonts**: Different stylish fonts for different sections
- 🌙 **Theme Transitions**: Smooth dark/light mode switching
- 📱 **Responsive Typography**: Adaptive font sizes across devices

## 📁 Project Structure

```
EzStudyFrontend/
├── .env                    # 🔑 Frontend environment variables
├── .env.local             # 🔒 Local environment overrides
├── .gitignore            # 🚫 Git ignore rules
├── dist/                 # 📦 Production build output
├── index.html            # 📄 Main HTML template
├── node_modules/         # 📦 Installed dependencies
├── package.json          # 📦 Dependencies and scripts
├── package-lock.json     # 🔒 Dependency lock file
├── src/                  # 📁 Source code
│   ├── App.css          # 🎨 Global styles with custom fonts
│   ├── App.jsx          # 🎯 Main application component
│   ├── components/      # 🧩 Reusable UI components
│   │   ├── About.jsx        # ℹ️ About section
│   │   ├── AuthModal.jsx    # 🔐 Authentication modal
│   │   ├── Contact.jsx      # 📞 Contact form
│   │   ├── Footer.jsx       # 🦶 Site footer
│   │   ├── Hero.jsx         # 🏠 Landing page hero
│   │   ├── LearningPage.jsx # 🤖 AI Chat interface
│   │   ├── LearningPageSimple.jsx # 🤖 Simple chat interface
│   │   ├── Legal.jsx        # ⚖️ Terms & privacy
│   │   ├── Navbar.jsx       # 🧭 Navigation component
│   │   └── Preloader.jsx    # ⏳ Loading animation
│   ├── main.jsx         # 🚀 Application entry point
│   └── index.css        # 📝 Base styles
├── vite.config.js       # ⚙️ Vite build configuration
└── README.md            # 📖 This documentation
```

## 📦 Getting Started
- **src/main.jsx**: Application entry point
- **index.html**: Main HTML template
- **vite.config.js**: Vite build configuration
- **package.json**: Frontend dependencies and scripts

## 📦 Getting Started

### Prerequisites

- 🟢 Node.js (Latest LTS version recommended)
- 📦 npm or yarn
- 🚀 Backend server running (see [EzStudyBackend README](../EzStudyBackend/README.md))

### Installation

1. **📥 Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ezstudy.git
   cd ezstudy/EzStudyFrontend
   ```

2. **📦 Install dependencies:**
   ```bash
   npm install
   ```

3. **🔧 Configure environment:**
   Create a `.env` file in the `EzStudyFrontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3001
   ```

4. **▶️ Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (or next available port).

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `EzStudyFrontend` directory:

```env
VITE_BACKEND_URL=http://localhost:3001
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | URL of the EzStudy backend API | `http://localhost:3001` |

### Development vs Production

- **Development**: Uses Vite's dev server with hot reloading
- **Production**: Build with `npm run build` and serve the `dist/` folder

## 📜 Available Scripts

- `npm run dev`: ▶️ Runs the frontend in development mode
- `npm run build`: 🏗️ Builds the frontend for production
- `npm run preview`: 👀 Previews the production build
- `npm run lint`: 🔍 Runs ESLint for code quality

## 🎯 Key Features Explained

### 🤖 AI Chat Interface
- 📝 **Multi-line Input**: Use Shift+Enter for new lines, Enter to send
- 📤 **File Upload**: Support for PDFs, images, and text files
- 🧠 **Smart Analysis**: AI analyzes uploaded content and provides contextual responses
- 📋 **Copy Messages**: Hover over any message to copy its content
- ✨ **Message Animations**: Smooth fade-in animations for better UX
- 📊 **Learning Stats**: Interactive stat cards showing study progress
- 💾 **Chat History**: Persistent conversation history with download option

### 🎨 Beautiful Typography & Styling
- 🔤 **Font Variety**: Different stylish fonts for different sections:
  - **Playfair Display**: Elegant serif for hero and branding
  - **Poppins**: Modern geometric for headings
  - **Rubik**: Contemporary geometric for modern sections
  - **Merriweather**: Classic serif for formal content
  - **Inter**: Clean sans-serif for body text
- 🌈 **Gradient Text**: Blue-purple-red gradients on all headings
- ✨ **Hover Effects**: Scale and transform animations on buttons and interactive elements
- 🌙 **Theme Consistency**: Typography adapts beautifully to dark/light modes

### 📄 File Processing
- 📕 **PDF Analysis**: Automatic text extraction and content analysis
- 🖼️ **Image Recognition**: AI can analyze images and provide descriptions
- 📄 **Text File Support**: Direct reading and analysis of text documents
- 🎥 **Video Description**: Support for video content analysis

### 🔐 Authentication & Profile System
- 💾 **Local Storage**: Secure client-side authentication
- 👤 **User Registration**: Create accounts with email and password
- 🔄 **Session Management**: Persistent login sessions
- 🖼️ **Profile Pictures**: Upload and crop profile images with intuitive interface
- 👨‍💼 **Profile Management**: User data stored securely with avatar support

### 📱 Responsive Design
- 🖥️ **Desktop Optimized**: Full-featured experience on large screens
- 📱 **Tablet Friendly**: Adaptive layouts for medium screens
- 📱 **Mobile Responsive**: Touch-optimized interface for phones
- 🎨 **Adaptive Typography**: Font sizes scale appropriately across devices

## 🎨 UI/UX Enhancements

### 🔤 Typography System
- **Section-Specific Fonts**: Each section uses different stylish fonts for visual variety
- **Hero Section**: Playfair Display for elegant, premium feel
- **About Section**: Rubik and Merriweather for modern-professional mix
- **Contact Section**: Merriweather for formal, trustworthy appearance
- **Navigation**: Playfair Display for premium branding
- **Body Text**: Inter throughout for optimal readability

### ✨ Visual Effects
- **Gradient Headings**: Blue-purple-red gradients on all headings using `bg-gradient-to-r`
- **Hover Animations**: Scale and transform effects on all interactive elements
- **Smooth Transitions**: 300ms duration transitions for all state changes
- **Glassmorphism**: Backdrop blur effects on navigation and modals
- **Theme Transitions**: Seamless switching between dark and light modes

### 🎯 Interactive Elements
- **Button Animations**: Hover scale effects with `hover:scale-105` and `active:scale-95`
- **Form Focus States**: Color transitions on input focus
- **Card Hover Effects**: Subtle lift animations on feature cards
- **Navigation Highlights**: Active state indicators with smooth transitions

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. ⬆️ Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [Legal](src/components/Legal.jsx) section for Terms and Privacy details.

## 🎉 Recent Updates (January 2026)

- ✨ **Enhanced Typography**: Implemented beautiful fonts across different sections
- 🌈 **Gradient Text Effects**: Added stunning blue-purple-red gradients to all headings
- 💫 **Smooth Animations**: Comprehensive hover effects on all interactive elements
- 🎨 **Section-Specific Styling**: Different fonts for different sections (Hero: Playfair Display, About: Rubik/Merriweather, etc.)
- 🖼️ **Profile Management**: Added profile picture upload and cropping functionality
- 📱 **Improved Responsiveness**: Enhanced mobile and tablet experiences
- 🌙 **Theme Consistency**: Typography and effects work beautifully in both dark and light modes

## 🙏 Acknowledgments

- ⚛️ **React** for the powerful component-based UI framework
- 🎨 **Tailwind CSS** for the amazing utility-first CSS framework
- 🔤 **Google Fonts** for beautiful typography (Inter, Poppins, Playfair Display, Rubik, Merriweather)
- 🎯 **Lucide React** for beautiful icons
- 🎬 **DotLottie** for smooth animations
- 🖼️ **React Image Crop** for profile picture cropping functionality
- ⚛️ **Headless UI** for accessible component primitives
- 🚀 **Vite** for lightning-fast development experience
- 📝 **React Markdown** for rich text rendering
- 🔍 **Remark GFM** for GitHub Flavored Markdown support

---
Built with ❤️ for a better learning experience. Updated as of January 11, 2026.
