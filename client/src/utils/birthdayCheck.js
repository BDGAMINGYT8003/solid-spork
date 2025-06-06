import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

export const isTodayMarziasBirthdayInBangladesh = () => {
  const now = new Date();
  const timeZone = 'Asia/Dhaka'; // Bangladesh Standard Time (BST)

  // Convert current time to BST
  const nowInBST = utcToZonedTime(now, timeZone);

  // Format to get month and day in BST
  const month = format(nowInBST, 'M', { timeZone }); // 'M' for numeric month (1-12)
  const day = format(nowInBST, 'd', { timeZone });   // 'd' for numeric day (1-31)

  // Check if it's March 3rd
  // Month is '3' for March, Day is '3'
  return month === '3' && day === '3';

  // For testing purposes, you can uncomment the line below to always simulate birthday
  // return true;
};
