// sessionStorage tools

// returns session storage value per key
export function getSS(key) {
    function handleGetSS(resolve, reject) {
        const value = sessionStorage.getItem(key);
        if (value !== null) {
            resolve(JSON.parse(value));
        } else {
            console.log('getJSON reject');
            reject([]);
        }
    }
    return new Promise(handleGetSS);
};

// saves session storage value to key and returns new key value
export function saveSS(key, obj) {
    function handleSaveSS(resolve, reject) {
        sessionStorage.setItem(key, JSON.stringify(obj));
        const value = sessionStorage.getItem(key);
        if (value !== null) {
            resolve(JSON.parse(value));
        } else {
            reject([]);
        }
    }

    return new Promise(handleSaveSS);
};
