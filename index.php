<?php include 'templates/header.php'; ?>

<div class="container mt-4">
    <h2>Artigos Recentes</h2>

    <!-- Barra de Busca -->
    <div class="mb-4">
        <input type="text" id="search-input" class="form-control" placeholder="Buscar artigos">
    </div>

    <!-- Dropdown para selecionar critério de classificação -->
    <div class="mb-4">
        <label for="sort-select" class="form-label">Classificar por:</label>
        <select id="sort-select" class="form-select">
            <option value="recent">Mais Recentes</option>
            <option value="popular">Mais Populares</option>
            <option value="title">Título</option>
        </select>
    </div>

    <div id="articles-list">
        <!-- Artigos serão carregados dinamicamente -->
    </div>
    <div id="load-more-container" class="mt-3">
        <button id="load-more" class="btn btn-primary">Carregar mais</button>
    </div>
</div>

<script src="js/loadExistingArticles.js"></script>
<script src="js/search.js"></script>
<script src="js/sort.js"></script>

<?php include 'templates/footer.php'; ?>
