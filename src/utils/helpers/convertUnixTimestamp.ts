export const convertUnixTimestamp = (time: number) => {
  return new Date(time * 1000);
};
