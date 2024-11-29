<?php
header('Content-Type: application/json');

try {
    if (!empty($_POST['title']) && !empty($_POST['content']) && !empty($_POST['category'])) {
        $articlesFile = '../../data/articles.json';
        $articles = file_exists($articlesFile) ? json_decode(file_get_contents($articlesFile), true) : [];

        $newArticle = [
            'id' => uniqid(),
            'title' => $_POST['title'],
            'content' => $_POST['content'],
            'category' => $_POST['category'],
            'created_at' => date('Y-m-d H:i:s')
        ];

        $articles[] = $newArticle;
        file_put_contents($articlesFile, json_encode($articles));
        echo json_encode(['success' => true, 'article' => $newArticle]);
    } else {
        throw new Exception('Dados inválidos');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
