// 'https://jsonplaceholder.typicode.com/posts?_limit=3&_page=1';

const postsContainer = document.getElementById('posts-container');
const loader  = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await response.json();

    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEL = document.createElement('div');
        postEL.classList.add('post');

        postEL.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
        `;
        postsContainer.appendChild(postEL);
    })
}

// Show loader
function loadMorePosts() {
    loader.classList.add('show');

    setTimeout(() => {
        setTimeout(() => {
            page++;
            showPosts();
            loader.classList.remove('show');
        }, 300);
    }, 1000);
}

// Filter posts
function filterPosts({ target }) {
    const term = target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}

// Show initial posts
showPosts();


// Scroll event listener 
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if(scrollTop + clientHeight >= scrollHeight - 5){
        loadMorePosts()
    };

})

// Input event listener
filter.addEventListener('input', e => filterPosts(e))