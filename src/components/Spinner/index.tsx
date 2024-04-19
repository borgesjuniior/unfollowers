import './styles.css';

interface IPropsSpinner {
  styles?: string;
}

function Spinner({ styles }: IPropsSpinner) {
  return (
    <svg className={`spinner ${styles}`} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="6"
      ></circle>
    </svg>
  );
}

export default Spinner;