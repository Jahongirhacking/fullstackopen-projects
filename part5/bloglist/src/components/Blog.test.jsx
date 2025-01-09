import Blog from './Blog.jsx';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const blog = {
  id: '1',
  author: 'Ozoda',
  title: 'Blog Title',
  likes: 5,
  url: 'https://www.linkedin.com/in/joda/',
  user: {
    username: 'joda',
    id: '1',
  },
};

describe('<Blog />', () => {
  let container;
  let mockLikeFunc;
  let mockRemoveFunc;
  const user = userEvent.setup();

  beforeEach(() => {
    mockLikeFunc = vi.fn();
    mockRemoveFunc = vi.fn();
    container = render(
      <Blog blog={blog} handleLike={mockLikeFunc} handleRemove={mockRemoveFunc} />,
    ).container;
  });

  test('renders title and author and not likes', async () => {
    const element1 = await screen.findByText(new RegExp(blog.title, 'i'));
    const element2 = await screen.findByText(new RegExp(blog.author, 'i'));
    const element3 = screen.queryByText(blog.likes);
    expect(element1 && element2 && !element3).toBeTruthy();
  });

  test('renders view button and click it to see details', async () => {
    const buttons = screen.getAllByRole('button');
    const button = buttons.find((button) => button.textContent === 'view');
    expect(button).toBeDefined();
    // click, change button hide
    await user.click(button);
    expect(button).toHaveTextContent('hide');
    //   likes and url
    const element1 = await screen.findByText(new RegExp(blog.url, 'i'));
    const element2 = await screen.findByText(new RegExp(`likes ${blog.likes}`, 'i'));
    expect(element1 && element2).toBeTruthy();
  });

  test('if like button clicked twice', async () => {
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons.find((button) => button.textContent === 'view');
    expect(toggleButton).toBeDefined();
    // click, change button hide
    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent('hide');
    // click like twice
    const newButtons = screen.getAllByRole('button');
    const likeButton = newButtons.find((button) => button.textContent === 'like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockLikeFunc.mock.calls.length).toStrictEqual(2);
  });
});
