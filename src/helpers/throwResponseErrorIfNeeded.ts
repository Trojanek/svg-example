const throwResponseErrorIfNeeded = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export default throwResponseErrorIfNeeded;
