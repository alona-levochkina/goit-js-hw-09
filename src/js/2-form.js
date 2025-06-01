const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';
let formData = { email: '', message: '' };

function populateForm() {
    try {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            formData = JSON.parse(storedData);
            emailInput.value = formData.email || '';
            messageInput.value = formData.message || '';
        }
    } catch (error) {
        console.error('Error parsing stored data:', error);
    }
}

function saveFormData() {
    localStorage.setItem(storageKey, JSON.stringify(formData));
}

feedbackForm.addEventListener('input', (event) => {
    if (event.target === emailInput) {
        formData.email = event.target.value.trim();
    } else if (event.target === messageInput) {
        formData.message = event.target.value.trim();
    }
    saveFormData();
});

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formData.email.trim() === '' || formData.message.trim() === '') {
        alert('Fill please all fields');
        return
    }
    console.log('Form data:', formData);
    localStorage.removeItem(storageKey);
    formData = { email: '', message: '' };
    emailInput.value = '';
    messageInput.value = '';
});

populateForm();