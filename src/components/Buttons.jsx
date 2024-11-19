import { useContext } from "react";
import { winLoseContext } from "./context";

export default function Buttons() {
    const { lose, retryHandler } = useContext(winLoseContext);

    return lose ? (
        <button className="retry-btn" onClick={retryHandler}>
            Retry
        </button>
    ) : (
        <button className="continue-btn" onClick={retryHandler}>
            Continue
        </button>
    );
}
