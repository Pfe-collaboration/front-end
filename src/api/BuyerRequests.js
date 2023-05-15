import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8800' });

const buyer = JSON.parse(localStorage.getItem("buyer"))||null;
const Buyer = buyer
export default{Buyer}