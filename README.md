# EzStudyFrontend

## 📝 Description
EzStudy is an AI-powered learning platform that transforms the way students study and learn. Built with React and Express.js, it provides an intelligent learning console with AI-driven insights, personalized study plans, and smart document analysis capabilities.

## ✨ Features
- **AI Learning Assistant**: Interactive chatbot powered by OpenAI for personalized learning support
- **Document Analysis**: Upload and analyze PDF, DOC, PPT files with AI-powered summarization
- **Chat History Persistence**: Save and restore conversations across sessions
- **User Authentication**: Secure login/signup with Clerk authentication
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **File Upload**: Support for multiple document formats with Cloudinary integration
- **Real-time Chat**: Interactive learning conversations with markdown support

## 🔧 Technologies Used
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React icons
- **Backend**: Node.js, Express.js, Multer for file uploads
- **AI/ML**: OpenAI API, PDF parsing, OCR with Tesseract.js
- **Authentication**: Clerk for user management
- **File Storage**: Cloudinary for document and image storage
- **Charts**: Chart.js for data visualization
- **Markdown**: React Markdown with GitHub Flavored Markdown support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
```sh
git clone https://github.com/Atanu2k4/EzStudyFrontend.git
cd EzStudyFrontend
```

2. **Install dependencies**
```sh
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:3001
```

4. **Start the development server**
```sh
npm run dev
```

5. **Backend Setup** (in a separate terminal)
```sh
cd ../EzStudyBackend
npm install
npm run dev
```

## 🚀 Usage
1. Register/Login using the authentication modal
2. Click "Go to AI Learning Console" to access the main learning interface
3. Upload documents for AI analysis or start chatting with the AI assistant
4. Create multiple chat sessions and switch between them
5. Your chat history is automatically saved and restored

## 🤝 Contribution
We welcome contributions! Here's how you can contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your fork
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

