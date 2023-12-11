"use client";
import styles from "./holidayCard.module.css";
import { useRouter } from "next/navigation";

export default function HolidayCard({ imageUrl, title, name }) {
  const router = useRouter();

  return (
    <div
      className={styles.main}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={() => router.push(`/holiday-places/slug01`)}
    >
      <div className={styles.container}>
        <h2>{title}</h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
}