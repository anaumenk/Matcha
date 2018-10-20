export function fetchPost(url, params) {
    let userId = localStorage.getItem('userId') ? localStorage.getItem('userId').split('.') : '',
        date = new Date(),
        now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return fetch(`http://${window.location.hostname}:8080/php/${url}`, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `${params}&connection=${now}&userId=${userId[2]}`,
    }).then(function(response) {

        if (response.status >= 200 && response.status < 300) {
            return response.text();
        }
        throw new Error(response.statusText);
    })
        .then(function(response) {
            return response;
        }).catch(() => {
            return 'TypeError: Failed to fetch';
        })

}

