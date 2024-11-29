<?php
header('Content-Type: application/json');

$categoriesFile = '../../data/categories.json';
$categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

echo json_encode([
    'success' => true,
    'categories' => $categories
]);
?>
