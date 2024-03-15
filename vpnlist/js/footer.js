function atualizarAnoAtual() {
    const anoAtual = new Date().getFullYear(); // Obtém o ano atual
    document.getElementById('currentYear').textContent = anoAtual; // Atualiza o texto do elemento com o ano atual
}

// Chama a função para atualizar o ano no rodapé
atualizarAnoAtual();