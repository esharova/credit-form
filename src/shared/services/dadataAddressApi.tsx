import Axios from 'axios';

class DaDataResponse {
    public value: string;
}

export class DadataAddressApi {

    public getSuggestions = (input: string, callback: Function) => {
        Axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {query: input}, {headers: {
                Authorization: 'Token 4aa524ecd2cdc4bd2c036d8a4cb51a125b09e3c0',
            }}).then((r) => callback(r.data.suggestions.map((item: DaDataResponse) => item.value)));
    }
}
