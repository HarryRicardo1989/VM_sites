async function atualizarDados() {
    try {
        const resposta = await fetch('/pcd-data');
        const dados = await resposta.json();

        const tabela = document.getElementById('dados').getElementsByTagName('tbody')[0];
        tabela.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

        // Supondo que os dados estejam em um array de objetos com a propriedade macAddress
        dados.forEach(dado => {
            let linha = tabela.insertRow();
            let celula = linha.insertCell(0);
            celula.textContent = dado.macAddress; // Atualiza com o MAC Address
        });
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

// Atualiza os dados a cada 5 segundos
setInterval(atualizarDados, 5000);

// Também atualiza os dados imediatamente ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarDados);
