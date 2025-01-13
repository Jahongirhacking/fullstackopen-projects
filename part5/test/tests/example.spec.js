// @ts-check
const {test, expect, describe, beforeEach} = require('@playwright/test');
const {registerWith, loginWith, createBlog} = require("./helper");
const BASE_URL = 'http://localhost:3001/api';

describe('Blogs', () => {
    beforeEach(async ({page, request}) => {
        await request.post(`${BASE_URL}/test/reset`);
        await registerWith(request, 'Jahongir Hayitov', 'Jahongirhacking', 'joxa1805');
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

        describe('When logged in', () => {
            beforeEach(async ({page}) => {
                await loginWith(page, 'Jahongirhacking', 'joxa1805');
            })

            test('a new blog can be created', async ({page}) => {
                await createBlog(page, 'Hello world', 'Ozoda', 'https://hello.world');
                await expect(page.getByTestId('blog').getByText('Hello World')).toBeVisible();
            })

            describe('Blog', () => {
                beforeEach(async ({page}) => {
                    await createBlog(page, 'Hello world', 'Ozoda', 'https://hello.world');
                })

                test('a blog can be liked', async ({page}) => {
                    const blog = await page.getByTestId('blog').getByText('Hello World');
                    await blog.getByRole('button', {name: /view/i}).click();
                    await blog.locator('..').getByRole('button', {name: /like/i}).click();
                    await expect(blog.locator('..').getByText(/likes 1/i)).toBeVisible();
                })
            })
        })
    })
})