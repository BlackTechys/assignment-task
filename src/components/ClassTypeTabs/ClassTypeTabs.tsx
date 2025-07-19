import React from "react";
import { Radio } from "antd";
import styles from "./ClassTypeTabs.module.css";

interface ClassTypeTabsProps {
  selectedClass: string;
  onClassChange: (classType: string) => void;
}

const tabOptions = [
  {
    value: "standard",
    title: "Standard and Plus",
    description: "Change with no fee / Refund for a fee",
  },
  {
    value: "premier",
    title: "Premier",
    description: "Flexible ticket with full refund available",
  },
];

/**
 * ClassTypeTabs displays radio buttons to select between travel class options.
 * Shows title and description for each class and triggers a callback on change.
 *
 * @param {ClassTypeTabsProps} props - Contains selected class and change handler
 * @returns {JSX.Element} Class type selection UI component
 */
const ClassTypeTabs: React.FC<ClassTypeTabsProps> = ({
  selectedClass,
  onClassChange,
}) => {
  return (
    <div>
      <Radio.Group
        onChange={(e) => onClassChange(e.target.value)}
        value={selectedClass}
        optionType="button"
        buttonStyle="solid"
        className={styles.radioGroup}
      >
        {tabOptions.map((tab) => (
          <Radio.Button
            key={tab.value}
            value={tab.value}
            className={`${styles.radioButton} ${
              selectedClass === tab.value ? styles.radioButtonSelected : ""
            }`}
          >
            <div className={styles.content}>
              <div className={styles.title}>{tab.title}</div>
              <div className={styles.description}>{tab.description}</div>
            </div>
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default ClassTypeTabs;
