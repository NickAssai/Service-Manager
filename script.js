// Все скрипты для портфолио
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // 1. Работа табов кейсов
    // ====================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            btn.classList.add('active');
            
            // Показываем соответствующий контент
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Показываем уведомление о переключении
            showNotification(`Открыт раздел: "${btn.textContent.trim()}"`, 'info');
        });
    });

    // ====================
    // 2. Wiki.js темы (переключение светлой/темной) - УДАЛЕНО, т.к. не нужно
    // ====================

    // ====================
    // 3. Табы для демо-кода в Wiki.js - УДАЛЕНО, т.к. не нужно
    // ====================

    // ====================
    // 4. Чек-листы TealPOS - УДАЛЕНО полностью
    // ====================

    // ====================
    // 5. Интерактивный чек-лист (из кейса 3) - УДАЛЕНО, т.к. заменен на изображение
    // ====================
    
    // ====================
    // 6. Мобильное меню
    // ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuToggle.innerHTML = navLinks.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('show');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // ====================
    // 7. Плавная прокрутка для якорных ссылок
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====================
    // 8. Анимация при прокрутке
    // ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.approach-card, .case-content, .table-row, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // ====================
    // 9. Автоматическое закрытие мобильного меню при ресайзе
    // ====================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('show');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // ====================
    // 10. Анимация навигации при скролле
    // ====================
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Прячем/показываем навигацию при скролле
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Скролл вниз
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Подсветка активного раздела в навигации
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Убираем активный класс у всех ссылок
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ====================
    // 11. Уведомления
    // ====================
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Иконка в зависимости от типа
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        if (type === 'error') icon = 'times-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : 
                        type === 'warning' ? '#f59e0b' : 
                        type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Убираем через 4 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // ====================
    // 12. Функции для работы с изображением (новые)
    // ====================
    
    // Масштабирование изображения при клике
    const scrollableImages = document.querySelectorAll('.scrollable-image');
    scrollableImages.forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
            if (this.classList.contains('zoomed')) {
                showNotification('Изображение увеличено. Кликните, чтобы уменьшить.', 'info');
            }
        });
    });
    
    // Закрытие увеличенного изображения по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            scrollableImages.forEach(img => {
                img.classList.remove('zoomed');
            });
        }
    });
});
