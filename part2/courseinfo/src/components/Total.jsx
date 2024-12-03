const Total = ({ parts }) => {
  return (
    <b>
      total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
    </b>
  );
};

export default Total;
