<?php
header('Content-Type: application/json');

try {
    if (!empty($_POST['category_id']) && !empty($_POST['new_name'])) {
        $categoriesFile = '../../data/categories.json';
        $categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

        foreach ($categories as &$category) {
            if ($category['id'] === $_POST['category_id']) {
                $category['name'] = $_POST['new_name'];
                break;
            }
        }

        file_put_contents($categoriesFile, json_encode($categories));
        echo json_encode(['success' => true]);
    } else {
        throw new Exception('Dados inválidos');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
