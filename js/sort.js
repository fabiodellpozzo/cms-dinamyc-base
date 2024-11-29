document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', function() {
        const sortCriteria = sortSelect.value;
        sortArticles(sortCriteria);
    });
});

function sortArticles(criteria) {
    const articlesList = document.getElementById('articles-list');
    if (articlesList) {
        const articles = Array.from(articlesList.getElementsByClassName('card'));

        articles.sort((a, b) => {
            if (criteria === 'recent') {
                return new Date(b.dataset.created) - new Date(a.dataset.created);
            } else if (criteria === 'popular') {
                return b.dataset.popularity - a.dataset.popularity;
            } else if (criteria === 'title') {
                return a.querySelector('.card-title').textContent.localeCompare(b.querySelector('.card-title').textContent);
            }
        });

        articlesList.innerHTML = '';
        articles.forEach(article => {
            articlesList.appendChild(article);
        });
    }
}
