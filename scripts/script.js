console.log("✅ ДеревьЯ - сайт загружен!");

// Основные функции
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Калькулятор саженцев
function setupCalculator() {
    const saplingsSlider = document.getElementById('saplings');
    const saplingCount = document.getElementById('sapling-count');
    const amount = document.getElementById('amount');
    
    if (saplingsSlider && saplingCount && amount) {
        saplingsSlider.addEventListener('input', function() {
            const count = this.value;
            const total = count * 1000;
            saplingCount.textContent = count;
            amount.textContent = total.toLocaleString('ru-RU') + ' ₽';
        });
        
        saplingsSlider.dispatchEvent(new Event('input'));
    }
}

// Модальные окна
function openModal(modalId, ritualType = '') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (modalId === 'ritualModal' && ritualType) {
            document.getElementById('ritualTitle').textContent = `Заявка: ${ritualType}`;
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Функции для отправки форм
function submitCompanyForm() {
    console.log("Форма компаний отправляется!");
    
    const form = document.getElementById('companyForm');
    if (!form) {
        console.error("Форма companyForm не найдена!");
        return false;
    }

    // Проверяем заполнены ли обязательные поля
    const requiredFields = form.querySelectorAll('[required]');
    let allFilled = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            allFilled = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (!allFilled) {
        alert('Пожалуйста, заполните все обязательные поля');
        return false;
    }
    
    console.log('📧 Заявка компании отправлена');
    alert('Заявка для компании отправлена! Мы свяжемся с вами в ближайшее время.');
    closeModal('companyModal');
    form.reset();
    return true;
}

function submitFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        // Проверяем заполнены ли обязательные поля
        const requiredFields = form.querySelectorAll('[required]');
        let allFilled = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFilled = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!allFilled) {
            alert('Пожалуйста, заполните все обязательные поля');
            return false;
        }
        
        console.log('📧 Обратная связь отправлена');
        alert('Ваш вопрос отправлен! Мы ответим вам в течение 24 часов.');
        form.reset();
        return true;
    }
    return false;
}

function submitRitualForm() {
    const form = document.getElementById('ritualForm');
    if (form) {
        // Проверяем заполнены ли обязательные поля
        const requiredFields = form.querySelectorAll('[required]');
        let allFilled = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFilled = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!allFilled) {
            alert('Пожалуйста, заполните все обязательные поля');
            return false;
        }
        
        console.log('📧 Заявка на ритуал отправлена');
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        closeModal('ritualModal');
        form.reset();
        return true;
    }
    return false;
}

// Обработчики модальных окон и кнопок
function setupModalHandlers() {
    console.log("Настройка обработчиков...");
    
    // Закрытие модалок при клике вне контента
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Обработчики для крестиков
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Кнопки для компаний (шефство)
    document.querySelectorAll('.tier .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Открываем модалку компаний");
            openModal('companyModal');
        });
    });
    
    // Кнопки для ритуалов (карточки)
    document.querySelectorAll('.ritual-card .btn-outline').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const ritualName = this.closest('.ritual-card').querySelector('h4').textContent;
            openModal('ritualModal', ritualName);
        });
    });

    // Кнопки в эмоциональных блоках
    document.querySelectorAll('.emotional-content .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const ritualName = this.closest('.emotional-content').querySelector('h2').textContent;
            openModal('ritualModal', ritualName);
        });
    });

    // Кнопка участия в посадке (калькулятор)
    const participateBtn = document.querySelector('.sapling-calculator .btn-primary');
    if (participateBtn) {
        participateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const saplingsCount = document.getElementById('saplings').value;
            openModal('ritualModal', `Участие в посадке (${saplingsCount} саженцев)`);
        });
    }
    
    // Обработчики для кнопок отправки форм
    document.querySelectorAll('#companyForm .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Кнопка отправки компаний нажата");
            submitCompanyForm();
        });
    });
    
    document.querySelectorAll('#ritualForm .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            submitRitualForm();
        });
    });
    
    document.querySelectorAll('#feedbackForm .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            submitFeedbackForm();
        });
    });
}

// Плавная прокрутка
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Страница загружена!");
    setupCalculator();
    setupModalHandlers();
    setupSmoothScroll();
});

// Экспорт функций для глобального использования
window.scrollToSection = scrollToSection;
window.closeModal = closeModal;