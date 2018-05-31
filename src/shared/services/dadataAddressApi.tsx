import axios from 'axios';
export class DadataAddressApi {

    getSuggestions = (input, callback) => {
        axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {"query": input}, {headers: {
                "Authorization": "Token 4aa524ecd2cdc4bd2c036d8a4cb51a125b09e3c0"
            }}).then((r)=> callback(r.data.suggestions.map(item=>item.value)));
    }
}
