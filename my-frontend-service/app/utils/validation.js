
// src/utils/validation.js  

export const isValidEmail = (email) => {  
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return regex.test(email);  
};  

export const isValidPassword = (password) => {  
    // Doit contenir au moins 6 caractères  
    return password.length >= 6;  
};  

export const validateForm = (formData) => {  
    const errors = {};  
    
    if (!isValidEmail(formData.email)) {  
        errors.email = "L'email n'est pas valide.";  
    }  
    
    if (!isValidPassword(formData.password)) {  
        errors.password = "Le mot de passe doit avoir au moins 6 caractères.";  
    }  
    
    return errors;  
};