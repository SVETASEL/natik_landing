// News detail page functionality
document.addEventListener("DOMContentLoaded", function () {
  // Only run on news detail page
  if (!document.getElementById("newsDetailTitle")) return;

  loadNewsDetail();
});

// Load news detail content
async function loadNewsDetail() {
  // Get article ID from URL parameters or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id') || localStorage.getItem('currentNewsId');
  
  console.log('Loading news detail for ID:', articleId);
  
  if (!articleId) {
    console.log('No article ID found, redirecting to news page');
    window.location.href = 'noticias.html';
    return;
  }
  
  try {
    // Get article data from API
    console.log('Fetching article from API...');
    const article = await getNewsById(parseInt(articleId));
    console.log('Article data received:', article);
    
    if (!article) {
      console.log('Article not found, redirecting to news page');
      window.location.href = 'noticias.html';
      return;
    }
    
    // Populate page content
    console.log('Populating news detail...');
    populateNewsDetail(article);
    
    // Load related news
    console.log('Loading related news...');
    await loadRelatedNews(articleId);
    
    // Setup share buttons
    console.log('Setting up share buttons...');
    setupShareButtons(article);
    
    console.log('News detail loaded successfully');
  } catch (error) {
    console.error('Error loading news detail:', error);
    alert('Error loading article: ' + error.message);
    // Don't redirect immediately, let user see the error
    // window.location.href = 'noticias.html';
  }
}

// Populate news detail content
function populateNewsDetail(article) {
  console.log('Populating article:', article);
  
  // Handle both API and legacy data formats
  const date = article.publishedAt || article.date;
  const image = article.imageUrl || article.image;
  const category = article.category?.name || article.category;

  console.log('Processed data:', { date, image, category });

  // Update page title
  document.title = `${article.title} - Natik`;
  const titleElement = document.getElementById("newsTitle");
  if (titleElement) titleElement.textContent = `${article.title} - Natik`;

  // Update article content
  const newsDateEl = document.getElementById("newsDate");
  const newsCategoryEl = document.getElementById("newsCategory");
  const newsDetailTitleEl = document.getElementById("newsDetailTitle");
  const newsContentEl = document.getElementById("newsContent");
  const featuredImageEl = document.getElementById("newsFeaturedImage");

  console.log('DOM elements found:', {
    newsDateEl: !!newsDateEl,
    newsCategoryEl: !!newsCategoryEl,
    newsDetailTitleEl: !!newsDetailTitleEl,
    newsContentEl: !!newsContentEl,
    featuredImageEl: !!featuredImageEl
  });

  if (newsDateEl) newsDateEl.textContent = formatDate(date);
  if (newsCategoryEl) newsCategoryEl.textContent = category;
  if (newsDetailTitleEl) newsDetailTitleEl.textContent = article.title;

  // Update featured image
  if (featuredImageEl) {
    featuredImageEl.src = image;
    featuredImageEl.alt = article.title;
  }

  // Update article content
  if (newsContentEl) {
    console.log('Setting content:', article.content);
    newsContentEl.innerHTML = article.content;
  } else {
    console.error('newsContent element not found!');
  }
}

// Load related news
async function loadRelatedNews(currentId) {
  try {
    const relatedNews = await getRelatedNews(currentId, 3);
    const relatedNewsContainer = document.getElementById("relatedNews");

    if (relatedNews.length === 0) {
      relatedNewsContainer.style.display = "none";
      return;
    }

    const relatedHTML = relatedNews
      .map((article) => createRelatedNewsCard(article))
      .join("");
    relatedNewsContainer.innerHTML = relatedHTML;
  } catch (error) {
    console.error('Error loading related news:', error);
    const relatedNewsContainer = document.getElementById("relatedNews");
    if (relatedNewsContainer) relatedNewsContainer.style.display = "none";
  }
}

// Create related news card
function createRelatedNewsCard(article) {
  // Handle both API and legacy data formats
  const date = article.publishedAt || article.date;
  const image = article.imageUrl || article.image;
  const formattedDate = formatDate(date);

  return `
    <article class="related-news-card" onclick="openNewsDetail(${article.id})">
      <div class="related-news-image">
        <img src="${image}" alt="${article.title}" class="related-news-img" />
      </div>
      <div class="related-news-content">
        <h4 class="related-news-title">${article.title}</h4>
        <span class="related-news-date">${formattedDate}</span>
      </div>
    </article>
  `;
}

// Setup share buttons
function setupShareButtons(article) {
  const currentUrl = window.location.href;
  const title = encodeURIComponent(article.title);
  const text = encodeURIComponent(article.excerpt);

  // Facebook share
  const facebookBtn = document.getElementById("shareFacebook");
  if (facebookBtn) {
    facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    facebookBtn.target = "_blank";
  }

  // Twitter share
  const twitterBtn = document.getElementById("shareTwitter");
  if (twitterBtn) {
    twitterBtn.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${title}`;
    twitterBtn.target = "_blank";
  }

  // LinkedIn share
  const linkedinBtn = document.getElementById("shareLinkedIn");
  if (linkedinBtn) {
    linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    linkedinBtn.target = "_blank";
  }

  // WhatsApp share
  const whatsappBtn = document.getElementById("shareWhatsApp");
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/?text=${title}%20${encodeURIComponent(
      currentUrl
    )}`;
    whatsappBtn.target = "_blank";
  }
}

// Helper functions (these should match the ones in news.js)
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
}

function openNewsDetail(articleId) {
  localStorage.setItem("currentNewsId", articleId);
  window.location.href = `news-detail.html?id=${articleId}`;
}

// Fetch article by ID from API
async function getNewsById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    
    // Fallback to legacy data if API fails
    if (typeof newsData !== "undefined") {
      return newsData.find((article) => article.id === parseInt(id));
    }
    
    return null;
  }
}

// Fetch related articles from API
async function getRelatedNews(currentId, limit = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${currentId}/related?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching related articles:', error);
    
    // Fallback to legacy data if API fails
    if (typeof newsData !== "undefined") {
      return newsData
        .filter((article) => article.id !== parseInt(currentId))
        .slice(0, limit);
    }
    
    return [];
  }
}
