<form id="create-category-form">
    <div>
        <label for="category-name">Nome da Categoria:</label>
        <input type="text" id="category-name" name="name" required>
    </div>
    <button type="submit">Criar Categoria</button>
</form>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const createCategoryForm = document.getElementById('create-category-form');
    if (createCategoryForm) {
        createCategoryForm.addEventListener('submit', handleCreateCategory);
    }
});

function handleCreateCategory(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('api/categories/create.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Categoria criada com sucesso!');
            loadCategoriesTable(); // Atualiza a listagem de categorias
            event.target.reset(); // Limpa o formulário após a criação
        } else {
            alert('Erro ao criar categoria: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao criar categoria:', error);
    });
}
</script>
