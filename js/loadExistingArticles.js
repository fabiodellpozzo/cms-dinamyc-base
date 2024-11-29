document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('articles-list')) {
        let currentPage = 1;
        const loadMoreButton = document.getElementById('load-more');

        loadArticlesForIndex(currentPage, 4); // Carregar 4 artigos inicialmente

        loadMoreButton.addEventListener('click', async function() {
            currentPage++;
            await loadArticlesForIndex(currentPage, 2); // Carregar 2 artigos a cada clique
        });
    } else if (document.getElementById('articles-table')) {
        loadArticlesForDashboard(); // Carregar artigos no dashboard
    }

    // Carregar categorias para o select no formulário de criação de artigos
    loadCategoriesForSelect('category');
});

async function loadArticlesForIndex(page, articlesPerPage) {
    try {
        const response = await fetch(`api/articles/load.php?page=${page}&articlesPerPage=${articlesPerPage}`);
        const data = await response.json();
        if (data.success) {
            const articlesList = document.getElementById('articles-list');
            if (articlesList) {
                data.articles.forEach(article => {
                    if (!document.querySelector(`#article-${article.id}`)) { // Verificar duplicação
                        const articleDiv = document.createElement('div');
                        articleDiv.classList.add('card', 'mb-3');
                        articleDiv.dataset.created = article.created_at;
                        articleDiv.dataset.popularity = article.popularity;
                        articleDiv.id = `article-${article.id}`; // Atribuir um ID único
                        articleDiv.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${article.categoryName}</h6>
                                <p class="card-text">${article.content.substring(0, 150)}...</p>
                                <a href="article.php?id=${article.id}" class="card-link">Leia mais</a>
                            </div>
                        `;
                        articlesList.appendChild(articleDiv);
                    }
                });

                if (data.currentPage >= data.totalPages) {
                    document.getElementById('load-more').style.display = 'none';
                }
            } else {
                console.error("Elemento 'articles-list' não encontrado.");
            }
        } else {
            alert('Erro ao carregar artigos.');
        }
    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
    }
}

async function loadArticlesForDashboard(page = 1) {
    try {
        const response = await fetch(`api/articles/load.php?page=${page}`);
        const data = await response.json();
        if (data.success) {
            const articlesTableBody = document.querySelector('#articles-table tbody');
            if (articlesTableBody) {
                articlesTableBody.innerHTML = '';
                data.articles.forEach(article => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${article.title}</td>
                        <td>${article.categoryName}</td>
                        <td>
                            <button class="btn btn-primary edit-article" data-id="${article.id}" data-title="${article.title}" data-content="${article.content}" data-category="${article.category}">Editar</button>
                            <button class="btn btn-danger delete-article" data-id="${article.id}">Excluir</button>
                        </td>
                    `;
                    articlesTableBody.appendChild(row);
                });

                const pagination = document.getElementById('articles-pagination');
                if (pagination) {
                    pagination.innerHTML = generatePagination(data.totalPages, data.currentPage);
                }
            } else {
                console.error("Elemento 'articles-table' não encontrado.");
            }
        } else {
            alert('Erro ao carregar artigos.');
        }
    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
    }
}

function generatePagination(totalPages, currentPage) {
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="page-link" data-page="${i}">${i}</button> `;
    }
    return paginationHTML;
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('page-link')) {
        const page = event.target.getAttribute('data-page');
        if (document.getElementById('articles-list')) {
            loadArticlesForIndex(page, 4);
        } else if (document.getElementById('articles-table')) {
            loadArticlesForDashboard(page);
        }
    }
});

async function loadCategoriesForSelect(selectId) {
    try {
        const response = await fetch('api/categories/load_all.php');
        const data = await response.json();
        if (data.success) {
            const categorySelect = document.getElementById(selectId);
            if (categorySelect) {
                categorySelect.innerHTML = '<option value="">Selecione uma categoria</option>'; // Adicionar um placeholder opcional
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            } else {
                console.error(`Elemento '${selectId}' não encontrado.`);
            }
        } else {
            alert('Erro ao carregar categorias: ' + data.message);
        }
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}
