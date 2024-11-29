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
    .then(response => response.text()) // Use text() para depurar
    .then(text => {
        console.log('Resposta do servidor:', text); // Log da resposta
        try {
            const data = JSON.parse(text); // Converte a resposta para JSON
            if (data.success) {
                alert('Categoria criada com sucesso!');
                loadCategoriesForSelect('category'); // Atualiza o select de categorias
                loadCategoriesTable(); // Atualiza a tabela de categorias
            } else {
                alert('Erro ao criar categoria: ' + data.message);
            }
        } catch (e) {
            console.error('Erro ao processar JSON:', e);
            alert('Erro ao criar categoria: Resposta do servidor não é um JSON válido.');
        }
    })
    .catch(error => {
        console.error('Erro ao criar categoria:', error);
    });
}
