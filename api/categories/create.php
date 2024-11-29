<?php
header('Content-Type: application/json');

try {
    if (!empty($_POST['name'])) {
        $categoriesFile = '../../data/categories.json';
        $categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

        $newCategory = [
            'id' => uniqid(),
            'name' => $_POST['name'],
            'created_at' => date('Y-m-d H:i:s')
        ];

        $categories[] = $newCategory;
        file_put_contents($categoriesFile, json_encode($categories));
        echo json_encode(['success' => true, 'category' => $newCategory]);
    } else {
        throw new Exception('Nome da categoria inválido');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
