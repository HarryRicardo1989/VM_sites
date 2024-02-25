
async function atualizarDadosPcd() {
    try {
        const resposta = await fetch('/pcd-data', {
            cache: 'no-cache'
        });
        if (!resposta.ok) {
            throw new Error('Falha ao obter dados');
        }
        const dados = await resposta.json();

        const container = document.querySelector('.container');
        container.innerHTML = ''; // Limpa os dados antigos

        Object.keys(dados).forEach(mac => {
            const pcd = dados[mac];
            const box = document.createElement('div');
            box.className = 'box';

            const titulo = document.createElement('h3');
            titulo.textContent = `Dispositivo: ${mac}`;
            box.appendChild(titulo);

            const ultimaColeta = document.createElement('p');
            ultimaColeta.className = 'ultima-coleta';
            ultimaColeta.textContent = `Última Coleta: ${new Date(pcd.event.timestamp).toLocaleString('pt-BR')}`;
            box.appendChild(ultimaColeta);

            const tabela = document.createElement('table');
            tabela.className = 'table-vertical';

            const dadosPcd = [
                { nome: 'Temperatura', valor: `${pcd.event.temperature}°C` },
                { nome: 'Umidade', valor: `${pcd.event.humidity}%` },
                { nome: 'Pressão', valor: `${pcd.event.pressure}hPa` },
                { nome: 'Ponto de Orvalho', valor: `${pcd.event.dewpoint}ºC` },
                { nome: 'Nível da Bateria', valor: `${pcd.battery.level}%` },
                { nome: 'Tensao da Bateria', valor: `${pcd.battery.voltage}mV` },
                { nome: 'Charging status', valor: `${pcd.battery.charging === 1 ? true : false}` },
                { nome: 'Charged status', valor: `${pcd.battery.charged === 1 ? true : false}` },
                // Adicione mais dados conforme necessário
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
