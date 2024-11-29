<?php
header('Content-Type: application/json');
$data = $_POST;
if ($data) {
    $categoriesFile = '../../data/categories.json';
    $categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

    $categories = array_filter($categories, function($category) use ($data) {
        return $category['id'] != $data['category_id'];
    });

    file_put_contents($categoriesFile, json_encode($categories));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
}
?>
