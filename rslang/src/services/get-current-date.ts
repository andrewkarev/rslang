const getCurrentDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return String(date.getTime());
}

export default getCurrentDate;
