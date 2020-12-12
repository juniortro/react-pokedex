const axios = require('axios');

// export async function getAllPokemon(url) {
//     return new Promise ((resolve,reject) => {
//         fetch(url)
//             .then(res => res.json())
//             .then(data => {
//                 resolve(data);
//             });
//     });
// }

// export async function getPokemon(url) {
//     return new Promise ((resolve,reject) => {
//         fetch(url)
//             .then(res => res.json())
//             .then(data => {
//                 resolve(data);
//             });
//     });
// }

export async function getAllPokemon(url) {
    try {
        const response = (await axios.get(url)).data
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getPokemon(url) {
    try {
        const response = (await axios.get(url)).data
        return response;
    } catch (error) {
        console.log(error);
    }
}