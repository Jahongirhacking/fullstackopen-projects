const BASE_URL = 'http://localhost:3001/api';

const registerWith = async (request, name, username, password) => {
    await request.post(`${BASE_URL}/users`, {
        data: {
            name, username, password
        }
    });
}

const loginWith = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username);
    await page.getByRole('textbox').last().fill(password);
    await page.getByRole('button', {name: 'login'}).click();
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', {name: /new blog/i}).click();
    await page.getByText(/title/i).getByRole('textbox').fill(title);
    await page.getByText(/author/i).getByRole('textbox').fill(author);
    await page.getByText(/url/i).getByRole('textbox').fill(url);
    await page.getByRole('button', {name: /create/i}).click();
    await page.getByText(new RegExp(`a new blog ${title} by ${author} added`, 'i')).waitFor();
}

module.exports = {
    registerWith,
    loginWith,
    createBlog,
}