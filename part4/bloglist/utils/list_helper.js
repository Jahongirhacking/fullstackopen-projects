const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, current) => acc + current.likes, 0)
}

module.exports = {
    dummy,
    totalLikes
}