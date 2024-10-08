import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timeStamp }: { timeStamp: string }) => {
  let timeAgo = "";
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date, { addSuffix: true });
    timeAgo = `${timePeriod}`;
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
};

export default TimeAgo;
