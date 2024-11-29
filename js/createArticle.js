document.addEventListener('DOMContentLoaded', function() {
    const createArticleForm = document.getElementById('create-article-form');
    if (createArticleForm) {
        createArticleForm.addEventListener('submit', handleCreateArticle);
    }
});

function handleCreateArticle(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('api/articles/create.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Use text() para depurar
    .then(text => {
        console.log('Resposta do servidor:', text); // Log da resposta
        try {
            const data = JSON.parse(text); // Converte a resposta para JSON
            if (data.success) {
                alert('Artigo criado com sucesso!');
                loadArticlesForDashboard(); // Atualiza a listagem de artigos
            } else {
                alert('Erro ao criar artigo: ' + data.message);
            }
        } catch (e) {
            console.error('Erro ao processar JSON:', e);
            alert('Erro ao criar artigo: Resposta do servidor não é um JSON válido.');
        }
    })
    .catch(error => {
        console.error('Erro ao criar artigo:', error);
    });
}
