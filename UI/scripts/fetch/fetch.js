const localUrl = 'http://127.0.0.1:3000/api/v1'
const herokuUrl = 'https://shielded-headland-63958.herokuapp.com/api/v1'
const url = `${herokuUrl}`;

const fetchFunc = {

     postData (url = '', data = {}) {
        return fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": localStorage.token,
            },
            body: data,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err =>  err)
    },

     getData (url = '') {
        return fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": localStorage.token
            },
        })
        .then(res => res.json())
        .then(res =>  res)
        .catch(err => err);
    },

     deleteData (url = '') {
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Authorization": localStorage.token,
            },
        })
        .then(res => res.json())
        .then(res =>  res)
        .catch(err => err);
    },
    
     patchData (url = '', data) {
        return fetch(url, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res =>  res)
        .catch(err => err);
    }
};