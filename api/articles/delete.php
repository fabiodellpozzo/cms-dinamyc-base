<?php
header('Content-Type: application/json');

try {
    if (!empty($_POST['article_id'])) {
        $articlesFile = '../../data/articles.json';
        $articles = file_exists($articlesFile) ? json_decode(file_get_contents($articlesFile), true) : [];

        $articles = array_filter($articles, function($article) {
            return $article['id'] !== $_POST['article_id'];
        });

        file_put_contents($articlesFile, json_encode(array_values($articles)));
        echo json_encode(['success' => true]);
    } else {
        throw new Exception('ID do artigo não fornecido');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
