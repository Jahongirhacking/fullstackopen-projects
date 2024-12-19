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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}