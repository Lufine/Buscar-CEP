let cep = document.getElementById('cep');
let btn = document.getElementById('btn');
let resultado = document.getElementById('resultado');
let cepResultado = document.getElementById('cepResultado');
let logradouro = document.getElementById('logradouro');
let bairro = document.getElementById('bairro');
let cidade = document.getElementById('cidade');
let estado = document.getElementById('estado');

btn.addEventListener('click', function () {
    if (!cep.value || cep.value.length < 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('CEP não encontrado');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            cepResultado.textContent = `${cep.value}`;
            logradouro.textContent = `${data.logradouro || 'N/A'}`;
            bairro.textContent = `${data.bairro || 'N/A'}`;
            cidade.textContent = `${data.localidade || 'N/A'}`;
            estado.textContent = `${data.uf || 'N/A'}`;

            resultado.classList.remove('hide');
            resultado.classList.add('show');
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao buscar o CEP. Tente novamente.');
        });
});
