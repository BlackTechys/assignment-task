import React from "react";
import { Button } from "antd";
import moment from "moment";
import styles from "./DateNavigation.module.css";

interface DateNavigationProps {
  date: moment.Moment;
  onDateChange: (newDate: moment.Moment) => void;
}

/**
 * DateNavigation displays a 7-day horizontal date selector with prices.
 * Highlights the selected date and notifies changes via callback.
 *
 * @param {DateNavigationProps} props - Selected date and handler for date change
 * @returns {JSX.Element} Date navigation UI component
 */
const DateNavigation: React.FC<DateNavigationProps> = ({
  date,
  onDateChange,
}) => {
  const getNextSevenDays = () => {
    const startDate = date?.isValid?.() ? moment(date.toDate()) : moment();

    return Array.from({ length: 7 }, (_, index) => {
      const currentDate = startDate.clone().add(index, "days");
      const isActive = date
        ? currentDate.isSame(moment(date.toDate()), "day")
        : index === 0;

      return {
        day: currentDate.format("ddd, MMM D"),
        price:
          index === 0 ? "$343.86" : `$${(Math.random() * 80 + 270).toFixed(2)}`,
        active: isActive,
        fullDate: currentDate,
      };
    });
  };

  const dateList = getNextSevenDays();

  return (
    <div className={styles.container}>
      {dateList.map((dateItem, index) => (
        <Button
          key={index}
          type="text"
          onClick={() => onDateChange(dateItem.fullDate)}
          className={`${styles.dateButton} ${
            dateItem.active ? styles.dateButtonActive : ""
          }`}
        >
          <span className={styles.dayText}>{dateItem.day}</span>
          <span className={styles.priceContainer}>
            from <span className={styles.priceText}>{dateItem.price}</span>
          </span>
        </Button>
      ))}
    </div>
  );
};

export default DateNavigation;
