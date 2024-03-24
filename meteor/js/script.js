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

        // Mapeamento de IDs para nomes amigáveis
        const nomesDispositivos = {
            'METEOR-EC:DA:3B:BF:91:2C': 'Mobile',
            'METEOR-4C:75:25:F5:65:3C': 'Telhado',
            'METEOR-4C:75:25:F3:C1:F4': 'Externo',
            'METEOR-EC:DA:3B:BF:B2:BC': 'Escritorio'

        };

        dados.forEach(pcd => {
            const box = document.createElement('div');
            box.className = 'box';

            // Usa o mapeamento para substituir o ID por um nome amigável, se disponível
            const nomeDispositivo = nomesDispositivos[pcd.device_id] || pcd.device_id;
            const titulo = document.createElement('h3');
            titulo.textContent = `Dispositivo: ${nomeDispositivo}`; // Substituído pelo nome amigável
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
                { nome: 'Altitude', valor: `${pcd.altitude}m` },
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

                if (index < dadosPcd.length) {
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
setInterval(atualizarDadosPcd, 5000);
