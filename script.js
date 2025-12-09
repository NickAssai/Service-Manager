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
                
                showNotification(`Тема Wiki.js изменена на: ${theme === 'light' ? 'Светлая' : 'Темная'}`, 'success');
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
    // 4. Чек-листы TealPOS
    // ====================
    const checklistDemo = document.querySelector('#case5 .checklist-demo');
    if (checklistDemo) {
        // Переключение темы
        const checklistThemeButtons = document.querySelectorAll('#case5 .theme-btn');
        checklistThemeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                checklistThemeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const theme = this.getAttribute('data-theme');
                checklistDemo.setAttribute('data-theme', theme);
                localStorage.setItem('checklistTheme', theme);
                showNotification(`Тема чек-листа изменена на: ${theme === 'light' ? 'Светлая' : 'Темная'}`, 'success');
            });
        });
        
        // Восстановление темы
        const savedChecklistTheme = localStorage.getItem('checklistTheme') || 'dark';
        checklistDemo.setAttribute('data-theme', savedChecklistTheme);
        const activeChecklistThemeBtn = document.querySelector(`#case5 .theme-btn[data-theme="${savedChecklistTheme}"]`);
        if (activeChecklistThemeBtn) {
            activeChecklistThemeBtn.classList.add('active');
        }
        
        // Раскрытие/скрытие секций
        document.querySelectorAll('#case5 .section-header').forEach(header => {
            header.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (this.classList.contains('active')) {
                    showNotification('Секция развернута', 'info');
                }
            });
        });
        
        // Кнопки ДА/НЕТ
        document.querySelectorAll('#case5 .item-controls button').forEach(button => {
            button.addEventListener('click', function() {
                const itemControls = this.parentElement;
                const yesBtn = itemControls.querySelector('.yes');
                const noBtn = itemControls.querySelector('.no');
                const isYes = this.classList.contains('yes');
                
                // Сбрасываем активный класс
                yesBtn.classList.remove('active');
                noBtn.classList.remove('active');
                
                // Устанавливаем активный класс
                this.classList.add('active');
                
                // Показываем уведомление
                const status = isYes ? 'ДА' : 'НЕТ';
                showNotification(`Пункт отмечен как: ${status}`, isYes ? 'success' : 'warning');
                
                // Сохраняем в localStorage
                const checklistItem = this.closest('.checklist-item');
                const itemText = checklistItem.querySelector('.item-text').textContent;
                const state = {
                    status: status,
                    comment: checklistItem.querySelector('textarea').value,
                    timestamp: new Date().toISOString()
                };
                
                // Сохраняем состояние
                saveChecklistState(itemText, state);
                
                // Обновляем прогресс
                updateChecklistProgress();
            });
        });
        
        // Сохранение комментариев
        document.querySelectorAll('#case5 textarea').forEach(textarea => {
            textarea.addEventListener('input', function() {
                const checklistItem = this.closest('.checklist-item');
                const itemText = checklistItem.querySelector('.item-text').textContent;
                const yesBtn = checklistItem.querySelector('.yes');
                const noBtn = checklistItem.querySelector('.no');
                
                const state = {
                    status: yesBtn.classList.contains('active') ? 'ДА' : 
                            noBtn.classList.contains('active') ? 'НЕТ' : null,
                    comment: this.value,
                    timestamp: new Date().toISOString()
                };
                
                saveChecklistState(itemText, state);
                
                // Показываем индикатор сохранения
                const saveIndicator = document.createElement('span');
                saveIndicator.textContent = ' ✓';
                saveIndicator.style.color = '#10b981';
                saveIndicator.style.fontWeight = 'bold';
                saveIndicator.style.opacity = '0';
                
                this.parentElement.appendChild(saveIndicator);
                
                // Анимация появления и исчезновения
                saveIndicator.style.transition = 'opacity 0.3s';
                saveIndicator.style.opacity = '1';
                
                setTimeout(() => {
                    saveIndicator.style.opacity = '0';
                    setTimeout(() => saveIndicator.remove(), 300);
                }, 1000);
            });
        });
        
        // Кнопки устройств
        document.querySelectorAll('#case5 .device-card').forEach(card => {
            card.addEventListener('click', function() {
                const deviceName = this.querySelector('h5').textContent;
                showNotification(`Выбрано устройство: ${deviceName}`, 'info');
                
                // Подсветка выбранного устройства
                document.querySelectorAll('#case5 .device-card').forEach(c => {
                    c.style.boxShadow = 'none';
                });
                this.style.boxShadow = '0 0 0 2px #3b82f6';
            });
        });
        
        // Кнопка "Выгрузить отчет"
        const exportBtn = document.querySelector('#case5 .action-btn.primary');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                const checklistData = loadChecklistState();
                const report = generateChecklistReport(checklistData);
                downloadReport(report);
                showNotification('Отчет успешно выгружен', 'success');
            });
        }
        
        // Кнопка "Сбросить чек-лист"
        const resetBtn = document.querySelector('#case5 .action-btn.secondary');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите сбросить весь чек-лист? Все данные будут удалены.')) {
                    localStorage.removeItem('checklistState');
                    document.querySelectorAll('#case5 .item-controls button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    document.querySelectorAll('#case5 textarea').forEach(ta => {
                        ta.value = '';
                    });
                    updateChecklistProgress();
                    showNotification('Чек-лист сброшен', 'success');
                }
            });
        }
        
        // Загрузка сохраненного состояния
        loadSavedChecklistState();
        updateChecklistProgress();
    }

    // ====================
    // 5. Интерактивный чек-лист (из кейса 3)
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
            showNotification(allChecked ? 'Все пункты сняты' : 'Все пункты отмечены', 'info');
        });
    }
    
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
    // 11. Инициализация по умолчанию
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
    
    // ====================
    // 12. Уведомления
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
    // 13. Функции для работы с чек-листом
    // ====================
    function saveChecklistState(item, state) {
        const currentState = JSON.parse(localStorage.getItem('checklistState') || '{}');
        currentState[item] = state;
        localStorage.setItem('checklistState', JSON.stringify(currentState));
    }
    
    function loadChecklistState() {
        return JSON.parse(localStorage.getItem('checklistState') || '{}');
    }
    
    function loadSavedChecklistState() {
        const savedState = loadChecklistState();
        
        document.querySelectorAll('#case5 .checklist-item').forEach(item => {
            const itemText = item.querySelector('.item-text').textContent;
            const savedItem = savedState[itemText];
            
            if (savedItem) {
                const yesBtn = item.querySelector('.yes');
                const noBtn = item.querySelector('.no');
                const textarea = item.querySelector('textarea');
                
                if (savedItem.status === 'ДА') {
                    yesBtn.classList.add('active');
                    noBtn.classList.remove('active');
                } else if (savedItem.status === 'НЕТ') {
                    noBtn.classList.add('active');
                    yesBtn.classList.remove('active');
                }
                
                if (textarea && savedItem.comment) {
                    textarea.value = savedItem.comment;
                }
            }
        });
    }
    
    function updateChecklistProgress() {
        const items = document.querySelectorAll('#case5 .checklist-item');
        let completed = 0;
        
        items.forEach(item => {
            const yesBtn = item.querySelector('.yes');
            const noBtn = item.querySelector('.no');
            
            if (yesBtn.classList.contains('active') || noBtn.classList.contains('active')) {
                completed++;
            }
        });
        
        const progress = (completed / items.length) * 100;
        
        // Обновляем прогресс на карточках устройств (упрощенно)
        document.querySelectorAll('#case5 .progress-fill').forEach(fill => {
            fill.style.width = `${progress}%`;
        });
        
        document.querySelectorAll('#case5 .progress-text').forEach(text => {
            text.textContent = `${completed}/${items.length}`;
        });
    }
    
    function generateChecklistReport(data) {
        const date = new Date().toLocaleString('ru-RU');
        let report = `ОТЧЕТ ПО ЧЕК-ЛИСТУ\n`;
        report += `Дата создания: ${date}\n`;
        report += `========================================\n\n`;
        
        Object.entries(data).forEach(([item, state]) => {
            report += `Пункт: ${item}\n`;
            report += `Статус: ${state.status || 'Не отмечено'}\n`;
            report += `Комментарий: ${state.comment || 'Нет комментария'}\n`;
            report += `Дата: ${new Date(state.timestamp).toLocaleString('ru-RU')}\n`;
            report += `----------------------------------------\n`;
        });
        
        report += `\nВсего пунктов: ${Object.keys(data).length}\n`;
        report += `Выполнено: ${Object.values(data).filter(d => d.status).length}\n`;
        
        return report;
    }
    
    function downloadReport(report) {
        const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `чек-лист_отчет_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Функция для активации пункта чек-листа (для демо)
    window.activateChecklistItem = function(deviceName) {
        showNotification(`Активирован чек-лист: ${deviceName}`, 'info');
    };
    
    // Функция для переключения секций (для демо)
    window.toggleChecklistSection = function(header) {
        header.classList.toggle('active');
    };
});
// Управление предпросмотром документации
document.addEventListener('DOMContentLoaded', function() {
    // Элементы для предпросмотра
    const docFrame = document.getElementById('docFrame');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const togglePreviewBtn = document.getElementById('togglePreview');
    const previewContainer = document.querySelector('.doc-preview-container');
    
    if (docFrame && loadingIndicator) {
        // Скрыть индикатор загрузки когда фрейм загрузится
        docFrame.addEventListener('load', function() {
            loadingIndicator.style.display = 'none';
            docFrame.classList.add('loaded');
            
            // Изменить высоту фрейма под содержимое
            try {
                const frameDoc = docFrame.contentDocument || docFrame.contentWindow.document;
                const height = frameDoc.documentElement.scrollHeight;
                docFrame.style.height = Math.min(height, 600) + 'px';
            } catch (e) {
                // Защита от CORS
                console.log('Не удалось получить высоту содержимого фрейма');
            }
        });
        
        // Показать индикатор при ошибке загрузки
        docFrame.addEventListener('error', function() {
            loadingIndicator.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Не удалось загрузить документ</p>
                    <a href="./assets/tealpos-doc.html" target="_blank" class="preview-btn">
                        Открыть напрямую
                    </a>
                </div>
            `;
        });
    }
    
    // Кнопка развернуть/свернуть
    if (togglePreviewBtn && previewContainer) {
        let isExpanded = false;
        
        togglePreviewBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Создаем оверлей
                const overlay = document.createElement('div');
                overlay.className = 'preview-overlay active';
                document.body.appendChild(overlay);
                
                // Разворачиваем контейнер
                previewContainer.classList.add('expanded');
                document.body.style.overflow = 'hidden';
                
                // Обновляем текст кнопки
                togglePreviewBtn.innerHTML = '<i class="fas fa-compress"></i> Свернуть';
                
                // Закрытие по клику на оверлей
                overlay.addEventListener('click', function() {
                    previewContainer.classList.remove('expanded');
                    overlay.remove();
                    document.body.style.overflow = '';
                    togglePreviewBtn.innerHTML = '<i class="fas fa-expand"></i> Развернуть';
                    isExpanded = false;
                });
                
                // Закрытие по Escape
                document.addEventListener('keydown', function closeOnEscape(e) {
                    if (e.key === 'Escape') {
                        previewContainer.classList.remove('expanded');
                        overlay.remove();
                        document.body.style.overflow = '';
                        togglePreviewBtn.innerHTML = '<i class="fas fa-expand"></i> Развернуть';
                        isExpanded = false;
                        document.removeEventListener('keydown', closeOnEscape);
                    }
                });
            } else {
                // Сворачиваем
                const overlay = document.querySelector('.preview-overlay');
                if (overlay) overlay.remove();
                previewContainer.classList.remove('expanded');
                document.body.style.overflow = '';
                togglePreviewBtn.innerHTML = '<i class="fas fa-expand"></i> Развернуть';
            }
        });
    }
    
    // Предзагрузка документа при наведении на таб
    const tab3Btn = document.querySelector('[data-tab="case3"]');
    if (tab3Btn && docFrame) {
        let isPreloaded = false;
        
        tab3Btn.addEventListener('mouseenter', function() {
            if (!isPreloaded && docFrame.src && !docFrame.loaded) {
                // Предзагрузка
                const tempFrame = document.createElement('iframe');
                tempFrame.style.display = 'none';
                tempFrame.src = docFrame.src;
                document.body.appendChild(tempFrame);
                
                tempFrame.onload = function() {
                    isPreloaded = true;
                    document.body.removeChild(tempFrame);
                };
            }
        });
    }
});
