<?php
header('Content-Type: application/json');

$categoriesFile = '../../data/categories.json';
$categories = file_exists($categoriesFile) ? json_decode(file_get_contents($categoriesFile), true) : [];

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$categoriesPerPage = 4;
$totalCategories = count($categories);
$totalPages = ceil($totalCategories / $categoriesPerPage);
$startIndex = ($page - 1) * $categoriesPerPage;
$paginatedCategories = array_slice($categories, $startIndex, $categoriesPerPage);

echo json_encode([
    'success' => true,
    'categories' => $paginatedCategories,
    'totalPages' => $totalPages,
    'currentPage' => $page
]);
?>
