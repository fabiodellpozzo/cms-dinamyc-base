<?php include 'templates/header.php'; ?>

<div class="container mt-4">
    <h2>Gerenciar Artigos e Categorias</h2>

    <!-- Formulário para criar novo artigo -->
    <?php include 'templates/create_article_form.php'; ?>

    <!-- Formulário para editar artigo -->
    <?php include 'templates/edit_article_form.php'; ?>

    <!-- Área de Gerenciamento de Categorias -->
    <div class="mt-4">
        <h3>Criar, Editar e Excluir Categorias</h3>

        <!-- Formulário para criar nova categoria -->
        <?php include 'templates/create_category_form.php'; ?>

        <!-- Formulário para renomear categoria -->
        <?php include 'templates/rename_category_form.php'; ?>

        <!-- Listagem de Categorias -->
        <div class="table-responsive mt-4">
            <table id="categories-table" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data de Criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Categorias serão carregadas dinamicamente -->
                </tbody>
            </table>
        </div>
        <nav id="categories-pagination" class="mt-3">
            <!-- Paginação será gerada dinamicamente -->
        </nav>
    </div>

    <!-- Listagem de Artigos -->
    <div class="mt-4">
        <h3>Artigos Existentes</h3>
        <div class="table-responsive">
            <table id="articles-table" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Artigos serão carregados dinamicamente -->
                </tbody>
            </table>
        </div>
        <nav id="articles-pagination" class="mt-3">
            <!-- Paginação será gerada dinamicamente -->
        </nav>
    </div>
</div>

<script src="js/loadExistingArticles.js"></script>
<script src="js/loadCategories.js"></script>
<?php include 'templates/footer.php'; ?>
