function deleteCategory(categoryId) {
    if (confirm('Tem certeza de que deseja excluir esta categoria?')) {
        fetch(`api/categories/delete.php?id=${categoryId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Categoria excluída com sucesso!');
                loadCategoriesForDashboard(); // Atualiza a listagem de categorias
            } else {
                alert('Erro ao excluir categoria.');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir categoria:', error);
        });
    }
}
