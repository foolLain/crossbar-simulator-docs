// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initChipAnimation();
    initDownloadButtons();
    initMobileMenu();
    initLanguageSwitch();
});

// 导航栏功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景模糊效果
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // 隐藏/显示导航栏（可选）
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 导航链接激活状态
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .download-card, .spec-item');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // 添加动画类
    document.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });
}

// 平滑滚动
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 芯片引脚动画
function initChipAnimation() {
    const pins = document.querySelectorAll('.pin');
    let currentPinIndex = 0;
    let isAnimating = false;
    
    // 引脚激活序列 - 从外到内的模式
    const pinSequence = [
        // 上排引脚（从左到右）
        0, 1, 2, 3, 4, 5, 6, 7,
        // 右排引脚（从上到下）
        24, 25, 26, 27, 28, 29, 30, 31,
        // 下排引脚（从右到左）
        15, 14, 13, 12, 11, 10, 9, 8,
        // 左排引脚（从下到上）
        23, 22, 21, 20, 19, 18, 17, 16
    ];
    
    function activateNextPin() {
        if (isAnimating) return;
        isAnimating = true;
        
        // 移除所有激活状态
        pins.forEach(pin => pin.classList.remove('active'));
        
        // 激活当前引脚
        const currentPin = document.querySelector(`[data-index="${pinSequence[currentPinIndex]}"]`);
        if (currentPin) {
            currentPin.classList.add('active');
            currentPin.style.animation = 'pinActivate 0.6s ease-out';
        }
        
        // 更新索引
        currentPinIndex = (currentPinIndex + 1) % pinSequence.length;
        
        // 延迟后继续下一个
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // 开始动画循环
    setInterval(activateNextPin, 800);
    
    // 鼠标悬停效果
    pins.forEach(pin => {
        pin.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.1)';
                this.style.background = '#a0aec0';
            }
        });
        
        pin.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
                this.style.background = '#718096';
            }
        });
    });
}

// Windows下载处理函数
window.handleWindowsDownload = function() {
    // 显示下载提示
    showNotification('正在准备下载 Windows 版本...', 'info');
    
    // 使用实际的下载链接
    const downloadUrl = 'https://github.com/foolLain/crossbar-simulator-docs/releases/download/win/memristor-simulator-0.0.1-setup.exe';
    
    // 延迟一下让用户看到提示，然后开始下载
    setTimeout(() => {
        showNotification('Windows 版本下载已开始', 'success');
        
        // 直接打开下载链接
        window.open(downloadUrl, '_blank');
    }, 1000);
};

// 下载按钮功能
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 显示下载提示
            const platform = this.closest('.download-card').querySelector('h3').textContent;
            showNotification(`正在准备下载 ${platform} 版本...`, 'info');
            
            // 获取下载链接
            const downloadUrl = this.getAttribute('href');
            
            // 检查链接是否有效
            if (downloadUrl && downloadUrl !== '#') {
                // 延迟一下让用户看到提示，然后开始下载
                setTimeout(() => {
                    showNotification(`${platform} 版本下载已开始`, 'success');
                    // 创建一个隐藏的链接来触发下载
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = '';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 1000);
            } else {
                // 如果没有有效的下载链接，显示错误提示
                setTimeout(() => {
                    showNotification(`${platform} 版本暂不可用，请稍后再试`, 'error');
                }, 1000);
            }
        });
    });
}

// 语言切换功能
function initLanguageSwitch() {
    // 语言数据
    const languages = {
        zh: {
            // 页面元数据
            'page-title': 'Crossbar Simulator - 忆阻器阵列仿真软件',
            'page-description': '专业的忆阻器阵列仿真软件，支持时域和频域分析，提供3D可视化功能',
            
            // 导航
            'nav-brand': 'Crossbar Simulator',
            'nav-features': '功能特性',
            'nav-download': '下载',
            'nav-about': '关于',
            'nav-language': 'English',
            
            // 英雄区域
            'hero-title': '专业的<br>忆阻器阵列仿真软件',
            'hero-subtitle': '基于先进的物理模型，提供精确的时域和频域分析，支持3D可视化，为忆阻器研究提供强大工具',
            'hero-download': '立即下载',
            'hero-learn-more': '了解更多',
            
            // 功能特性
            'features-title': '核心功能',
            'features-subtitle': '强大的仿真能力，满足您的所有需求',
            'feature-time-domain': '时域仿真',
            'feature-time-desc': '精确的时域分析，支持脉冲响应、瞬态分析等，帮助您深入理解忆阻器的动态特性。',
            'feature-freq-domain': '频域分析',
            'feature-freq-desc': '全面的频域特性分析，包括S参数计算、频率响应等，为电路设计提供重要参考。',
            'feature-3d': '3D可视化',
            'feature-3d-desc': '直观的3D图形界面，实时显示仿真结果，支持多角度观察和数据交互。',
            'feature-params': '参数配置',
            'feature-params-desc': '灵活的参数设置界面，支持自定义忆阻器模型参数，满足不同研究需求。',
            'feature-export': '数据导出',
            'feature-export-desc': '支持多种格式的数据导出，便于后续分析和报告生成。',
            'feature-performance': '高性能',
            'feature-performance-desc': '优化的算法实现，确保仿真计算的高效性和准确性。',
            
            // 技术规格
            'specs-title': '技术规格',
            'specs-subtitle': '基于先进技术的专业仿真平台',
            'spec-array': '阵列规模',
            'spec-visualization': '可视化',
            'spec-speed': '仿真速度',
            'spec-export': '数据导出',
            'spec-array-number': '64×64',
            'spec-visualization-number': '3D',
            'spec-speed-number': '实时',
            'spec-export-number': '多格式',
            
            // 下载
            'download-title': '下载软件',
            'download-subtitle': '选择适合您系统的版本',
            'download-windows': '下载 Windows 版本',
            'download-coming-soon': '即将推出',
            'download-note': '系统要求：4GB RAM，2GB 可用磁盘空间',
            'download-windows-desc': '支持 Windows 10/11',
            'download-macos-desc': '支持 macOS 10.15+',
            'download-linux-desc': '支持 Ubuntu 18.04+',
            
            // 关于
            'about-title': '关于 Crossbar Simulator',
            'about-desc1': 'Crossbar Simulator 是由浙江大学开发的专业忆阻器阵列仿真软件。我们致力于为研究人员和工程师提供最先进的仿真工具，帮助他们更好地理解和设计忆阻器电路。',
            'about-desc2': '软件基于最新的物理模型和算法，提供精确的仿真结果和直观的可视化界面，是忆阻器研究的理想选择。',
            
            // 页脚
            'footer-desc': '专业的忆阻器阵列仿真软件',
            'footer-product': '产品',
            'footer-support': '支持',
            'footer-legal': '法律',
            'footer-features-link': '功能特性',
            'footer-download-link': '下载',
            'footer-help': '帮助中心',
            'footer-contact': '联系我们',
            'footer-feedback': '反馈建议',
            'footer-privacy': '隐私政策',
            'footer-terms': '使用条款',
            'footer-license': '许可证',
            'footer-copyright': '© 2024 Crossbar Simulator. 由浙江大学开发维护。'
        },
        en: {
            // 页面元数据
            'page-title': 'Crossbar Simulator - Professional Memristor Array Simulation Software',
            'page-description': 'Professional memristor array simulation software with time-domain and frequency-domain analysis, featuring 3D visualization',
            
            // 导航
            'nav-brand': 'Crossbar Simulator',
            'nav-features': 'Features',
            'nav-download': 'Download',
            'nav-about': 'About',
            'nav-language': '中文',
            
            // 英雄区域
            'hero-title': 'Professional<br>Memristor Array Simulation Software',
            'hero-subtitle': 'Based on advanced physical models, providing precise time-domain and frequency-domain analysis with 3D visualization for powerful memristor research tools.',
            'hero-download': 'Download Now',
            'hero-learn-more': 'Learn More',
            
            // 功能特性
            'features-title': 'Core Features',
            'features-subtitle': 'Powerful simulation capabilities to meet all your needs',
            'feature-time-domain': 'Time Domain Simulation',
            'feature-time-desc': 'Precise time-domain analysis supporting pulse response, transient analysis, etc., helping you deeply understand the dynamic characteristics of memristors.',
            'feature-freq-domain': 'Frequency Domain Analysis',
            'feature-freq-desc': 'Comprehensive frequency domain analysis including S-parameter calculation, frequency response, etc., providing important references for circuit design.',
            'feature-3d': '3D Visualization',
            'feature-3d-desc': 'Intuitive 3D graphical interface with real-time simulation results display, supporting multi-angle observation and data interaction.',
            'feature-params': 'Parameter Configuration',
            'feature-params-desc': 'Flexible parameter setting interface supporting custom memristor model parameters to meet different research needs.',
            'feature-export': 'Data Export',
            'feature-export-desc': 'Support for multiple format data export for subsequent analysis and report generation.',
            'feature-performance': 'High Performance',
            'feature-performance-desc': 'Optimized algorithm implementation ensuring efficient and accurate simulation calculations.',
            
            // 技术规格
            'specs-title': 'Technical Specifications',
            'specs-subtitle': 'Professional simulation platform based on advanced technology',
            'spec-array': 'Array Scale',
            'spec-visualization': 'Visualization',
            'spec-speed': 'Simulation Speed',
            'spec-export': 'Data Export',
            'spec-array-number': '64×64',
            'spec-visualization-number': '3D',
            'spec-speed-number': 'Real-time',
            'spec-export-number': 'Multi-format',
            
            // 下载
            'download-title': 'Download Software',
            'download-subtitle': 'Choose the version suitable for your system',
            'download-windows': 'Download Windows Version',
            'download-coming-soon': 'Coming Soon',
            'download-note': 'System Requirements: 4GB RAM, 2GB available disk space',
            'download-windows-desc': 'Supports Windows 10/11',
            'download-macos-desc': 'Supports macOS 10.15+',
            'download-linux-desc': 'Supports Ubuntu 18.04+',
            
            // 关于
            'about-title': 'About Crossbar Simulator',
            'about-desc1': 'Crossbar Simulator is a professional memristor array simulation software developed by Zhejiang University. We are committed to providing researchers and engineers with the most advanced simulation tools to help them better understand and design memristor circuits.',
            'about-desc2': 'The software is based on the latest physical models and algorithms, providing accurate simulation results and intuitive visualization interface, making it an ideal choice for memristor research.',
            
            // 页脚
            'footer-desc': 'Professional Memristor Array Simulation Software',
            'footer-product': 'Product',
            'footer-support': 'Support',
            'footer-legal': 'Legal',
            'footer-features-link': 'Features',
            'footer-download-link': 'Download',
            'footer-help': 'Help Center',
            'footer-contact': 'Contact Us',
            'footer-feedback': 'Feedback',
            'footer-privacy': 'Privacy Policy',
            'footer-terms': 'Terms of Use',
            'footer-license': 'License',
            'footer-copyright': '© 2024 Crossbar Simulator. Developed and maintained by Zhejiang University.'
        }
    };
    
    let currentLanguage = 'zh';
    
    // 切换语言函数
    window.switchLanguage = function() {
        currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        const langData = languages[currentLanguage];
        
        // 更新页面元数据
        document.title = langData['page-title'];
        document.querySelector('meta[name="description"]').setAttribute('content', langData['page-description']);
        
        // 更新导航
        document.querySelector('.nav-brand span').textContent = langData['nav-brand'];
        document.querySelector('a[href="#features"]').textContent = langData['nav-features'];
        document.querySelector('a[href="#download"]').textContent = langData['nav-download'];
        document.querySelector('a[href="#about"]').textContent = langData['nav-about'];
        document.querySelector('.btn-language').innerHTML = `<i class="fas fa-globe"></i>${langData['nav-language']}`;
        
        // 更新英雄区域
        document.querySelector('.hero-title').innerHTML = langData['hero-title'];
        document.querySelector('.hero-subtitle').textContent = langData['hero-subtitle'];
        document.querySelector('.hero-buttons .btn-primary').innerHTML = `<i class="fas fa-download"></i>${langData['hero-download']}`;
        document.querySelector('.hero-buttons .btn-secondary').innerHTML = `<i class="fas fa-play"></i>${langData['hero-learn-more']}`;
        
        // 更新功能特性
        document.querySelector('#features .section-header h2').textContent = langData['features-title'];
        document.querySelector('#features .section-header p').textContent = langData['features-subtitle'];
        
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards[0].querySelector('h3').textContent = langData['feature-time-domain'];
        featureCards[0].querySelector('p').textContent = langData['feature-time-desc'];
        featureCards[1].querySelector('h3').textContent = langData['feature-freq-domain'];
        featureCards[1].querySelector('p').textContent = langData['feature-freq-desc'];
        featureCards[2].querySelector('h3').textContent = langData['feature-3d'];
        featureCards[2].querySelector('p').textContent = langData['feature-3d-desc'];
        featureCards[3].querySelector('h3').textContent = langData['feature-params'];
        featureCards[3].querySelector('p').textContent = langData['feature-params-desc'];
        featureCards[4].querySelector('h3').textContent = langData['feature-export'];
        featureCards[4].querySelector('p').textContent = langData['feature-export-desc'];
        featureCards[5].querySelector('h3').textContent = langData['feature-performance'];
        featureCards[5].querySelector('p').textContent = langData['feature-performance-desc'];
        
        // 更新技术规格
        document.querySelector('.specs .section-header h2').textContent = langData['specs-title'];
        document.querySelector('.specs .section-header p').textContent = langData['specs-subtitle'];
        
        const specItems = document.querySelectorAll('.spec-item');
        specItems[0].querySelector('.spec-number').textContent = langData['spec-array-number'];
        specItems[0].querySelector('.spec-label').textContent = langData['spec-array'];
        specItems[1].querySelector('.spec-number').textContent = langData['spec-visualization-number'];
        specItems[1].querySelector('.spec-label').textContent = langData['spec-visualization'];
        specItems[2].querySelector('.spec-number').textContent = langData['spec-speed-number'];
        specItems[2].querySelector('.spec-label').textContent = langData['spec-speed'];
        specItems[3].querySelector('.spec-number').textContent = langData['spec-export-number'];
        specItems[3].querySelector('.spec-label').textContent = langData['spec-export'];
        
        // 更新下载
        document.querySelector('#download .section-header h2').textContent = langData['download-title'];
        document.querySelector('#download .section-header p').textContent = langData['download-subtitle'];
        document.querySelector('.btn-download').innerHTML = `<i class="fas fa-download"></i>${langData['download-windows']}`;
        
        // 更新下载卡片描述
        const downloadCards = document.querySelectorAll('.download-card');
        downloadCards[0].querySelector('p').textContent = langData['download-windows-desc'];
        downloadCards[1].querySelector('p').textContent = langData['download-macos-desc'];
        downloadCards[2].querySelector('p').textContent = langData['download-linux-desc'];
        
        const comingSoonButtons = document.querySelectorAll('.btn-coming-soon');
        comingSoonButtons.forEach(btn => {
            btn.innerHTML = `<i class="fas fa-clock"></i>${langData['download-coming-soon']}`;
        });
        
        document.querySelector('.download-note p').innerHTML = `<i class="fas fa-info-circle"></i> ${langData['download-note']}`;
        
        // 更新关于
        document.querySelector('#about h2').textContent = langData['about-title'];
        const aboutParagraphs = document.querySelectorAll('#about p');
        aboutParagraphs[0].textContent = langData['about-desc1'];
        aboutParagraphs[1].textContent = langData['about-desc2'];
        
        // 更新页脚
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections[0].querySelector('p').textContent = langData['footer-desc'];
        footerSections[1].querySelector('h4').textContent = langData['footer-product'];
        footerSections[2].querySelector('h4').textContent = langData['footer-support'];
        footerSections[3].querySelector('h4').textContent = langData['footer-legal'];
        
        // 更新页脚链接
        const footerLinks = document.querySelectorAll('.footer-section ul li a');
        footerLinks[0].textContent = langData['footer-features-link'];
        footerLinks[1].textContent = langData['footer-download-link'];
        footerLinks[2].textContent = langData['footer-help'];
        footerLinks[3].textContent = langData['footer-contact'];
        footerLinks[4].textContent = langData['footer-feedback'];
        footerLinks[5].textContent = langData['footer-privacy'];
        footerLinks[6].textContent = langData['footer-terms'];
        footerLinks[7].textContent = langData['footer-license'];
        
        document.querySelector('.footer-bottom p').textContent = langData['footer-copyright'];
        
        // 更新页面语言属性
        document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
        
        // 显示切换提示
        showNotification(`Language switched to ${currentLanguage === 'zh' ? 'Chinese' : 'English'}`, 'success');
    };
}

// 移动端菜单
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // 点击菜单项后关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // 点击外部区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// 通知系统
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮功能
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // 自动关闭
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
    // 滚动相关的性能敏感操作
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-top: 1px solid #e5e7eb;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 移除加载状态
    document.body.classList.add('loaded');
    
    // 初始化统计数字动画
    initCounterAnimation();
});

// 数字计数动画
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // 当元素进入视口时开始动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
} 