import PropTypes from "prop-types";

export default function Loading({ progress }) {
    return (
        <div className="loading">
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            Loading...
        </div>
    );
}

Loading.propTypes = {
    progress: PropTypes.number.isRequired,
};
