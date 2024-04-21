import './styles.css';

interface ISpinner {
  size?: string;
}

function Spinner({ size = '20' }: ISpinner) {
  return (
    <div className="h-full flex items-center justify-center">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r={size}
          fill="none"
          strokeWidth="3"
        ></circle>
      </svg>
    </div>
  );
}

export default Spinner;
