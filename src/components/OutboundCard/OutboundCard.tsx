import React from "react";
import { Card, Button, Typography, Divider } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import useStore from "../../store/useStore";
import styles from "./OutboundCard.module.css";
import { getPassengerSummary, totalPassengers } from "../../utils/common";

const { Text } = Typography;

/**
 * OutboundCard displays selected outbound journey details,
 * passenger info, pricing, and ticket conditions.
 *
 * @returns {JSX.Element} A detailed summary card of the outbound train journey.
 */
const OutboundCard: React.FC = () => {
  const { selectedTrain, from, to, passengers } = useStore();

  return (
    <Card className={styles.card} bodyStyle={{ padding: 0 }}>
      {/* Top Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.headerTitle}>Outbound</div>
          <div className={styles.headerPrice}>
            ${selectedTrain?.standardPrice || "0.00"}
          </div>
          {selectedTrain?.isCheapest && (
            <div className={styles.cheapestTag}>Cheapest</div>
          )}
          <div className={styles.passengerCount}>
            {getPassengerSummary(passengers)}
          </div>
        </div>
        <Button type="primary" size="large" className={styles.continueButton}>
          <div className={styles.continueText}>Continue</div>
          <div className={styles.nextStepText}>to next step</div>
          <RightOutlined className={styles.upIcon} />
        </Button>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Journey */}
        {selectedTrain && (
          <div className={styles.journeyContainer}>
            <Text strong className={styles.journeyTitle}>
              Selected journey
            </Text>

            <div className={styles.journeyCard}>
              {/* Timeline Column */}
              <div className={styles.timelineColumn}>
                {/* Train Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  data-test="IconTrainType3"
                >
                  <path
                    fill="var(--dp_brand_neutral_dim)"
                    fillRule="evenodd"
                    d="M21.23 3c1.537 0 2.926.92 3.53 2.338l.296.692A24.318 24.318 0 0 1 26.074 22.2a3.845 3.845 0 0 1-3.46 2.792l1.28 2.56a1 1 0 0 1-1.788.894L20.382 25h-8.765l-1.723 3.447a1 1 0 0 1-1.788-.894l1.28-2.56a3.843 3.843 0 0 1-3.46-2.792A24.306 24.306 0 0 1 6.945 6.028l.294-.69A3.84 3.84 0 0 1 10.77 3h10.46zm2.311 4.62l-.04.196c-.98 4.723-3.904 8.184-7.5 8.184-3.648 0-6.602-3.557-7.542-8.38a22.305 22.305 0 0 0-.609 14.035A1.842 1.842 0 0 0 9.62 23H22.38c.82 0 1.542-.548 1.77-1.346a22.319 22.319 0 0 0-.61-14.034zM11.5 18.375a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zm9 0a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zM21.23 5H10.77c-.21 0-.413.036-.605.103l-.007-.144C10.368 10.097 13.023 14 16 14c2.948 0 5.583-3.83 5.835-8.895A1.808 1.808 0 0 0 21.23 5z"
                  />
                </svg>

                {/* Vertical line */}
                <div className={styles.verticalLine} />

                {/* Dot */}
                <div className={styles.dot} />
              </div>

              {/* Journey Info */}
              <div className={styles.journeyInfo}>
                <Text strong className={styles.departureInfo}>
                  {selectedTrain.departureTime} {from}
                </Text>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text type="secondary" className={styles.durationInfo}>
                    {selectedTrain.duration} • {selectedTrain.changes} changes
                  </Text>
                </div>

                <Text strong className={styles.arrivalInfo}>
                  {selectedTrain.arrivalTime} {to}
                </Text>
              </div>

              {/* Down arrow */}
              <DownOutlined className={styles.downIcon} />
            </div>
          </div>
        )}

        {/* Ticket Conditions */}
        <div>
          <Text strong className={styles.ticketTitle}>
            Ticket Conditions
          </Text>

          <div className={styles.ticketCard}>
            <div className={styles.ticketRow}>
              <span className={styles.ticketLabel}>
                {totalPassengers(passengers)} x adult
              </span>
              <span className={styles.ticketPrice}>
                ${selectedTrain?.standardPrice || "0.00"}
              </span>
            </div>

            <div className={styles.ticketType}>
              <span>Eurostar Standard</span>
            </div>
            <Divider />

            <div style={{ marginBottom: "16px" }}>
              <div className={styles.conditionRow}>
                <span className={styles.conditionIcon}>
                  <svg
                    role="img"
                    id="RefundDollar"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="24px"
                    width="24px"
                  >
                    <title>RefundDollar</title>
                    <desc>RefundDollar</desc>
                    <path d="M12.531 5.77941C12.8235 5.48616 12.8235 5.01141 12.531 4.71891L12.3173 4.50516C16.7265 4.67166 20.2507 8.29941 20.2507 12.7492C20.2507 17.3054 16.557 20.9992 12.0007 20.9992C7.4445 20.9992 3.75075 17.3054 3.75075 12.7492C3.75075 9.94866 5.0385 7.37241 7.16175 5.88291C7.50075 5.64516 7.5825 5.17716 7.34475 4.83816C7.107 4.49916 6.639 4.41741 6.3 4.65516C3.76875 6.43116 2.25 9.46866 2.25 12.7499C2.25 18.1342 6.61575 22.4999 12 22.4999C17.3843 22.4999 21.75 18.1342 21.75 12.7499C21.75 7.46766 17.5485 3.16641 12.306 3.00441L12.5302 2.78016C12.8228 2.48691 12.8228 2.01216 12.5302 1.71966C12.2378 1.42716 11.7622 1.42641 11.4697 1.71966L9.96975 3.21966C9.67725 3.51291 9.67725 3.98766 9.96975 4.28016L11.4697 5.78016C11.7622 6.07341 12.2378 6.07341 12.5302 5.78016L12.531 5.77941Z"></path>
                    <path d="M9 15.0953C9.05499 16.7132 10.205 17.5498 12.0031 17.5498C13.8562 17.5498 15 16.5168 15 14.8089C15 13.4845 14.4721 12.7326 12.9379 12.3611L12.1241 12.1573C11.2663 11.9536 10.5016 11.6156 10.5016 11.0044C10.5016 10.3572 11.2168 10.1862 12.0031 10.1862C12.7785 10.1862 13.4442 10.2912 13.5047 11.0044H15C14.9505 9.45827 13.6638 8.5498 12.0031 8.5498C10.2875 8.5498 9 9.39236 9 11.0044C9 12.2868 10.0675 13.2959 11.5027 13.6495L12.3275 13.8592C13.2459 14.0809 13.5047 14.3853 13.5047 14.9725C13.5047 15.6737 12.8609 15.9134 12.0031 15.9134C11.1013 15.9134 10.573 15.8443 10.5016 15.0953H9Z"></path>
                    <path d="M11.25 7.7998C11.25 7.38559 11.5858 7.0498 12 7.0498C12.4142 7.0498 12.75 7.38559 12.75 7.7998V8.6248H11.25V7.7998Z"></path>
                    <path d="M12.75 18.2998C12.75 18.714 12.4142 19.0498 12 19.0498C11.5858 19.0498 11.25 18.714 11.25 18.2998L11.25 17.4748L12.75 17.4748L12.75 18.2998Z"></path>
                    <path d="M9 15.1498C9 14.8184 9.26863 14.5498 9.6 14.5498H9.9C10.2314 14.5498 10.5 14.8184 10.5 15.1498H9Z"></path>
                    <path d="M15 10.9498C15 11.2812 14.7314 11.5498 14.4 11.5498L14.1 11.5498C13.7686 11.5498 13.5 11.2812 13.5 10.9498L15 10.9498Z"></path>
                  </svg>
                </span>
                <span className={styles.conditionText}>
                  Refundable up to 7 days pre-departure for €25/£25/$40
                </span>
              </div>

              <div className={styles.conditionRow}>
                <span className={styles.conditionIcon}>
                  <svg
                    role="img"
                    id="Refresh"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="24px"
                    width="24px"
                  >
                    <title>Refresh</title>
                    <desc>Refresh</desc>
                    <path d="M20.5643 10.6942C20.082 6.36523 16.4108 2.99998 11.9535 2.99998C8.9505 2.99998 6.2145 4.54498 4.6335 7.04473C4.41225 7.39498 3.94875 7.49923 3.5985 7.27798C3.24825 7.05673 3.144 6.59323 3.36525 6.24298C5.21775 3.31423 8.42926 1.50073 11.9528 1.50073C17.271 1.50073 21.6345 5.58448 22.08 10.7872L22.626 10.2412C22.9185 9.94873 23.394 9.94873 23.6865 10.2412C23.979 10.5337 23.979 11.0092 23.6865 11.3017L21.8978 13.0905C21.6053 13.383 21.1298 13.383 20.8373 13.0905L19.0485 11.3017C18.756 11.0092 18.756 10.5337 19.0485 10.2412C19.341 9.94873 19.8165 9.94873 20.109 10.2412L20.5635 10.6957L20.5643 10.6942Z"></path>
                    <path d="M3.7965 13.0889L3.342 12.6344C3.82425 16.9634 7.4955 20.3287 11.9527 20.3287C14.9557 20.3287 17.6917 18.7837 19.2727 16.2839C19.494 15.9337 19.9575 15.8294 20.3077 16.0507C20.658 16.2719 20.7622 16.7354 20.541 17.0857C18.6885 20.0144 15.477 21.8279 11.9535 21.8279C6.63525 21.8279 2.27175 17.7442 1.82625 12.5414L1.28025 13.0874C0.986998 13.3799 0.512248 13.3799 0.219748 13.0874C-0.0727521 12.7949 -0.0735021 12.3194 0.219748 12.0269L2.0085 10.2382C2.30175 9.94567 2.7765 9.94567 3.069 10.2382L4.85775 12.0269C5.151 12.3194 5.151 12.7949 4.85775 13.0874C4.5645 13.3799 4.08975 13.3799 3.79725 13.0874L3.7965 13.0889Z"></path>
                  </svg>
                </span>
                <span className={styles.conditionText}>
                  Exchange with no fee up to 1 hour pre-departure
                </span>
              </div>
            </div>

            <span className={styles.viewConditions}>
              View full ticket conditions
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OutboundCard;
