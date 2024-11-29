<?php include 'templates/header.php'; ?>

<div class="container mt-4">
    <?php
    if (isset($_GET['id'])) {
        $articleId = $_GET['id'];
        $articlesFile = 'data/articles.json';
        $categoriesFile = 'data/categories.json';

        $articles = file_exists($articlesFile) ? json_decode(file_get_contents($articlesFile), true) : [];
        $categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

        $article = array_filter($articles, function($art) use ($articleId) {
            return $art['id'] === $articleId;
        });

        if (!empty($article)) {
            $article = array_values($article)[0];
            $category = array_filter($categories, function($cat) use ($article) {
                return $cat['id'] === $article['category'];
            });
            $categoryName = array_values($category)[0]['name'] ?? 'Sem Categoria';
            ?>
            <h2><?php echo htmlspecialchars($article['title']); ?></h2>
            <h6 class="text-muted"><?php echo htmlspecialchars($categoryName); ?></h6>
            <p><?php echo nl2br(htmlspecialchars($article['content'])); ?></p>
            <?php
        } else {
            echo "<p>Artigo não encontrado.</p>";
        }
    } else {
        echo "<p>ID do artigo não fornecido.</p>";
    }
    ?>
</div>

<?php include 'templates/footer.php'; ?>
