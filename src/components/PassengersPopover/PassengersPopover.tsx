import React from "react";
import { Button, Divider } from "antd";
import styles from "./PassengersPopover.module.css";

interface PassengersPopoverProps {
  passengers: {
    adult: number;
    youth: number;
    senior: number;
  };
  onPassengersChange: (passengers: {
    adult: number;
    youth: number;
    senior: number;
  }) => void;
  onClose: () => void;
}

/**
 * PassengersPopover displays a form to select the number of adult, youth, and senior passengers.
 * Allows users to adjust counts and trigger change or close actions.
 *
 * @param {PassengersPopoverProps} props - Component props including passenger data, change handler, and close handler.
 * @returns {JSX.Element} Passenger selection UI popover.
 */
const PassengersPopover: React.FC<PassengersPopoverProps> = ({
  passengers,
  onPassengersChange,
  onClose,
}) => {
  const handlePassengerChange = (
    type: "adult" | "youth" | "senior",
    value: number
  ) => {
    onPassengersChange({
      ...passengers,
      [type]: Math.max(0, value),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.passengerSection}>
        <h4 className={styles.title}>Passengers</h4>
        <div className={styles.passengerRow}>
          <div>
            <div className={styles.passengerLabel}>Adult (26 to 59)</div>
            <div className={styles.passengerSubtext}>
              Add loyalty and railcards
            </div>
          </div>
          <div className={styles.counterControls}>
            <Button
              shape="circle"
              size="small"
              onClick={() =>
                handlePassengerChange("adult", passengers.adult - 1)
              }
              disabled={passengers.adult <= 0}
            >
              -
            </Button>
            <span className={styles.counterValue}>{passengers.adult}</span>
            <Button
              shape="circle"
              size="small"
              onClick={() =>
                handlePassengerChange("adult", passengers.adult + 1)
              }
            >
              +
            </Button>
          </div>
        </div>

        <div className={styles.passengerRow}>
          <div>
            <div className={styles.passengerLabel}>Youth (0 to 25)</div>
            <div className={styles.passengerSubtext}>
              Add loyalty and railcards
            </div>
          </div>
          <div className={styles.counterControls}>
            <Button
              shape="circle"
              size="small"
              onClick={() =>
                handlePassengerChange("youth", passengers.youth - 1)
              }
              disabled={passengers.youth <= 0}
            >
              -
            </Button>
            <span className={styles.counterValue}>{passengers.youth}</span>
            <Button
              shape="circle"
              size="small"
              onClick={() =>
                handlePassengerChange("youth", passengers.youth + 1)
              }
            >
              +
            </Button>
          </div>
        </div>

        <div className={styles.passengerRow}>
          <div>
            <div className={styles.passengerLabel}>Senior (60+)</div>
            <div className={styles.passengerSubtext}>
              Add loyalty and railcards
            </div>
          </div>
          <div className={styles.counterControls}>
            <Button
              shape="circle"
              size="small"
              onClick={() =>
                handlePassengerChange("senior", passengers.senior - 1)
              }
              disabled={passengers.senior <= 0}
            >
              -
            </Button>
            <span className={styles.counterValue}>{passengers.senior}</span>
            <Button
              shape="circle"
              size="small"
              onClick={() =>
                handlePassengerChange("senior", passengers.senior + 1)
              }
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.footer}>
        <Button
          type="text"
          onClick={() => {
            onPassengersChange({ adult: 1, youth: 0, senior: 0 });
          }}
        >
          Reset
        </Button>
        <Button type="primary" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default PassengersPopover;
