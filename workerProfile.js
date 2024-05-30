document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workerJson = urlParams.get('worker');
    if (workerJson) {
        try {
            const worker = JSON.parse(decodeURIComponent(workerJson)); 
            console.log(worker)
        } catch (e) {
            console.error('Error parsing worker JSON:', e);
        }
    }


});
