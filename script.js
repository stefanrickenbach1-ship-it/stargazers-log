const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

const formatNumber = (number) => new Intl.NumberFormat("en", { notation: "compact" }).format(number);

const formatDate = (date) => new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
}).format(new Date(date));

const createRepositoryCard = (repository, index) => {
  const article = document.createElement("article");
  article.className = "repository-card";
  article.style.animationDelay = `${index * 70}ms`;

  article.innerHTML = `
    <div>
      <h3><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.full_name}</a></h3>
      <p class="repository-description">${repository.description}</p>
      <div class="repository-meta">
        <span class="language">${repository.language}</span>
        <span>${formatNumber(repository.forks)} forks</span>
        <span>Starred ${formatDate(repository.starred_at)}</span>
      </div>
    </div>
    <span class="star-mark" aria-label="${formatNumber(repository.stars)} stars">&#9733; ${formatNumber(repository.stars)}</span>
  `;

  return article;
};


const renderRepositories = (repositories) => {
  repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
  repositoryCount.textContent = `${repositories.length} repositories`;
};

const showError = () => {
  repositoryList.innerHTML = '<p class="status-message">Repositories could not be loaded right now.</p>';
};

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(showError);
