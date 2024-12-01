import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <p>No feedback is given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={all} />
            <StatisticLine
              text={"average"}
              value={good - bad === 0 ? 0 : (good - bad) / all}
            />
            <StatisticLine
              text={"positive"}
              value={`${(good / all) * 100} %`}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
