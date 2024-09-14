async function buscarEstados() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    try {
        const response = await fetch(url);
        const estados = await response.json();
        const estadoSelect = document.getElementById('estados');

        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.id;
            option.textContent = `${estado.nome} (${estado.sigla})`;
            estadoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
    }
}

async function buscarCidades(estadoId) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;
    try {
        const response = await fetch(url);
        const cidades = await response.json();
        const cidadeSelect = document.getElementById('cidades');

        cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';

        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade.id;
            option.textContent = cidade.nome;
            cidadeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
    }
}

document.getElementById('estados').addEventListener('change', function () {
    const estadoId = this.value;
    if (estadoId) {
        buscarCidades(estadoId);
    } else {
        document.getElementById('cidades').innerHTML = '<option value="">Selecione uma cidade</option>';
    }
});

buscarEstados();
