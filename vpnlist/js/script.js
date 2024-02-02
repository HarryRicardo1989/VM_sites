// script.js
window.addEventListener('DOMContentLoaded', () => {
    const vpnTable = document.getElementById('vpnTable');
    const currentYear = document.getElementById('currentYear');

    // Atualiza o ano atual no rodapé
    currentYear.textContent = new Date().getFullYear();

    // Função para atualizar a tabela
    const atualizarTabela = () => {
        //console.log('Obtendo dados do servidor...');

        fetch('/vpnjson', {
            cache: 'no-cache' // Adiciona o cabeçalho Cache-Control: no-cache
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Dados recebidos:', data);
                // Limpa o conteúdo atual da tabela
                vpnTable.innerHTML = '';

                // Cria os elementos da tabela com os dados do JSON
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');
                const headerRow = document.createElement('tr');
                const hostnameHeader = document.createElement('th');
                const ipHeader = document.createElement('th');

                hostnameHeader.textContent = 'Hostname';
                ipHeader.textContent = 'IP';

                headerRow.appendChild(hostnameHeader);
                headerRow.appendChild(ipHeader);
                thead.appendChild(headerRow);

                for (const node of Object.values(data.node)) {
                    const row = document.createElement('tr');
                    const hostnameCell = document.createElement('td');
                    const ipCell = document.createElement('td');

                    hostnameCell.textContent = node.hostname;
                    ipCell.textContent = node.IP;

                    row.appendChild(hostnameCell);
                    row.appendChild(ipCell);
                    tbody.appendChild(row);
                }

                // Adiciona os elementos à tabela
                vpnTable.appendChild(thead);
                vpnTable.appendChild(tbody);
            })
            .catch(error => {
                console.error('Erro ao buscar o JSON:', error);
            });
    };

    // Atualiza a tabela imediatamente
    atualizarTabela();

    // Define o intervalo de atualização da tabela (a cada 5 segundos)
    setInterval(atualizarTabela, 5000);
});
