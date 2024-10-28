/**
 * setItem => key -- recebe o nome do storage e value -- recebe os valores de JSON.stringfy({})
 */
    export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    }
    
    export function getItem(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    
    export function removeItem(key) {
        localStorage.removeItem(key);
    }