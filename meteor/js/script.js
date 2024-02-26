async function atualizarDadosPcd() {
    try {
        const resposta = await fetch('/data/last-data', {
            cache: 'no-cache'
        });
        if (!resposta.ok) {
            throw new Error('Falha ao obter dados');
        }
        const dados = await resposta.json();

        const container = document.querySelector('.container');
        container.innerHTML = ''; // Limpa os dados antigos

        // Como agora 'dados' é um array, usamos forEach diretamente nele
        dados.forEach(pcd => {
            const box = document.createElement('div');
            box.className = 'box';

            const titulo = document.createElement('h3');
            titulo.textContent = `Dispositivo: ${pcd.device_id}`;
            box.appendChild(titulo);

            const ultimaColeta = document.createElement('p');
            ultimaColeta.className = 'ultima-coleta';
            ultimaColeta.textContent = `Última Coleta: ${new Date(pcd.timestamp).toLocaleString('pt-BR')}`;
            box.appendChild(ultimaColeta);

            const tabela = document.createElement('table');
            tabela.className = 'table-vertical';

            const dadosPcd = [
                { nome: 'Temperatura', valor: `${pcd.temperature}°C` },
                { nome: 'Umidade', valor: `${pcd.humidity}%` },
                { nome: 'Pressão', valor: `${pcd.pressure}hPa` },
                { nome: 'Ponto de Orvalho', valor: `${pcd.dewpoint}ºC` },
                { nome: 'Nível da Bateria', valor: `${pcd.battery_level}%` },
                { nome: 'Tensão da Bateria', valor: `${pcd.battery_voltage}mV` },
                { nome: 'Carregando', valor: pcd.charging ? 'Sim' : 'Não' },
                { nome: 'Carregado', valor: pcd.charged ? 'Sim' : 'Não' },
            ];

            dadosPcd.forEach((dado, index) => {
                const linha = tabela.insertRow();
                const celulaNome = linha.insertCell();
                celulaNome.textContent = dado.nome;

                const celulaValor = linha.insertCell();
                celulaValor.textContent = dado.valor;

                if (index < dadosPcd.length - 1) {
                    linha.className = 'linha-dados';
                }
            });

            box.appendChild(tabela);
            container.appendChild(box);
        });
    } catch (erro) {
        console.error('Erro ao atualizar dados:', erro);
    }
}

atualizarDadosPcd();
setInterval(atualizarDadosPcd, 30000);
