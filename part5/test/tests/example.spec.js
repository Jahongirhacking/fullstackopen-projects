// @ts-check
const {test, expect, describe, beforeEach} = require('@playwright/test');
const {registerWith, loginWith} = require("./helper");
const {request} = require("node:http");
const BASE_URL = 'http://localhost:3001/api';

describe('Blogs', () => {
    beforeEach(async ({page, request}) => {
        await request.post(`${BASE_URL}/test/reset`);
        await registerWith(request, 'Jahongirhacking', 'joxa1805');
        await page.goto('http://localhost:5173');
    })

    test('Login form is shown', async ({page}) => {
        await expect(page.getByText(/log in to application/i)).toBeVisible();
    })

    describe('Login', () => {
        test('fails with wrong credentials', async ({page}) => {
            await loginWith(page, 'Jahongirhacking', 'wrong');
            await expect(page.getByText(/username or password is incorrect/i)).toBeVisible();
        })

        test('succeeds with correct credentials', async ({page}) => {
            await loginWith(page, 'Jahongirhacking', 'joxa1805');
            await expect(page.getByText(/jahongirhacking logged in/i)).toBeVisible();
        })
    })
})