// Табы для кейсов
document.addEventListener('DOMContentLoaded', function() {
    // Работа табов
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

    // Wiki.js темы
const wikiDemo = document.querySelector('#case4 .wiki-demo .demo-card');
if (wikiDemo) {
    document.querySelectorAll('#case4 .theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#case4 .theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const theme = this.getAttribute('data-theme');
            const demoCard = document.querySelector('#case4 .demo-card');
            
            if (theme === 'dark') {
                demoCard.style.background = 'rgba(40, 40, 40, 0.8)';
                demoCard.style.color = '#ffffff';
                demoCard.querySelectorAll('h6, li, .demo-subtitle').forEach(el => {
                    el.style.color = 'rgba(255, 255, 255, 0.8)';
                });
            } else {
                demoCard.style.background = 'rgba(255, 255, 255, 0.9)';
                demoCard.style.color = '#334155';
                demoCard.querySelectorAll('h6, li, .demo-subtitle').forEach(el => {
                    el.style.color = '#555555';
                });
            }
        });
    });
}

// Табы для демо-кода
document.querySelectorAll('#case4 .code-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-code');
        
        document.querySelectorAll('#case4 .code-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#case4 .code-content').forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(tabId + 'Code').classList.add('active');
    });
});

    // Интерактивный чек-лист
    const checkAllBtn = document.getElementById('checkAll');
    if (checkAllBtn) {
        checkAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            
            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
            });
            
            this.textContent = allChecked ? 'Отметить все' : 'Снять все отметки';
        });
    }
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
            });
        });
    }
    
    // Плавная прокрутка для якорных ссылок
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
    
    // Анимация при прокрутке
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
});
