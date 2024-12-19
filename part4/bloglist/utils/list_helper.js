const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, current) => acc + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(!blogs.length) return null;
    let favorite = blogs[0];
    for(let blog of blogs) {
        if(blog.likes > favorite.likes) {
            favorite = blog;
        }
    }
    return favorite;
}

const mostBlogs = (blogs) => {
    const authors = new Map();
    if(!blogs.length) return null;
    // create author -> blogs
    for(const blog of blogs) {
        if(authors.has(blog.author)) {
            authors.set(blog.author, authors.get(blog.author)+1);
        } else {
            authors.set(blog.author, 1);
        }
    }
    return Array.from(authors.keys())
        .map(author => ({author, blogs: authors.get(author)}))
        .sort((a, b) => b.blogs - a.blogs)[0];
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}