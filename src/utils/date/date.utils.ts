import * as dayjs from 'dayjs';

export const addDaysToActualDate = (daysToAdd) => {
  return dayjs().add(daysToAdd, 'day').format('YYYY-MM-DD');
};

export const getActualDay = () => {
  return dayjs().format('YYYY-MM-DD');
};
