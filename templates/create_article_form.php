<form id="create-article-form">
    <div>
        <label for="title">Título:</label>
        <input type="text" id="title" name="title" required>
    </div>
    <div>
        <label for="content">Conteúdo:</label>
        <textarea id="content" name="content" required></textarea>
    </div>
    <div>
        <label for="category">Categoria:</label>
        <select id="category" name="category" required>
            <!-- As categorias serão carregadas dinamicamente -->
        </select>
    </div>
    <button type="submit">Criar Artigo</button>
</form>
