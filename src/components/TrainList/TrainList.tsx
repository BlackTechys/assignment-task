// components/TrainList.tsx
import React from "react";
import { Card, Typography } from "antd";
import { type Train } from "../../pages/TicketPage/TicketPage";
import TrainCard from "../TrainCard/TrainCard";
import moment from "moment";
import styles from "./TrainList.module.css";

const { Text } = Typography;

interface TrainListProps {
  trains: Train[];
  selectedClass: string;
  onTrainSelect: (train: Train) => void;
  date: moment.Moment;
}
/**
 * TrainList displays a list of train cards for the selected travel date.
 * Shows headers for Standard and Plus prices and triggers a callback on train selection.
 *
 * @param {TrainListProps} props - Contains trains data, selected date, and selection handler
 * @returns {JSX.Element} Train list UI component
 */
const TrainList: React.FC<TrainListProps> = ({
  trains,
  onTrainSelect,
  date,
}) => {
  return (
    <Card className={styles.card} bodyStyle={{ padding: 0 }}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <svg
            fill="#757575"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            style={{ flexShrink: 0 }}
          >
            <path d="M2,8 L18,8 L18,20 L2,20 L2,8 Z M13.9798254,0 L13.9798254,2 L6,2 L6,0 L3,0 L3,2 L2.00104344,2 C0.895897664,2 1.04665405e-13,2.89821238 9.79822387e-14,3.99079514 L-7.88860905e-31,20.0092049 C-6.72539167e-15,21.1086907 0.898212381,22 1.99079514,22 L18.0092049,22 C19.1086907,22 20,21.1017876 20,20.0092049 L20,3.99079514 C20,2.89130934 19.1090599,2 17.9997971,2 L16.9760131,2 L17,0 L13.9798254,0 Z M10,18 L16,18 L16,12 L10,12 L10,18 Z" />
          </svg>

          <Text strong className={styles.headerText}>
            {date?.isValid?.()
              ? moment(date.toDate()).format("ddd, MMM D, YYYY")
              : moment().format("ddd, MMM D, YYYY")}
          </Text>
        </div>

        <div></div>
        <div className={styles.standardColumn}>Standard</div>
        <div className={styles.plusColumn}>Plus</div>
      </div>

      {/* Train List */}
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} onSelect={onTrainSelect} />
      ))}
    </Card>
  );
};

export default TrainList;
