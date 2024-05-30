document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workerJson = urlParams.get('worker');
    let worker;
    if (workerJson) {
        try {
            worker = JSON.parse(decodeURIComponent(workerJson)); 
        } catch (e) {
            console.error('Error parsing worker JSON:', e);
        }
    }
    


});
