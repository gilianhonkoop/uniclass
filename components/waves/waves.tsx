import styles from "./waves.module.css";

export default function Waves({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  return (
    <div className={`w-full h-fit ${backgroundColor}`}>
      <svg
        className={styles.waves}
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={styles.parralax}>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255, 148, 18, 0.3)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255, 148, 18, 0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255, 148, 18, 0.7)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="rgba(255, 148, 18, 1)"
          />
        </g>
      </svg>
    </div>
  );
}
