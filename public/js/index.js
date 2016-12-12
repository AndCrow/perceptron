const form = document.querySelector('.form');
const container = document.querySelector('.results');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = new FormData(this);

    asyncForm("/rec", data)
        .then( (res) => {
            res = JSON.parse(res);
            const elem = document.createElement('pre');
            elem.innerHTML = `${JSON.stringify(res[0], 2)} => ${res[1].toString().slice(0, 5)}`
            container.appendChild(elem);
        })
        .catch( (e) => {
            console.warn(e);
        })

    return false;
});


function asyncForm(url, data) {
    return new Promise( (resolve, reject) => {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        let xhr = new XHR();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = function() {
            resolve(this.responseText);
        };

        xhr.onerror = function() {
            reject(this.status);
        };

        xhr.send(data);
    });
}
