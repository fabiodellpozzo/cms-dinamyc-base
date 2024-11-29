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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Artigo criado com sucesso!');
            loadExistingArticles(); // Atualiza a listagem de artigos
        } else {
            alert('Erro ao criar artigo: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao criar artigo:', error);
    });
}
