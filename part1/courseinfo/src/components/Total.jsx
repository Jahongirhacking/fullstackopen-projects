const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((acc, curr) => acc + curr.exercises, 0)}
    </p>
  );
};

export default Total;
