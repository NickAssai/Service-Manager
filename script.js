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
        });
    });

    // ====================
    // 2. Wiki.js темы (переключение светлой/темной)
    // ====================
    const wikiDemo = document.querySelector('#case4 .wiki-demo');
    if (wikiDemo) {
        const themeButtons = document.querySelectorAll('#case4 .theme-btn');
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок
                themeButtons.forEach(b => b.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                // Получаем тему из data-атрибута
                const theme = this.getAttribute('data-theme');
                
                // Устанавливаем тему для всего демо-блока
                wikiDemo.setAttribute('data-theme', theme);
                
                // Сохраняем выбор в localStorage
                localStorage.setItem('wikiTheme', theme);
            });
        });
        
        // Восстанавливаем сохраненную тему
        const savedTheme = localStorage.getItem('wikiTheme') || 'light';
        wikiDemo.setAttribute('data-theme', savedTheme);
        
        // Активируем соответствующую кнопку
        const activeThemeBtn = document.querySelector(`#case4 .theme-btn[data-theme="${savedTheme}"]`);
        if (activeThemeBtn) {
            activeThemeBtn.classList.add('active');
        }
    }

    // ====================
    // 3. Табы для демо-кода в Wiki.js
    // ====================
    const codeTabs = document.querySelectorAll('#case4 .code-tab');
    const codeContents = document.querySelectorAll('#case4 .code-content');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-code');
            
            // Убираем активный класс у всех кнопок и контента
            codeTabs.forEach(t => t.classList.remove('active'));
            codeContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Показываем соответствующий контент
            document.getElementById(tabId + 'Code').classList.add('active');
        });
    });

    // ====================
    // 4. Интерактивный чек-лист (из кейса 3)
    // ====================
    const checkAllBtn = document.getElementById('checkAll');
    if (checkAllBtn) {
        checkAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            
            // Переключаем состояние всех чекбоксов
            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
            });
            
            // Меняем текст кнопки
            this.textContent = allChecked ? 'Отметить все' : 'Снять все отметки';
        });
    }
    
    // ====================
    // 5. Мобильное меню
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
    // 6. Плавная прокрутка для якорных ссылок
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
    // 7. Анимация при прокрутке
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
    // 8. Автоматическое закрытие мобильного меню при ресайзе
    // ====================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('show');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // ====================
    // 9. Анимация навигации при скролле
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
    // 10. Инициализация по умолчанию
    // ====================
    // Активируем первый таб кода в Wiki.js демо
    const firstCodeTab = document.querySelector('#case4 .code-tab');
    if (firstCodeTab && !firstCodeTab.classList.contains('active')) {
        firstCodeTab.classList.add('active');
        const firstTabId = firstCodeTab.getAttribute('data-code');
        const firstCodeContent = document.getElementById(firstTabId + 'Code');
        if (firstCodeContent) {
            firstCodeContent.classList.add('active');
        }
    }
    
    // Инициализируем Intersection Observer для Wiki.js карточек
    const wikiCards = document.querySelectorAll('#case4 .wiki-card');
    if (wikiCards.length > 0) {
        const wikiObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Анимация уже задана через CSS animation, просто показываем
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    wikiObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        wikiCards.forEach(card => {
            wikiObserver.observe(card);
        });
    }
});
