async function atualizarDadosPcd() {
    try {
        const resposta = await fetch('/pcd-data'); // Faz a requisição para o servidor
        if (!resposta.ok) {
            throw new Error('Falha ao obter dados');
        }
        const dados = await resposta.json(); // Converte a resposta de JSON para um objeto JavaScript

        // Limpa os dados anteriores
        const corpoTabela = document.getElementById('dadosPcd').getElementsByTagName('tbody')[0];
        corpoTabela.innerHTML = '';

        // Insere os novos dados na tabela
        Object.keys(dados).forEach(mac => {
            const pcd = dados[mac];
            const linha = corpoTabela.insertRow(-1);

            const celulaMac = linha.insertCell(0);
            celulaMac.textContent = mac;

            const celulaTemperatura = linha.insertCell(1);
            celulaTemperatura.textContent = pcd.event.temperature + ' °C';

            const celulaPressao = linha.insertCell(2);
            celulaPressao.textContent = pcd.event.pressure + ' hPa';

            const celulaUmidade = linha.insertCell(3);
            celulaUmidade.textContent = pcd.event.humidity + '%';

            const celulaBateria = linha.insertCell(4);
            celulaBateria.textContent = pcd.battery.level + '%';

            // Adiciona mais células conforme necessário para os outros dados
        });
    } catch (erro) {
        console.error('Erro ao atualizar dados:', erro);
    }
}

// Atualiza os dados imediatamente ao carregar a página
atualizarDadosPcd();

// Define um intervalo para atualizar os dados a cada 30 segundos
setInterval(atualizarDadosPcd, 30000);
