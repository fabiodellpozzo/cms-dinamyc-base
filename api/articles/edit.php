<?php
header('Content-Type: application/json');

try {
    if (!empty($_POST['article_id']) && !empty($_POST['title']) && !empty($_POST['content']) && !empty($_POST['category'])) {
        $articlesFile = '../../data/articles.json';
        $articles = file_exists($articlesFile) ? json_decode(file_get_contents($articlesFile), true) : [];

        foreach ($articles as &$article) {
            if ($article['id'] === $_POST['article_id']) {
                $article['title'] = $_POST['title'];
                $article['content'] = $_POST['content'];
                $article['category'] = $_POST['category'];
                break;
            }
        }

        file_put_contents($articlesFile, json_encode($articles));
        echo json_encode(['success' => true]);
    } else {
        throw new Exception('Dados inválidos');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
