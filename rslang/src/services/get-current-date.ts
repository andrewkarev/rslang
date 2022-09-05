const getCurrentDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return String(date.getTime());
}

export const formatDate = (timestamp: number) => {
  const date = new Date(Number(timestamp));
  const day = '0' + date.getDate();
  const month = "0" + (date.getMonth() + 1);
  const year = date.getFullYear();

  const formattedDate = `${day.slice(-2) }.${month.slice(-2)}.${year}`;
  return formattedDate;
}

export default getCurrentDate;
