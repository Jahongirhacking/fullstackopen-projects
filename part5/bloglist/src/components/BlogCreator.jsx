import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogCreator = ({ handleSubmit }) => {
  const [formObj, setFormObj] = useState({});

  const handleSubmitAndClear = (e) => {
    e.preventDefault();
    handleSubmit(formObj);
    setFormObj({});
  };

  return (
    <div style={{ width: 'fit-content', marginBottom: '2rem' }}>
      <form
        onSubmit={handleSubmitAndClear}
        style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}
      >
        {['title', 'author', 'url'].map((key) => (
          <label key={key}>
            {key}:
            <input
              value={formObj[key] ?? ''}
              onChange={(e) => setFormObj({ ...formObj, [key]: e.target.value })}
              placeholder={key}
            />
          </label>
        ))}
        <button type={'submit'}>create</button>
      </form>
    </div>
  );
};

BlogCreator.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default BlogCreator;
