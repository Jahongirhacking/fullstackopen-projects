import { render, screen } from '@testing-library/react';
import BlogCreator from './BlogCreator.jsx';
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

describe('<BlogCreator />', () => {
  let mockSubmitFunc;
  let container;
  const user = userEvent.setup();

  beforeEach(() => {
    mockSubmitFunc = vi.fn();
    container = render(<BlogCreator handleSubmit={mockSubmitFunc} />).container;
  });

  test('renders correctly and submits', async () => {
    const titleInput = screen.getByPlaceholderText('title');
    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');
    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);
    const createButton = screen.getByRole('button', { name: /create/i });
    await user.click(createButton);
    const data = mockSubmitFunc.mock.calls[0][0];
    expect(
      data.title === blog.title && data.author === blog.author && data.url === blog.url,
    ).toBeTruthy();
  });
});
