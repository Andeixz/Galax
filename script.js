// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Create animated background
    createAnimatedBackground();
    
    // Initialize views
    initializeViews();
    
    // Initialize forms
    initializeForms();
    
    // Initialize task management
    initializeTaskManagement();
    
    // Initialize user dashboard
    initializeUserDashboard();
    
    // Initialize profile
    initializeProfile();
    
    // Initialize settings
    initializeSettings();
    
    // Initialize countdown
    initializeCountdown();
    
    // Initialize bottom navigation
    initializeBottomNavigation();
    
    // Check for dark mode preference
    checkDarkModePreference();
});

// Create animated background
function createAnimatedBackground() {
    const bg = document.getElementById('animatedBg');
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 60 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        bg.appendChild(particle);
    }
    
    // Create light streaks
    for (let i = 0; i < 5; i++) {
        const streak = document.createElement('div');
        streak.classList.add('light-streak');
        
        streak.style.top = `${Math.random() * 100}%`;
        streak.style.animationDelay = `${Math.random() * 8}s`;
        streak.style.animationDuration = `${Math.random() * 4 + 6}s`;
        
        bg.appendChild(streak);
    }
    
    // Create glow dots
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.classList.add('glow-dot');
        
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 4}s`;
        
        bg.appendChild(dot);
    }
}

// Initialize views
function initializeViews() {
    // View switching
    const viewElements = document.querySelectorAll('.view');
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Switch view
            viewElements.forEach(view => view.classList.remove('active'));
            document.getElementById(targetView).classList.add('active');
        });
    });
    
    // Close popups
    const closeButtons = document.querySelectorAll('.popup-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            popup.classList.remove('active');
        });
    });
    
    // Close popup on overlay click
    const overlays = document.querySelectorAll('.popup-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// Initialize forms
function initializeForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        // Validate email
        if (!validateEmail(email)) {
            showMessage('Format email tidak valid', 'error');
            return;
        }
        
        // Validate password
        if (password.length < 8) {
            showMessage('Password minimal 8 karakter', 'error');
            return;
        }
        
        // Simulate login
        showMessage('Login berhasil!', 'success');
        
        // Switch to user dashboard
        setTimeout(() => {
            document.getElementById('loginView').classList.remove('active');
            document.getElementById('userDashboardView').classList.add('active');
            document.getElementById('bottomNav').style.display = 'flex';
        }, 1000);
    });
    
    // Register button
    document.getElementById('registerBtn').addEventListener('click', function() {
        showMessage('Fitur registrasi akan segera hadir', 'info');
    });
    
    // Password toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('passwordInput');
    
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });
    
    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        
        if (password.length === 0) {
            strengthIndicator.className = 'password-strength-fill';
            return;
        }
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Complexity checks
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        // Update indicator
        strengthIndicator.className = 'password-strength-fill';
        
        if (strength <= 2) {
            strengthIndicator.classList.add('strength-weak');
        } else if (strength <= 4) {
            strengthIndicator.classList.add('strength-medium');
        } else {
            strengthIndicator.classList.add('strength-strong');
        }
    });
    
    // Edit task form
    const editTaskForm = document.getElementById('editTaskForm');
    editTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('editTaskTitle').value;
        const description = document.getElementById('editTaskDescription').value;
        
        // Update task (in a real app, this would save to a database)
        showMessage('Tugas berhasil diperbarui', 'success');
        
        // Close popup
        document.getElementById('editTaskPopup').classList.remove('active');
    });
    
    // Character counters
    const titleInput = document.getElementById('editTaskTitle');
    const descInput = document.getElementById('editTaskDescription');
    const titleCount = document.getElementById('titleCharCount');
    const descCount = document.getElementById('descCharCount');
    
    titleInput.addEventListener('input', function() {
        titleCount.textContent = this.value.length;
    });
    
    descInput.addEventListener('input', function() {
        descCount.textContent = this.value.length;
    });
    
    // Cancel edit button
    document.getElementById('cancelEditBtn').addEventListener('click', function() {
        document.getElementById('editTaskPopup').classList.remove('active');
    });
}

// Initialize task management
function initializeTaskManagement() {
    // Add task button
    document.getElementById('addTaskBtn').addEventListener('click', function() {
        // In a real app, this would open a form to create a new task
        showMessage('Fitur tambah tugas akan segera hadir', 'info');
    });
    
    // Generate sample tasks
    generateSampleTasks();
    
    // Task popup buttons
    document.getElementById('copyLinkBtn').addEventListener('click', function() {
        const link = document.getElementById('popupTaskLink').textContent;
        copyToClipboard(link);
        showMessage('Link disalin ke clipboard', 'success');
    });
    
    document.getElementById('openLinkBtn').addEventListener('click', function() {
        const link = document.getElementById('popupTaskLink').textContent;
        window.open(link, '_blank');
    });
    
    document.getElementById('cancelTaskBtn').addEventListener('click', function() {
        document.getElementById('taskPopup').classList.remove('active');
    });
    
    document.getElementById('submitTaskBtn').addEventListener('click', function() {
        const imagePreview = document.getElementById('imagePreview');
        
        if (imagePreview.style.display === 'none') {
            showMessage('Silakan upload bukti gambar', 'error');
            return;
        }
        
        // In a real app, this would submit the task to a server
        showMessage('Tugas berhasil dikirim', 'success');
        
        // Close popup
        document.getElementById('taskPopup').classList.remove('active');
        
        // Reset image preview
        imagePreview.style.display = 'none';
        document.getElementById('fileInput').value = '';
    });
    
    // File upload
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFileUpload(this.files[0]);
        }
    });
    
    function handleFileUpload(file) {
        // Validate file type
        if (!file.type.match('image.*')) {
            showMessage('Hanya file gambar yang diperbolehkan', 'error');
            return;
        }
        
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('Ukuran file maksimal 5MB', 'error');
            return;
        }
        
        // Preview image
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Generate sample tasks
function generateSampleTasks() {
    const taskList = document.getElementById('taskList');
    const availableTasks = document.getElementById('availableTasks');
    
    // Sample tasks for poster dashboard
    const posterTasks = [
        {
            title: 'Review Produk A',
            category: 'WEBSITE',
            progress: 75,
            total: 100,
            timeLeft: '2 jam 30 menit',
            isWarning: false
        },
        {
            title: 'Subscribe Channel B',
            category: 'SOCIAL',
            progress: 50,
            total: 100,
            timeLeft: '5 jam 15 menit',
            isWarning: false
        },
        {
            title: 'Install App C',
            category: 'APP',
            progress: 90,
            total: 100,
            timeLeft: '30 menit',
            isWarning: true
        }
    ];
    
    // Sample tasks for user dashboard
    const userTasks = [
        {
            title: 'Kunjungi Website X',
            category: 'WEBSITE',
            reward: '5 TON',
            time: '2 menit'
        },
        {
            title: 'Like Post Instagram',
            category: 'SOCIAL',
            reward: '2 TON',
            time: '1 menit'
        },
        {
            title: 'Install Game Y',
            category: 'APP',
            reward: '10 TON',
            time: '5 menit'
        },
        {
            title: 'Nonton Video Z',
            category: 'VIDEO',
            reward: '3 TON',
            time: '3 menit'
        }
    ];
    
    // Generate poster dashboard tasks
    posterTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        taskCard.innerHTML = `
            <div class="task-header">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-category">${task.category}</div>
                </div>
            </div>
            <div class="task-progress">
                <div class="progress-info">
                    <span>Progress: ${task.progress}/${task.total}</span>
                    <span>${task.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${task.progress}%;"></div>
                </div>
            </div>
            <div class="task-timer">
                <span class="material-icons" style="font-size: 16px; margin-right: 4px;">timer</span>
                <span>${task.timeLeft}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-small btn-outline edit-task-btn" data-title="${task.title}">
                    <span class="material-icons" style="font-size: 16px; margin-right: 4px;">edit</span>
                    Edit
                </button>
                <button class="btn btn-small btn-danger delete-task-btn">
                    <span class="material-icons" style="font-size: 16px; margin-right: 4px;">delete</span>
                    Hapus
                </button>
            </div>
        `;
        
        taskList.appendChild(taskCard);
    });
    
    // Generate user dashboard tasks
    userTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.setAttribute('data-category', task.category.toLowerCase());
        
        taskCard.innerHTML = `
            <div class="task-header">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-category">${task.category}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 16px; font-weight: 500; color: var(--primary);">${task.reward}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">${task.time}</div>
                </div>
            </div>
            <button class="btn btn-primary claim-task-btn" style="width: 100%; margin-top: 12px;" data-title="${task.title}" data-category="${task.category}" data-reward="${task.reward}">
                Claim
            </button>
        `;
        
        availableTasks.appendChild(taskCard);
    });
    
    // Add event listeners to task buttons
    document.querySelectorAll('.edit-task-btn').forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            document.getElementById('editTaskTitle').value = title;
            document.getElementById('titleCharCount').textContent = title.length;
            document.getElementById('editTaskPopup').classList.add('active');
        });
    });
    
    document.querySelectorAll('.delete-task-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
                this.closest('.task-card').remove();
                showMessage('Tugas berhasil dihapus', 'success');
            }
        });
    });
    
    document.querySelectorAll('.claim-task-btn').forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const category = this.getAttribute('data-category');
            const reward = this.getAttribute('data-reward');
            
            // Update popup content
            document.getElementById('popupTaskTitle').textContent = title;
            document.getElementById('popupTaskCategory').textContent = category;
            document.getElementById('popupTaskReward').textContent = reward;
            
            // Show popup
            document.getElementById('taskPopup').classList.add('active');
            
            // Start timer
            startTaskTimer();
        });
    });
}

// Initialize user dashboard
function initializeUserDashboard() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const taskCards = document.querySelectorAll('#availableTasks .task-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter tasks
            const filter = this.getAttribute('data-filter');
            
            taskCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize profile
function initializeProfile() {
    // Generate earnings chart
    const chartContainer = document.getElementById('earningsChart');
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const values = [2.5, 3.2, 2.8, 4.5, 3.7, 5.2, 2.5];
    const maxValue = Math.max(...values);
    
    days.forEach((day, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${(values[index] / maxValue) * 100}%`;
        
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = day;
        
        bar.appendChild(label);
        chartContainer.appendChild(bar);
    });
    
    // Copy referral code
    document.querySelector('.referral-card .btn').addEventListener('click', function() {
        const code = document.querySelector('.referral-code-text').textContent;
        copyToClipboard(code);
        showMessage('Kode referral disalin ke clipboard', 'success');
    });
}

// Initialize settings
function initializeSettings() {
    // Language dropdown
    const languageDropdown = document.getElementById('languageDropdown');
    const selectedLanguage = document.getElementById('selectedLanguage');
    const languageItems = document.querySelectorAll('.dropdown-item');
    
    languageDropdown.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const text = this.textContent;
            
            // Update selected language
            languageItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            selectedLanguage.textContent = text;
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            
            // Apply language (in a real app, this would translate the UI)
            if (lang === 'ar') {
                document.body.classList.add('rtl');
            } else {
                document.body.classList.remove('rtl');
            }
            
            showMessage(`Bahasa diubah ke ${text}`, 'success');
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        showMessage(isDarkMode ? 'Dark mode diaktifkan' : 'Dark mode dinonaktifkan', 'success');
    });
    
    // Other toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch:not(#darkModeToggle)');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const label = this.previousElementSibling.textContent;
            const isActive = this.classList.contains('active');
            
            showMessage(`${label} ${isActive ? 'diaktifkan' : 'dinonaktifkan'}`, 'success');
        });
    });
    
    // Settings items with chevron
    const settingsItems = document.querySelectorAll('.settings-item .material-icons.chevron_right');
    settingsItems.forEach(icon => {
        icon.parentElement.addEventListener('click', function() {
            const label = this.querySelector('.settings-label').textContent;
            showMessage(`Fitur ${label} akan segera hadir`, 'info');
        });
    });
    
    // Logout button
    document.querySelector('.btn-danger').addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            // In a real app, this would clear the session
            document.getElementById('profileView').classList.remove('active');
            document.getElementById('loginView').classList.add('active');
            document.getElementById('bottomNav').style.display = 'none';
            showMessage('Anda telah logout', 'success');
        }
    });
}

// Initialize countdown
function initializeCountdown() {
    // Set target time to next midnight UTC
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);
    
    const targetTime = tomorrow.getTime();
    
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const difference = targetTime - currentTime;
        
        if (difference > 0) {
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Reset countdown for next day
            initializeCountdown();
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// Initialize bottom navigation
function initializeBottomNavigation() {
    // Already handled in initializeViews()
}

// Check dark mode preference
function checkDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').classList.add('active');
    }
}

// Task timer
function startTaskTimer() {
    let timeLeft = 30 * 60; // 30 minutes in seconds
    
    const timerElement = document.getElementById('popupTaskTimer');
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showMessage('Waktu habis! Tugas dibatalkan.', 'error');
            document.getElementById('taskPopup').classList.remove('active');
        }
    }, 1000);
    
    // Store interval ID to clear it when popup is closed
    document.getElementById('taskPopup').dataset.timerId = timerInterval;
}

// Clear task timer when popup is closed
document.getElementById('closeTaskPopup').addEventListener('click', function() {
    const timerId = document.getElementById('taskPopup').dataset.timerId;
    if (timerId) {
        clearInterval(timerId);
    }
});

document.getElementById('cancelTaskBtn').addEventListener('click', function() {
    const timerId = document.getElementById('taskPopup').dataset.timerId;
    if (timerId) {
        clearInterval(timerId);
    }
});

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.left = '50%';
    messageEl.style.transform = 'translateX(-50%)';
    messageEl.style.padding = '12px 24px';
    messageEl.style.borderRadius = '8px';
    messageEl.style.color = 'white';
    messageEl.style.fontWeight = '500';
    messageEl.style.zIndex = '9999';
    messageEl.style.opacity = '0';
    messageEl.style.transition = 'opacity 0.3s';
    
    // Set background color based on type
    switch (type) {
        case 'success':
            messageEl.style.backgroundColor = 'var(--success)';
            break;
        case 'error':
            messageEl.style.backgroundColor = 'var(--error)';
            break;
        case 'info':
            messageEl.style.backgroundColor = 'var(--primary)';
            break;
        default:
            messageEl.style.backgroundColor = 'var(--text-secondary)';
    }
    
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    
    // Show message
    setTimeout(() => {
        messageEl.style.opacity = '1';
    }, 10);
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}
}
