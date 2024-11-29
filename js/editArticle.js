document.addEventListener('DOMContentLoaded', function() {
    const editArticleForm = document.getElementById('edit-article-form');
    if (editArticleForm) {
        editArticleForm.addEventListener('submit', handleEditArticle);
    }
});

function handleEditArticle(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('api/articles/edit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Artigo editado com sucesso!');
            loadExistingArticles(); // Atualiza a listagem de artigos
        } else {
            alert('Erro ao editar artigo: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao editar artigo:', error);
    });
}
