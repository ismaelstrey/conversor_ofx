const salvaLocalStorage = (data: [], name: string) => {
    localStorage.setItem(name, JSON.stringify(data));
};

const ofx = typeof window !== "undefined" ? localStorage.getItem('ofx') : null;



export { salvaLocalStorage, ofx };