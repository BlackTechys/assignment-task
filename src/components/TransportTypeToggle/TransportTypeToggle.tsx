// components/TransportTypeToggle.tsx
import React from "react";
import styles from "./TransportTypeToggle.module.css";

interface TransportTypeToggleProps {
  transportType: string;
  onTransportTypeChange: (type: string) => void;
}

const transportOptions = [
  { label: "Train • $343.86", value: "train" },
  { label: "Bus • $70.98", value: "bus" },
];

const TransportTypeToggle: React.FC<TransportTypeToggleProps> = ({
  transportType,
  onTransportTypeChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.toggleWrapper}>
        {transportOptions.map((option, index) => {
          const isActive = transportType === option.value;
          const className =
            isActive && index === 0
              ? styles.activeLeft
              : isActive && index === transportOptions.length - 1
              ? styles.activeRight
              : styles.toggleOption;

          return (
            <div
              key={option.value}
              className={`${styles.toggleOption} ${className}`}
              onClick={() => onTransportTypeChange(option.value)}
            >
              {option.label}
            </div>
          );
        })}
      </div>

      <div className={styles.rightSection}>
        <svg viewBox="0 0 24 25" width="24px" height="25px">
          <path d="M15.5 2.5a.5.5 0 0 1 .5.5v1h2.5A2.5 2.5 0 0 1 21 6.5v12a2.5 2.5 0 0 1-2.5 2.5h-12A2.5 2.5 0 0 1 4 18.5v-12A2.5 2.5 0 0 1 6.5 4H9V3a.5.5 0 0 1 1 0v1h5V3a.5.5 0 0 1 .5-.5zM20 9H5v9.5A1.5 1.5 0 0 0 6.5 20h12a1.5 1.5 0 0 0 1.5-1.5V9zM9 5H6.5A1.5 1.5 0 0 0 5 6.5V8h15V6.5A1.5 1.5 0 0 0 18.5 5H16v1a.5.5 0 1 1-1 0V5h-5v1a.5.5 0 0 1-1 0V5z"></path>
        </svg>
        <span className={styles.priceText}>Other days from $278.30</span>
      </div>
    </div>
  );
};

export default TransportTypeToggle;
