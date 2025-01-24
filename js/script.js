// Seleção de elementos
const cepSearchDiv = document.getElementById("cepSearch");
const addressSearchDiv = document.getElementById("addressSearch");
const btnAlt = document.getElementById("btnAlt");
const backToCepBtn = document.getElementById("backToCepBtn");
const searchAddressBtn = document.getElementById("searchAddressBtn");
const resultadoDiv = document.getElementById("resultado");
const enderecosList = document.getElementById("enderecos");

// Evento para alternar para busca por endereço
btnAlt.addEventListener("click", () => {
    cepSearchDiv.classList.add("hide");
    addressSearchDiv.classList.remove("hide");
    resultadoDiv.classList.add("address-search");
    resultadoDiv.classList.remove("cep-search");
});

// Evento para voltar para busca por CEP
backToCepBtn.addEventListener("click", () => {
    addressSearchDiv.classList.add("hide");
    cepSearchDiv.classList.remove("hide");
    resultadoDiv.classList.add("cep-search");
    resultadoDiv.classList.remove("address-search");
});

// Função de busca por CEP
document.getElementById("btn").addEventListener("click", async () => {
    const cep = document.getElementById("cep").value.trim();
    if (!cep) {
        alert("Por favor, digite um CEP.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado.");
        } else {
            enderecosList.innerHTML = `
                <li>
                    <strong>CEP:</strong> ${data.cep}<br>
                    <strong>Logradouro:</strong> ${data.logradouro}<br>
                    <strong>Bairro:</strong> ${data.bairro}<br>
                    <strong>Cidade:</strong> ${data.localidade}<br>
                    <strong>Estado:</strong> ${data.uf}
                </li>`;
            resultadoDiv.classList.add("cep-search");
            resultadoDiv.classList.remove("address-search");
            resultadoDiv.classList.remove("hide");
        }
    } catch (error) {
        alert("Erro ao buscar o CEP.");
    }
});

// Função de busca por endereço
searchAddressBtn.addEventListener("click", async () => {
    const uf = document.getElementById("uf").value.trim().toUpperCase();
    const city = document.getElementById("city").value.trim();
    const street = document.getElementById("street").value.trim();

    if (!uf || !city || !street) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf}/${city}/${street}/json/`);
        const data = await response.json();

        if (data.length === 0) {
            alert("Endereço não encontrado.");
        } else {
            enderecosList.innerHTML = "";
            data.forEach((endereco) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>CEP:</strong> ${endereco.cep}<br>
                    <strong>Logradouro:</strong> ${endereco.logradouro}<br>
                    <strong>Bairro:</strong> ${endereco.bairro}<br>
                    <strong>Cidade:</strong> ${endereco.localidade}<br>
                    <strong>Estado:</strong> ${endereco.uf}
                `;
                enderecosList.appendChild(li);
            });

            resultadoDiv.classList.add("address-search");
            resultadoDiv.classList.remove("cep-search");
            resultadoDiv.classList.remove("hide");
        }
    } catch (error) {
        alert("Erro ao buscar o endereço.");
    }
});
