export function fetchPost(url, params) {
    let date = new Date(),
        now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return fetch(`http://localhost:8080/php/${url}`, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `${params}&connection=${now}&userId=${localStorage.getItem('userId')}`,
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

