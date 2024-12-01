import { useState } from "react";

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>
        has {votes} {votes === 1 ? "vote" : "votes"}
      </p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(
    Array.from({ length: anecdotes.length }).fill(0)
  );

  const getIndexOfMax = (arr) => {
    return arr.reduce(
      (maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex,
      0
    );
  };
  const getRandomAnecdoteIndex = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };
  const [selected, setSelected] = useState(getRandomAnecdoteIndex);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <button
          onClick={() =>
            setVotes([
              ...votes.slice(0, selected),
              votes[selected] + 1,
              ...votes.slice(selected + 1),
            ])
          }
        >
          vote
        </button>
        <button onClick={() => setSelected(getRandomAnecdoteIndex())}>
          next anecdote
        </button>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote
          text={anecdotes[getIndexOfMax(votes)]}
          votes={votes[getIndexOfMax(votes)]}
        />
      </div>
    </div>
  );
};

export default App;
