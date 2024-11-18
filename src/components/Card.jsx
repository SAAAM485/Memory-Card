export default function Card({ character, onClick }) {
    const name =
        character.name.charAt(0).toUpperCase() + character.name.slice(1);
    return (
        <div className="card" id={`${character.name}`} onClick={onClick}>
            <div className="card-content">
                <img src={`${character.url}`} alt={`${name}`} />
                <h1>{`${name}`}</h1>
            </div>
        </div>
    );
}
