import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterToken } from '../helpers/autenticacao.js'; // 1. Garanta que a importação existe

export default function () {
    // 2. Aqui você gera o token dinamicamente antes de usar nas requisições
    const token = obterToken(); 

    const url = 'http://localhost:3000/transferencias';

    const payload = JSON.stringify({
        contaOrigem: 1,
        contaDestino: 2,
        valor: 11,
        token: "" 
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // 4. Aqui ele vai concatenar o token real perfeitamente
        },
    };

    let res = http.post(url, payload, params);
    
    console.log(`Status retornado: ${res.status} - Resposta: ${res.body}`);
    
    check(res, { "status is 201": (res) => res.status === 201 });
    sleep(1);
}