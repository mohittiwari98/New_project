import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

export const formatDateTime = (date) => {
  if (!date) return '-';
  return dayjs(date).format('MMM DD, YYYY HH:mm');
};

export const formatTime = (date) => {
  if (!date) return '-';
  return dayjs(date).format('HH:mm');
};

export const timeAgo = (date) => {
  if (!date) return '-';
  return dayjs(date).fromNow();
};

export const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isYesterday = (date) => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
};

export const formatRelativeDate = (date) => {
  if (!date) return '-';
  if (isToday(date)) return `Today at ${formatTime(date)}`;
  if (isYesterday(date)) return `Yesterday at ${formatTime(date)}`;
  return formatDateTime(date);
};

