document.addEventListener('DOMContentLoaded', function() {
    attachArticleEventListeners();
});

function attachArticleEventListeners() {
    document.querySelectorAll('.edit-article').forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');
            const articleTitle = this.getAttribute('data-title');
            const articleContent = this.getAttribute('data-content');
            const articleCategory = this.getAttribute('data-category');
            const editArticleForm = document.getElementById('edit-article-form');
            if (editArticleForm) {
                loadCategoriesForEditForm(editArticleForm.elements['category'], articleCategory);
                editArticleForm.elements['article_id'].value = articleId;
                editArticleForm.elements['title'].value = articleTitle;
                editArticleForm.elements['content'].value = articleContent;
                const editArticleCard = document.getElementById('edit-article-card');
                if (editArticleCard) {
                    editArticleCard.style.display = 'block';
                    editArticleCard.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error("Elemento 'edit-article-card' não encontrado.");
                }
            } else {
                console.error("Elemento 'edit-article-form' não encontrado.");
            }
        });
    });

    document.querySelectorAll('.delete-article').forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');
            if (confirm('Tem certeza de que deseja excluir este artigo?')) {
                deleteArticle(articleId);
            }
        });
    });

    const editArticleForm = document.getElementById('edit-article-form');
    if (editArticleForm) {
        editArticleForm.addEventListener('submit', handleEditArticle);
    }
}

function loadCategoriesForEditForm(selectElement, selectedCategory) {
    fetch('api/categories/load.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                selectElement.innerHTML = '';
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    if (category.id === selectedCategory) {
                        option.selected = true;
                    }
                    selectElement.appendChild(option);
                });
            } else {
                alert('Erro ao carregar categorias: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
}

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
            alert('Artigo atualizado com sucesso!');
            loadArticlesForDashboard(); // Atualiza a listagem de artigos
            document.getElementById('edit-article-card').style.display = 'none'; // Ocultar o formulário após a atualização
        } else {
            alert('Erro ao atualizar artigo: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar artigo:', error);
    });
}

function deleteArticle(articleId) {
    const formData = new FormData();
    formData.append('article_id', articleId);

    fetch('api/articles/delete.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Artigo excluído com sucesso!');
            loadArticlesForDashboard(); // Atualiza a listagem de artigos
        } else {
            alert('Erro ao excluir artigo: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao excluir artigo:', error);
    });
}
