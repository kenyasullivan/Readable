export const sortByScore = (a, b) => {
  if (a.voteScore > b.voteScore) return -1;
  if (a.voteScore < b.voteScore) return 1;
  return 0;
};

export const sortByDate = (a, b) => {
  if (a.timestamp > b.timestamp) return -1;
  if (a.timestamp < b.timestamp) return 1;
  return 0;
};
