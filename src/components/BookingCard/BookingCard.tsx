import React, { useState } from "react";
import {
  Card,
  Button,
  DatePicker,
  Radio,
  Checkbox,
  Space,
  Input,
  Popover,
} from "antd";
import { ArrowUpDown, Plus, Gift, ChevronRight } from "lucide-react";
import type { Moment } from "moment";
import styles from "./BookingCard.module.css";
import PassengersPopover from "../PassengersPopover/PassengersPopover";
import { getPassengerSummary } from "../../utils/common";

interface BookingCardProps {
  tripType: string;
  from: string;
  to: string;
  outDate: Moment | null;
  passengers: {
    adult: number;
    youth: number;
    senior: number;
  };
  onTripTypeChange: (value: string) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onDateChange: (date: Moment | null) => void;
  onSwapLocations: () => void;
  onSearch: () => void;
  onPassengersChange: (passengers: {
    adult: number;
    youth: number;
    senior: number;
  }) => void;
}

/**
 * BookingCard displays a trip booking form with fields for locations, date,
 * trip type, passengers, and search functionality.
 * Handles user input and emits changes via callback props.
 *
 * @param {BookingCardProps} props - Props for booking form
 * @returns {JSX.Element} Booking Card UI component
 */
const BookingCard: React.FC<BookingCardProps> = ({
  tripType,
  from,
  to,
  outDate,
  passengers,
  onTripTypeChange,
  onFromChange,
  onToChange,
  onDateChange,
  onSwapLocations,
  onSearch,
  onPassengersChange,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <Card className={styles.card} bodyStyle={{ padding: "24px" }}>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div className={styles.locationContainer}>
          <div className={styles.locationInputWrapper}>
            <div className={styles.locationInputContainer}>
              <div className={styles.locationLabel}>From</div>
              <Input
                value={from}
                onChange={(e) => onFromChange(e.target.value)}
                className={styles.locationInput}
              />
            </div>

            <Button
              type="text"
              onClick={onSwapLocations}
              className={styles.swapButton}
            >
              <ArrowUpDown size={16} />
            </Button>

            <div
              // className={styles.locationInputContainer}
              className={`${styles.locationInputContainer} ${styles.noBottomLine}`}
              style={{ borderBottom: "none" }}
            >
              <div className={styles.locationLabel}>To</div>
              <Input
                value={to}
                onChange={(e) => onToChange(e.target.value)}
                className={styles.locationInput}
              />
            </div>
          </div>
        </div>

        <Button type="link" className={styles.viaButton}>
          <Plus size={24} />
          Via
        </Button>

        <div className={styles.tripTypeContainer}>
          <Radio.Group
            value={tripType}
            onChange={(e) => onTripTypeChange(e.target.value)}
            className={styles.radioGroup}
          >
            <Radio.Button
              value="one-way"
              className={`${styles.radioButtonOneWay} ${
                tripType === "one-way"
                  ? styles.radioButtonActive
                  : styles.radioButtonInactive
              }`}
            >
              One-way
            </Radio.Button>
            <Radio.Button
              value="return"
              className={`${styles.radioButtonReturn} ${
                tripType === "return"
                  ? styles.radioButtonActive
                  : styles.radioButtonInactive
              }`}
            >
              Return
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className={styles.dateContainer}>
          <div className={styles.passengersContent}>
            <span className={styles.dateLabel}>Out</span>
            <DatePicker
              value={outDate}
              onChange={onDateChange}
              format="ddd D MMM • HH:mm A"
              showTime={{ format: "HH:mm A" }}
              className={styles.datePicker}
              placeholder="Select date and time"
            />
          </div>
        </div>

        <Popover
          content={
            <PassengersPopover
              passengers={passengers}
              onPassengersChange={onPassengersChange}
              onClose={() => setPopoverVisible(false)}
            />
          }
          title={null}
          trigger="click"
          open={popoverVisible}
          onOpenChange={setPopoverVisible}
          placement="right"
          overlayStyle={{ width: 350 }}
        >
          <div
            className={styles.passengersContainer}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.passengersContent}>
              <div className={styles.passengersInfo}>
                <div>
                  <Gift size={20} color="#64748b" />
                </div>
                <div>
                  <div className={styles.passengersText}>
                    {getPassengerSummary(passengers) || "Select passengers"}
                  </div>
                  <div className={styles.railcardText}>Add railcards</div>
                </div>
              </div>
              <ChevronRight size={16} color="#64748b" />
            </div>
          </div>
        </Popover>
        <Button type="link" className={styles.voucherButton}>
          <Plus size={24} />
          Add a voucher code
        </Button>

        <div className={styles.accommodationContainer}>
          <div className={styles.accommodationCheckbox}>
            <Checkbox defaultChecked className={styles.checkbox} />
            <span className={styles.accommodationLabel}>
              Open places to stay
            </span>
          </div>
          <div className={styles.bookingBadge}>
            Booking.com
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14l5-5 5 5z" />
            </svg>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className={styles.searchButton}
          onClick={onSearch}
        >
          Get cheapest tickets
        </Button>
      </Space>
    </Card>
  );
};

export default BookingCard;
