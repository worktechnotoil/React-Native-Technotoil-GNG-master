import axios from 'axios';

const instance= axios.create({
    baseURL:'https://develop-c.cheshtainfotech.com/CEA/api/',
    headers:{
        Authorization:'@CEAUTH09#',
    
    }
})

export default instance
