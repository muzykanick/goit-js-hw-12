
import axios from 'axios';

async function getInfo(str, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '43485677-c4ca6985f0e2cabeed805eb30';
    

    const params = new URLSearchParams({
        key: API_KEY,
        q: str,
        image_typ: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 15,
    });

    const { data } = await axios.get(`${BASE_URL}?${params}`);
    return data;

}
export { getInfo };
