import React, { useState, useEffect, useRef } from "react";
import { Home, Info, Phone, Menu, X, Sun, Moon, LogOut, User, Bot, Camera, Upload, Crop, Check, X as CloseIcon } from "lucide-react";

const Navbar = ({ darkMode, toggleDarkMode, isVisible, user, setUser, onLogout, onLoginClick, setShowLearningPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [cropArea, setCropArea] = useState({ x: 64, y: 64, width: 128, height: 128 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const cropContainerRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (sectionId === "#learning") {
      setShowLearningPage(true);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Small delay to allow mobile menu to start closing for smoother transition
    setTimeout(() => {
      if (!sectionId || sectionId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }

      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected:', file);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Create image URL for cropping
    const imageUrl = URL.createObjectURL(file);
    setCropImageSrc(imageUrl);
    setIsCroppingImage(true);
    setIsProfileDropdownOpen(false); // Close dropdown when cropping starts
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = () => {
    if (!cropImageSrc) return;

    const img = new Image();
    img.onload = () => {
      // Create canvas for cropping
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Container dimensions
      const containerWidth = 320; // w-80 = 320px
      const containerHeight = 256; // h-64 = 256px

      // Scale factors
      const scaleX = img.width / containerWidth;
      const scaleY = img.height / containerHeight;

      // Calculate actual crop coordinates with proper handling of negative values
      let x = cropArea.x * scaleX;
      let y = cropArea.y * scaleY;
      let width = cropArea.width * scaleX;
      let height = cropArea.height * scaleY;

      // Ensure we don't crop outside image boundaries
      // If crop area extends beyond image, clamp to image edges
      x = Math.max(0, x);
      y = Math.max(0, y);
      width = Math.min(img.width - x, width);
      height = Math.min(img.height - y, height);

      // Ensure minimum crop size
      width = Math.max(10, width);
      height = Math.max(10, height);

      // Set canvas size to the cropped area
      canvas.width = width;
      canvas.height = height;

      // Draw cropped portion
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      // Convert to blob and upload
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'profile-cropped.jpg', { type: 'image/jpeg' });
          uploadCroppedImage(croppedFile);
        }
      }, 'image/jpeg', 0.9);
    };

    img.src = cropImageSrc;
  };

  const handleCropMouseDown = (e, corner) => {
    if (corner) {
      setIsResizing(corner);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - cropArea.x, y: e.clientY - cropArea.y });
    }
  };

  const handleCropMouseMove = (e) => {
    if (!cropContainerRef.current) return;

    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Allow UNLIMITED crop area extension beyond container boundaries for maximum flexibility
      // Remove all constraints - let users position crop area anywhere
      setCropArea(prev => ({
        ...prev,
        x: newX, // No min/max constraints
        y: newY  // No min/max constraints
      }));
    } else if (isResizing) {
      const minSize = 20; // Minimum crop size for usability

      let { x, y, width, height } = cropArea;

      if (isResizing.includes('e')) {
        width = Math.max(minSize, e.clientX - dragStart.x + width);
      }
      if (isResizing.includes('s')) {
        height = Math.max(minSize, e.clientY - dragStart.y + height);
      }
      if (isResizing.includes('w')) {
        const deltaX = e.clientX - dragStart.x;
        const newWidth = Math.max(minSize, width - deltaX);
        if (newWidth !== width) {
          x = x + deltaX; // Allow x to go as negative as needed
          width = newWidth;
        }
      }
      if (isResizing.includes('n')) {
        const deltaY = e.clientY - dragStart.y;
        const newHeight = Math.max(minSize, height - deltaY);
        if (newHeight !== height) {
          y = y + deltaY; // Allow y to go as negative as needed
          height = newHeight;
        }
      }

      setDragStart({ x: e.clientX, y: e.clientY });
      setCropArea({ x, y, width, height });
    }
  };

  const handleCropMouseUp = () => {
    setIsDragging(false);
    setIsResizing(null);
  };

  const uploadCroppedImage = async (file) => {
    setIsUploadingImage(true);
    setIsCroppingImage(false);

    try {
      // STATIC IMPLEMENTATION: Convert file to Base64 and save locally
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result;
        
        // Simulate a slight delay to look like an upload
        setTimeout(() => {
          console.log('Static upload successful');
          const updatedUser = { ...user, profileImage: base64String };
          localStorage.setItem('ezstudy_currentUser', JSON.stringify(updatedUser));
          setUser(updatedUser);
          
          setIsUploadingImage(false);
          setCropImageSrc(null);
        }, 500);
      };
      
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Static upload error:', error);
      alert('Failed to process image');
      setIsUploadingImage(false);
      setCropImageSrc(null);
    }
  };

  return (
    <>
      <div className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 w-[95%] sm:w-[90%] max-w-6xl z-50 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <nav className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-3xl rounded-full px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between flex-1 font-[Rubik]">
          {/* Logo */}
          <div className="text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text tracking-wide drop-shadow-sm hover:scale-105 transition-transform cursor-default font-['Playfair_Display']">
            EzStudy
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-10">
            <NavItem icon={<Home size={16} className="text-blue-500" />} text="Home" href="#" onClick={(e) => scrollToSection(e, "#")} />
            {user && <NavItem icon={<Bot size={16} className="text-indigo-500" />} text="AI Console" href="#learning" onClick={(e) => scrollToSection(e, "#learning")} />}
            <NavItem icon={<Info size={16} className="text-purple-500" />} text="About" href="#about" onClick={(e) => scrollToSection(e, "#about")} />
            <NavItem icon={<Phone size={16} className="text-red-400" />} text="Contact" href="#contact" onClick={(e) => scrollToSection(e, "#contact")} />
          </div>

          {/* Mobile Menu Button Container */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 active:scale-90 hover:scale-110 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {isMobileMenuOpen ? <X size={20} className="text-gray-900 dark:text-white" /> : <Menu size={20} className="text-gray-900 dark:text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 mx-2 md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-3xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
              <button
                onClick={(e) => scrollToSection(e, "#")}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:scale-105 active:scale-95"
              >
                <Home size={18} className="text-blue-500" />
                <span className="font-medium">Home</span>
              </button>
              {user && (
                <button
                  onClick={(e) => scrollToSection(e, "#learning")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:scale-105 active:scale-95"
                >
                  <Bot size={18} className="text-indigo-500" />
                  <span className="font-medium">AI Console</span>
                </button>
              )}
              <button
                onClick={(e) => scrollToSection(e, "#about")}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:scale-105 active:scale-95"
              >
                <Info size={18} className="text-purple-500" />
                <span className="font-medium">About</span>
              </button>
              <button
                onClick={(e) => scrollToSection(e, "#contact")}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:scale-105 active:scale-95"
              >
                <Phone size={18} className="text-red-400" />
                <span className="font-medium">Contact</span>
              </button>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mt-2 flex flex-col space-y-2">
                {/* Mobile Auth Buttons */}
                <div className="pt-2">
                  {!user ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLoginClick();
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-center shadow-md active:scale-95 transition-all font-['Inter']"
                    >
                      Login
                    </button>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-200">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden group">
                          {false ? (
                            <img
                              src={user.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                              {user.name?.charAt(0) || user.email?.charAt(0)}
                            </div>
                          )}
                          {/* Upload Disabled
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera size={12} className="text-white" />
                          </div> */}
                        </div>
                        <span className="text-xs font-medium truncate max-w-[120px]">{user.name || user.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:text-red-600"
                      >
                        <LogOut size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Authentication Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-10">
            {/* Show user profile button when signed in */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 font-['Inter']">{user.name || 'User'}</span>
                  <button
                    onClick={onLogout}
                    className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110 active:scale-95 font-['Inter']"
                  >
                    Logout
                  </button>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-purple-500 to-red-400 p-0.5 shadow-lg group relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    {false ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div ref={profileDropdownRef} className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-gray-800 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden group cursor-pointer" onClick={handleImageClick}>
                          {false ? (
                            <img
                              src={user.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                              {user.name?.charAt(0) || user.email?.charAt(0)}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[10px] font-semibold text-gray-900 dark:text-white truncate font-['Inter']">
                            {user.name || 'User'}
                          </h3>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-['Inter']">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageUpload}
                        className="hidden"
                      />

                      {/* Upload button */}
                      <div className="mb-3">
                        <button
                          onClick={handleImageClick}
                          disabled={isUploadingImage}
                          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 hover:shadow-md disabled:hover:scale-100"
                        >
                          {isUploadingImage ? (
                            <>
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-sm font-medium font-['Inter']">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Camera size={16} />
                              <span className="text-sm font-medium font-['Inter']">Upload Photo</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-['Inter']">Account Type</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white font-['Inter']">Free</span>
                        </div>
                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-['Inter']">Joined</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white font-['Inter']">
                            {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-['Inter']">AI Interactions</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white font-['Inter']">∞</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <LogOut size={16} />
                          <span className="text-sm font-medium font-['Inter']">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all duration-300 font-['Inter']"
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* New Day/Night Toggle from Uiverse.io */}
        <div className="theme-toggle-wrapper">
          <input
            className="input"
            id="dn"
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label className="toggle" htmlFor="dn">
            <span className="toggle__handler">
              <span className="crater crater--1"></span>
              <span className="crater crater--2"></span>
              <span className="crater crater--3"></span>
            </span>
            <span className="star star--1"></span>
            <span className="star star--2"></span>
            <span className="star star--3"></span>
            <span className="star star--4"></span>
            <span className="star star--5"></span>
            <span className="star star--6"></span>
          </label>
        </div>
      </div>

      {/* Image Cropping Modal - Centered on Whole Page */}
      {isCroppingImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto" onMouseMove={handleCropMouseMove} onMouseUp={handleCropMouseUp} onMouseLeave={handleCropMouseUp}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 my-auto transform scale-100 animate-in fade-in zoom-in-95 duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text text-center flex-1 font-['Poppins']">Crop Profile Picture</h3>
              <button
                onClick={() => {
                  setIsCroppingImage(false);
                  setCropImageSrc(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ml-2"
              >
                <CloseIcon size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="relative mb-6">
              <div ref={cropContainerRef} className="relative w-80 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-move user-select-none" onMouseDown={(e) => handleCropMouseDown(e, null)}>
                {cropImageSrc && (
                  <img
                    src={cropImageSrc}
                    alt="Crop preview"
                    className="w-full h-full object-contain pointer-events-none"
                    onLoad={(e) => {
                      setImageSize({ width: e.target.naturalWidth, height: e.target.naturalHeight });
                    }}
                  />
                )}

                {/* Darkened overlay areas */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top section */}
                  <div className="absolute top-0 left-0 right-0 bg-black/60" style={{ height: `${Math.max(0, cropArea.y)}px` }}></div>
                  {/* Bottom section */}
                  <div className="absolute left-0 right-0 bg-black/60" style={{ top: `${Math.max(0, cropArea.y + cropArea.height)}px`, bottom: 0 }}></div>
                  {/* Left section */}
                  <div className="absolute top-0 left-0 bg-black/60" style={{ width: `${Math.max(0, cropArea.x)}px`, height: '100%' }}></div>
                  {/* Right section */}
                  <div className="absolute top-0 right-0 bg-black/60" style={{ width: `${Math.max(0, 320 - cropArea.x - cropArea.width)}px`, height: '100%' }}></div>

                  {/* Center square crop area - plain and simple */}
                  <div
                    className={`absolute border-2 group cursor-grab active:cursor-grabbing transition-all ${cropArea.x < 0 || cropArea.y < 0 || cropArea.x + cropArea.width > 320 || cropArea.y + cropArea.height > 256
                      ? 'border-yellow-400'
                      : 'border-gray-300 dark:border-gray-500'
                      }`}
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleCropMouseDown(e, null);
                    }}
                  >
                    {/* Edge handles - plain square */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-n-resize rounded-t transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'n'); }}></div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-s-resize rounded-b transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 's'); }}></div>
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-6 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-w-resize rounded-l transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'w'); }}></div>
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-6 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-e-resize rounded-r transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'e'); }}></div>

                    {/* Corner handles - plain small squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-nw-resize transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'nw'); }}></div>
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-ne-resize transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'ne'); }}></div>
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-sw-resize transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'sw'); }}></div>
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 cursor-se-resize transition-all duration-300 hover:scale-110 active:scale-95" onMouseDown={(e) => { e.stopPropagation(); handleCropMouseDown(e, 'se'); }}></div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center font-medium font-['Inter']">
                Drag to move • Use corner/edge handles to resize • Yellow border = extends beyond image
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCropArea({ x: 64, y: 64, width: 128, height: 128 })}
                className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm hover:scale-105 active:scale-95 hover:shadow-md"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  setIsCroppingImage(false);
                  setCropImageSrc(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                disabled={isUploadingImage}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/30 disabled:hover:scale-100"
              >
                {isUploadingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Apply</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavItem = ({ icon, text, href, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300 font-medium hover:text-purple-600 dark:hover:text-purple-400 group transition-all duration-300 font-['Inter']"
    >
      <span className="p-1.5 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 shadow-sm group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-blue-100 dark:group-hover:from-purple-900/50 dark:group-hover:to-blue-900/50">
        {icon}
      </span>
      <span className="relative overflow-hidden group">
        {text}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
      </span>
    </a>
  );
};

export default Navbar;