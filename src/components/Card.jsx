import PropTypes from "prop-types";

function Card({
    character,
    onClick,
    flipped,
    isHovered,
    onMouseEnter,
    onMouseLeave,
}) {
    const name =
        character.name.charAt(0).toUpperCase() + character.name.slice(1);
    return (
        <div
            className={`card ${flipped ? "flipped" : ""} ${
                isHovered ? "hovered" : ""
            }`}
            id={character.name}
            onClick={onClick}
            onMouseEnter={() => onMouseEnter(character.name)}
            onMouseLeave={onMouseLeave}
        >
            <div className="card-inner">
                <div className="card-front">
                    <img src={character.url} alt={character.name} />
                    <p>{name}</p>
                </div>
                <div className="card-back">
                    <img src="/assets/cardback.png" alt="Card Back" />
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    flipped: PropTypes.bool.isRequired,
    isHovered: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
};

export default Card;
