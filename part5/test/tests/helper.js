const BASE_URL = 'http://localhost:3001/api';

const registerWith = async (request, username, password) => {
    await request.post(`${BASE_URL}/users`, {
        data: {
            username, password
        }
    });
}

const loginWith = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username);
    await page.getByRole('textbox').last().fill(password);
    await page.getByRole('button', {name: 'login'}).click();
}

module.exports = {
    registerWith,
    loginWith
}