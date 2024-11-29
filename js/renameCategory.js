document.addEventListener('DOMContentLoaded', function() {
    attachRenameCategoryListeners();
});

function attachRenameCategoryListeners() {
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
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const renameCategoryForm = document.getElementById('rename-category-form');
    if (renameCategoryForm) {
        renameCategoryForm.addEventListener('submit', handleRenameCategory);
    }
});

function handleRenameCategory(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    submitFormData('api/categories/rename.php', formData)
        .then(data => {
            if (data.success) {
                alert('Categoria renomeada com sucesso!');
                loadCategories();
                const renameCategoryCard = document.getElementById('rename-category-card');
                if (renameCategoryCard) {
                    renameCategoryCard.style.display = 'none';
                }
            } else {
                alert('Erro ao renomear categoria.');
            }
        })
        .catch(error => {
            console.error('Erro ao renomear categoria:', error);
        });
}
