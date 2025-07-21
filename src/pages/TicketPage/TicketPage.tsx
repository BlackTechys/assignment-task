import React, { useEffect, useState } from "react";
import { Button, Row, Col, Typography, Space, Spin, DatePicker } from "antd";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import useStore from "../../store/useStore";
import moment from "moment";
import OutboundCard from "../../components/OutboundCard/OutboundCard";
import TrainList from "../../components/TrainList/TrainList";
import DateNavigation from "../../components/DateNavigation/DateNavigation";
import TransportTypeToggle from "../../components/TransportTypeToggle/TransportTypeToggle";
import ClassTypeTabs from "../../components/ClassTypeTabs/ClassTypeTabs";
import styles from "./TicketPage.module.css";
import { getPassengerSummary } from "../../utils/common";

const { Text } = Typography;

interface ApiTrain {
  from_time: string;
  plus_price: number;
  id: string;
  to_time: string;
  standard_price: number;
}

interface ApiResponse {
  trains: ApiTrain[];
  message: string;
  count: number;
  data: ApiTrain[];
}

export interface Train {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  changes: number;
  standardPrice: number;
  plusPrice: number;
  originalPrice?: number;
  isRecommended?: boolean;
  isCheapest?: boolean;
}

/**
 * TicketPage displays available trains based on selected travel details.
 * It allows users to search, view, and select outbound train tickets,
 * navigate dates, toggle transport type, and change travel class.
 *
 * @returns {JSX.Element} Ticket selection interface
 */
const TicketPage: React.FC = () => {
  const { from, to, date, setTravelDetails, setSelectedTrain, passengers } =
    useStore();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedClass, setSelectedClass] = useState("standard");
  const [transportType, setTransportType] = useState("train");

  const fetchTrains = async (inputDate?: moment.Moment) => {
    const dateToUse = inputDate || date;
    const nativeDate =
      dateToUse instanceof Date ? dateToUse : dateToUse?.toDate();
    const formattedDate = moment
      .utc(nativeDate)
      .utcOffset(330)
      .format("YYYY-MM-DD");

    try {
      setLoading(true);
      const response = await fetch(
        `https://kajd8li6b8.execute-api.ap-northeast-1.amazonaws.com/default/GetAvailableTicket?from=${from}&to=${to}&date=${formattedDate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiTrains: ApiResponse = await response.json();

      console.log("apitrains", apiTrains);

      const transformedTrains = apiTrains.data.map((apiTrain) => {
        const departureMoment = moment(apiTrain.from_time);
        const arrivalMoment = moment(apiTrain.to_time);
        const durationMs = arrivalMoment.diff(departureMoment);
        const duration = moment.duration(durationMs);
        const durationString = `${duration.hours()}h ${duration.minutes()}m`;

        return {
          id: apiTrain.id,
          departureTime: departureMoment.format("HH:mm"),
          arrivalTime: arrivalMoment.format("HH:mm"),
          duration: durationString,
          changes: 0,
          standardPrice: apiTrain.standard_price,
          plusPrice: apiTrain.plus_price,
          isRecommended: false,
          isCheapest: false,
        };
      });

      if (transformedTrains.length > 0) {
        const cheapestPrice = Math.min(
          ...transformedTrains.map((t) => t.standardPrice)
        );
        transformedTrains.forEach((train) => {
          train.isCheapest = train.standardPrice === cheapestPrice;
          train.isRecommended = train.standardPrice === cheapestPrice;
        });

        // Set the cheapest train as the default selected train
        const cheapestTrain = transformedTrains.find(
          (train) => train.isCheapest
        );
        if (cheapestTrain) {
          setSelectedTrain(cheapestTrain);
        }
      } else {
        setSelectedTrain(null);
      }

      setTrains(transformedTrains);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleTrainSelect = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelDetails({ from: e.target.value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelDetails({ to: e.target.value });
  };

  const handleDateChange = (newDate: moment.Moment) => {
    setTravelDetails({ date: newDate });
  };

  const handleSwapLocations = () => {
    const temp = from;

    setTravelDetails({ from: to, to: temp });
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Text type="danger">Error loading train data: {error}</Text>
      </div>
    );
  }

  const handleSearch = () => {
    fetchTrains();
  };
  const handleDateChanges = (newDate: moment.Moment) => {
    setTravelDetails({ date: newDate });
    fetchTrains(newDate);
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              value={from}
              onChange={handleFromChange}
              className={styles.searchInput}
            />
            <div className={styles.arrowContainer}>
              <ArrowRight
                size={20}
                style={{ color: "#3B47FF" }}
                onClick={handleSwapLocations}
              />
            </div>
            <input
              type="text"
              value={to}
              onChange={handleToChange}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.dateContainer}>
            <div className={styles.dateLabel}>Out</div>
            <DatePicker
              value={date}
              onChange={handleDateChange}
              format="ddd D MMM • h:mm A"
              showTime={{ format: "HH:mm A" }}
              placeholder="Select date and time"
              bordered={false}
              className={styles.datePicker}
              suffixIcon={null}
            />
          </div>

          <div className={styles.returnContainer}>
            <div className={styles.returnCardLink}>+ Add a return</div>
          </div>

          <div className={styles.passengerContainer}>
            <div className={styles.passengerSummary}>
              {getPassengerSummary(passengers)}
            </div>
            <div className={styles.railcardLink}>Add railcards</div>
          </div>

          <div className={styles.searchIconContainer} onClick={handleSearch}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              data-test="icon-magnifying-glass"
            >
              <path
                fill="var(--dp_app_text_disabled)"
                d="M15.9772,8.9889 C15.9772,5.12895528 12.8486858,1.9999 8.9892,1.9999 C5.12925532,1.9999 1.9992,5.12941416 1.9992,8.9889 C1.9992,12.8483858 5.12925532,15.9779 8.9892,15.9779 C12.8486858,15.9779 15.9772,12.8488447 15.9772,8.9889 Z M16.0127748,14.5984612 L21.6791068,20.2647932 C22.0696311,20.6553175 22.0696311,21.2884825 21.6791068,21.6790068 C21.2885825,22.0695311 20.6554175,22.0695311 20.2648932,21.6790068 L14.5986989,16.0128125 C13.061215,17.2425666 11.1111061,17.9779 8.9892,17.9779 C4.02476322,17.9779 -0.0008,13.9530328 -0.0008,8.9889 C-0.0008,4.02476724 4.02476322,-0.0001 8.9892,-0.0001 C13.9533327,-0.0001 17.9772,4.02446319 17.9772,8.9889 C17.9772,11.1107256 17.2421395,13.0608597 16.0127748,14.5984612 Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Transport Type and Date Navigation */}
        <div className={styles.navigationContainer}>
          <TransportTypeToggle
            transportType={transportType}
            onTransportTypeChange={setTransportType}
          />
          <DateNavigation date={date!} onDateChange={handleDateChanges} />
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={24}>
            {/* Left Column - Tickets */}
            <Col flex="557px">
              <Space direction="vertical" size={16} style={{ width: "557px" }}>
                <ClassTypeTabs
                  selectedClass={selectedClass}
                  onClassChange={setSelectedClass}
                />

                {/* Earlier Button */}
                <div>
                  <Button
                    className={styles.earlierButton}
                    onClick={handleSearch}
                  >
                    <ChevronDown
                      style={{ transform: "rotate(180deg)" }}
                      size={16}
                    />
                    Earlier
                  </Button>
                </div>

                <TrainList
                  trains={trains}
                  selectedClass={selectedClass}
                  onTrainSelect={handleTrainSelect}
                  date={date!}
                />

                {/* Later Button */}
                <div>
                  <Button className={styles.laterButton} onClick={handleSearch}>
                    <ChevronUp
                      style={{ transform: "rotate(180deg)" }}
                      size={16}
                    />
                    Later
                  </Button>
                </div>
              </Space>
            </Col>

            <Col flex="auto">
              <OutboundCard />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default TicketPage;
