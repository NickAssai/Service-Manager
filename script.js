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
    // 2. Мобильное меню
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
    // 3. Плавная прокрутка для якорных ссылок
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
    // 4. Анимация при прокрутке
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
    // 5. Автоматическое закрытие мобильного меню при ресайзе
    // ====================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('show');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // ====================
    // 6. Анимация навигации при скролле
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
    // 7. Уведомления
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
    // 8. Масштабирование изображений
    // ====================
    
    // Масштабирование изображения при клике (для кейса 3)
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
    
    // ====================
    // 9. Модальное окно для галереи Wiki.js
    // ====================
    function initGalleryModal() {
        const exampleItems = document.querySelectorAll('#case4 .example-item');
        
        if (!exampleItems.length) return;
        
        // Создаем модальное окно, если его нет
        if (!document.getElementById('exampleModal')) {
            const modalHTML = `
                <div id="exampleModal" class="example-modal">
                    <span class="modal-close">&times;</span>
                    <div class="modal-image-container">
                        <img class="modal-image" src="" alt="">
                        <div class="modal-caption">
                            <h3></h3>
                            <p></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        const modal = document.getElementById('exampleModal');
        const modalImage = modal.querySelector('.modal-image');
        const modalCaptionTitle = modal.querySelector('.modal-caption h3');
        const modalCaptionDesc = modal.querySelector('.modal-caption p');
        const modalClose = modal.querySelector('.modal-close');
        
        // Открытие модального окна при клике на изображение
        exampleItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const img = this.querySelector('.example-image');
                const title = this.querySelector('.example-caption h5').textContent;
                const description = this.querySelector('.example-caption p').textContent;
                
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalCaptionTitle.textContent = title;
                modalCaptionDesc.textContent = description;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            });
        });
        
        // Закрытие модального окна
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        
        modalClose.addEventListener('click', closeModal);
        
        // Закрытие по клику на оверлей
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Закрытие по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // Инициализируем галерею
    initGalleryModal();
    
    // ====================
    // 10. Предзагрузка изображений галереи
    // ====================
    function preloadGalleryImages() {
        const images = document.querySelectorAll('#case4 .example-image');
        images.forEach(img => {
            const tempImg = new Image();
            tempImg.src = img.src;
        });
    }
    
    // Предзагружаем изображения при наведении на таб
    const wikiTabBtn = document.querySelector('[data-tab="case4"]');
    if (wikiTabBtn) {
        wikiTabBtn.addEventListener('mouseenter', preloadGalleryImages);
    }
});

// Управление предпросмотром документации
document.addEventListener('DOMContentLoaded', function() {
    // Функция для обработки загрузки iframe (если остались)
    const frames = document.querySelectorAll('iframe');
    frames.forEach(frame => {
        frame.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        frame.addEventListener('error', function() {
            console.error('Не удалось загрузить фрейм:', this.src);
        });
    });
});
