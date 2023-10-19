export function formatName(taskName, taskDuration) {
  const allowedNumOfCharactersValues = {
    1: 13,
    2: 30,
    3: 75,
  };

  const allowedNumOfCharacters = allowedNumOfCharactersValues[taskDuration];
  const nameToDisplay =
    taskName.length > allowedNumOfCharacters
      ? `${taskName.slice(0, allowedNumOfCharacters)}...`
      : taskName;
  return nameToDisplay;
}
