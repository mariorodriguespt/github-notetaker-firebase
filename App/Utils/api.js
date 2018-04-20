var api = {
    getBio( username ){
        username = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${ username }`;

        return fetch(url)
                .then((response)=> response.json());
    },

    getRepos( username ){
        username = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${ username }/repos`;

        return fetch(url)
                .then((response)=> response.json());
    },

    getNotes( username ){
        username = username.toLowerCase().trim();
        const url = `https://github-saver-81995.firebaseio.com/${ username }.json`;

        return fetch(url)
                .then((response)=> response.json());
    },

    addNote( username , note ){
        username = username.toLowerCase().trim();
        const url = `https://github-saver-81995.firebaseio.com/${ username }.json`;

        return fetch(url , {
            method : 'POST',
            body : JSON.stringify( note )
        })
            .then((response)=> response.json());

    }
};

module.exports = api;