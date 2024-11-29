document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            searchArticles(query);
        });
    }
});

function searchArticles(query) {
    const articlesList = document.getElementById('articles-list');
    if (articlesList) {
        const articles = articlesList.getElementsByClassName('card');
        for (const article of articles) {
            const title = article.querySelector('.card-title').textContent.toLowerCase();
            const category = article.querySelector('.card-subtitle').textContent.toLowerCase();
            if (title.includes(query) || category.includes(query)) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        }
    }
}
