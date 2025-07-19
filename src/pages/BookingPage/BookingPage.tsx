import React, { useState } from "react";
import { Row, Col } from "antd";
import BookingCard from "../../components/BookingCard/BookingCard";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import styles from "./BookingPage.module.css";
import type { Passengers } from "../../types/common";

/**
 * BookingPage displays the booking form and promotional banner.
 * Allows users to select trip type, locations, date, and passengers, then navigate to ticket search.
 *
 * @returns {JSX.Element} Booking page with form and promotional content
 */
const BookingPage: React.FC = () => {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("London");
  const [to, setTo] = useState("Paris");
  const [outDate, setOutDate] = useState<moment.Moment | null>(null);
  const navigate = useNavigate();

  // const { setTravelDetails, passengers, setPassengers } = useStore();
  const { setTravelDetails, passengers } = useStore();

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handlePassengersChange = (newPassengers: Passengers) => {
    setTravelDetails({ passengers: newPassengers });
  };

  const handleSearch = () => {
    setTravelDetails({
      from,
      to,
      date: outDate,
      tripType: tripType as "one-way" | "return",
      passengers,
    });
    navigate("/tickets");
  };

  return (
    <Row
      // gutter={60}
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 0px" }}
    >
      <Col xs={24} lg={10}>
        <BookingCard
          tripType={tripType}
          from={from}
          to={to}
          outDate={outDate}
          passengers={passengers}
          onTripTypeChange={setTripType}
          onFromChange={setFrom}
          onToChange={setTo}
          onDateChange={setOutDate}
          onSwapLocations={handleSwapLocations}
          onSearch={handleSearch}
          // onPassengersChange={setPassengers}
          onPassengersChange={handlePassengersChange}
        />
      </Col>
      <Col xs={24} lg={14}>
        <div className={styles.promo}>
          <div className={styles.promoContent}>
            <h1 className={styles.promoTitle}>
              Save 46% when you book our top 3 European routes at least 30 days
              in advance*!
            </h1>
            <p className={styles.promoSubtitle}>
              Discover Europe with great savings and easy booking
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BookingPage;
