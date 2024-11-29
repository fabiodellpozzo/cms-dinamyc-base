<div class="card mb-4" style="display: none;" id="edit-article-card">
    <div class="card-header">
        Editar Artigo
    </div>
    <div class="card-body">
        <form id="edit-article-form">
            <input type="hidden" id="article_id" name="article_id">
            <div class="mb-3">
                <label for="title" class="form-label">Título:</label>
                <input type="text" class="form-control" id="title" name="title" required>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Conteúdo:</label>
                <textarea class="form-control" id="content" name="content" required></textarea>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Categoria:</label>
                <select class="form-control" id="category" name="category" required>
                    <!-- As categorias serão carregadas dinamicamente -->
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Salvar Alterações</button>
        </form>
    </div>
</div>
