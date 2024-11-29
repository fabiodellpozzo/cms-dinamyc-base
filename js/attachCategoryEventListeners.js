document.addEventListener('DOMContentLoaded', function() {
    attachCategoryEventListeners();
});

function attachCategoryEventListeners() {
    document.querySelectorAll('.rename-category').forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-id');
            const categoryName = this.getAttribute('data-name');
            const renameCategoryForm = document.getElementById('rename-category-form');
            if (renameCategoryForm) {
                renameCategoryForm.elements['category_id'].value = categoryId;
                renameCategoryForm.elements['new_name'].value = categoryName;
                const renameCategoryCard = document.getElementById('rename-category-card');
                if (renameCategoryCard) {
                    renameCategoryCard.style.display = 'block';
                    renameCategoryCard.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error("Elemento 'rename-category-card' não encontrado.");
                }
            } else {
                console.error("Elemento 'rename-category-form' não encontrado.");
            }
        });
    });

    document.querySelectorAll('.delete-category').forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-id');
            deleteCategory(categoryId);
        });
    });

    const renameCategoryForm = document.getElementById('rename-category-form');
    if (renameCategoryForm) {
        renameCategoryForm.addEventListener('submit', handleRenameCategory);
    }
}

function handleRenameCategory(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('api/categories/rename.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Categoria renomeada com sucesso!');
            loadCategoriesTable();
            loadCategoriesForSelect('category');
            document.getElementById('rename-category-card').style.display = 'none'; // Ocultar o formulário após a renomeação
        } else {
            alert('Erro ao renomear categoria: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao renomear categoria:', error);
    });
}

function deleteCategory(categoryId) {
    const formData = new FormData();
    formData.append('category_id', categoryId);

    submitFormData('api/categories/delete.php', formData)
        .then(data => {
            if (data.success) {
                alert('Categoria excluída com sucesso!');
                loadCategoriesTable();
                loadCategoriesForSelect('category');
            } else {
                alert('Erro ao excluir categoria.');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir categoria:', error);
        });
}
