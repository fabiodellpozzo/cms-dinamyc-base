<?php
header('Content-Type: application/json');

$articlesFile = '../../data/articles.json';
$categoriesFile = '../../data/categories.json';

$articles = file_exists($articlesFile) ? json_decode(file_get_contents($articlesFile), true) : [];
$categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

foreach ($articles as &$article) {
    $category = array_filter($categories, function($cat) use ($article) {
        return $cat['id'] === $article['category'];
    });
    $article['categoryName'] = array_values($category)[0]['name'] ?? 'Sem Categoria';
    $article['popularity'] = rand(1, 100); // Adiciona um valor de popularidade para demonstração
}

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$articlesPerPage = isset($_GET['articlesPerPage']) ? (int)$_GET['articlesPerPage'] : 4;
$totalArticles = count($articles);
$totalPages = ceil($totalArticles / $articlesPerPage);
$startIndex = ($page - 1) * $articlesPerPage;
$paginatedArticles = array_slice($articles, $startIndex, $articlesPerPage);

echo json_encode([
    'success' => true,
    'articles' => $paginatedArticles,
    'totalPages' => $totalPages,
    'currentPage' => $page
]);
?>
