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
        document.querySelectorAll('#case4 .theme-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок
                document.querySelectorAll('#case4 .theme-btn').forEach(b => b.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                // Получаем тему из data-атрибута
                const theme = this.getAttribute('data-theme');
                
                // Устанавливаем тему для всего демо-блока
                wikiDemo.setAttribute('data-theme', theme);
            });
        });
    }

    // ====================
    // 3. Табы для демо-кода в Wiki.js
    // ====================
    document.querySelectorAll('#case4 .code-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-code');
            
            // Убираем активный класс у всех кнопок и контента
            document.querySelectorAll('#case4 .code-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('#case4 .code-content').forEach(c => c.classList.remove('active'));
            
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
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
    
    // ====================
    // 6. Плавная прокрутка для якорных ссылок
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
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
    document.querySelectorAll('.approach-card, .case-content, .table-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
    
    // ====================
    // 8. Дополнительная анимация для карточек Wiki.js
    // ====================
    const wikiCards = document.querySelectorAll('#case4 .wiki-card');
    if (wikiCards.length > 0) {
        const wikiObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Задержка для каждой карточки
                }
            });
        }, observerOptions);
        
        wikiCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            wikiObserver.observe(card);
        });
    }
    
    // ====================
    // 9. Автоматическое закрытие мобильного меню при ресайзе
    // ====================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style.display = 'flex';
        } else if (window.innerWidth <= 768 && navLinks) {
            navLinks.style.display = 'none';
        }
    });
    
    // ====================
    // 10. Инициализация по умолчанию
    // ====================
    // Если есть таб Wiki.js, убедимся что он инициализирован правильно
    if (document.querySelector('#case4')) {
        // Инициализируем табы кода, если они есть
        const firstCodeTab = document.querySelector('#case4 .code-tab');
        if (firstCodeTab && !firstCodeTab.classList.contains('active')) {
            firstCodeTab.classList.add('active');
            const firstTabId = firstCodeTab.getAttribute('data-code');
            document.getElementById(firstTabId + 'Code')?.classList.add('active');
        }
    }
});
