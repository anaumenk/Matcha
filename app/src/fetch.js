// export function fetchGet(url) {
//     return fetch(`http://localhost:8080/php/${url}`, {
//         method: 'get',
//     }).then(function(response) {
//         if (response.status >= 200 && response.status < 300) {
//             return response.text();
//         }
//         throw new Error(response.statusText);
//     })
//         .then(function(response) {
//             return response;
//         });
// }

export function fetchPost(url, params) {
    return fetch(`http://localhost:8080/php/${url}`, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: params,
    }).then(function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        }
        throw new Error(response.statusText);
    })
        .then(function(response) {
            return response;
        });
}

