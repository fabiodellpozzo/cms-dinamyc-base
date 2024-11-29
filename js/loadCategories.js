document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('categories-table')) {
        loadCategoriesForTable(); // Carregar categorias na tabela do dashboard
    }

    // Carregar categorias para o select no formulário de criação de artigos
    loadCategoriesForSelect('category');
});

function loadCategoriesForTable(page = 1) {
    fetch(`api/categories/load.php?page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const categoriesTableBody = document.querySelector('#categories-table tbody');
                const pagination = document.getElementById('categories-pagination');
                if (categoriesTableBody) {
                    categoriesTableBody.innerHTML = '';
                    data.categories.forEach(category => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${category.name}</td>
                            <td>${category.created_at}</td>
                            <td>
                                <button class="btn btn-primary rename-category" data-id="${category.id}" data-name="${category.name}">Renomear</button>
                                <button class="btn btn-danger delete-category" data-id="${category.id}">Excluir</button>
                            </td>
                        `;
                        categoriesTableBody.appendChild(row);
                    });
                    attachCategoryEventListeners(); // Re-anexar event listeners
                } else {
                    console.error("Elemento 'categories-table' não encontrado.");
                }
                if (pagination) {
                    pagination.innerHTML = generateCategoryPagination(data.totalPages, data.currentPage);
                }
            } else {
                alert('Erro ao carregar categorias.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
}

function generateCategoryPagination(totalPages, currentPage) {
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="page-link category-page-link" data-page="${i}">${i}</button> `;
    }
    return paginationHTML;
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('category-page-link')) {
        const page = event.target.getAttribute('data-page');
        loadCategoriesForTable(page);
    }
});

function loadCategoriesForSelect(selectId) {
    fetch('api/categories/load_all.php')
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
}

