import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Win from "./Win";
import Lose from "./Lose";
import { winLoseContext } from "./context";

export default function Board() {
    const [characters, setCharacters] = useState([]);
    const [memories, setMemories] = useState([]);
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [lose, setLose] = useState(false);
    const [flip, setFlip] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardContainerRef = useRef(null);
    const names = [
        "shenhe",
        "tighnari",
        "xiangling",
        "xiao",
        "yelan",
        "raiden",
        "nahida",
        "mona",
        "hu-tao",
        "keqing",
        "furina",
        "chiori",
    ];

    useEffect(() => {
        const fetchImages = async () => {
            const characterData = await Promise.all(
                names.map(async (name) => {
                    const response = await fetch(
                        `https://genshin.jmp.blue/characters/${name}/card?lang=en`
                    );
                    // 獲取 Blob 格式的圖片數據
                    const blob = await response.blob();
                    // 創建 URL 來表示圖片
                    const url = URL.createObjectURL(blob);
                    return { name, url };
                })
            );
            setCharacters(characterData);
        };
        fetchImages();
    }, []);

    const shuffleCharacters = () => {
        setCharacters((prevCharacters) => {
            const shuffled = [...prevCharacters];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
    };

    const handleClick = (e) => {
        const clickedTarget = e.currentTarget.id;
        setFlip(true);
        if (memories.includes(clickedTarget)) {
            setLose(true);
        } else {
            setMemories((prevMemories) => [...prevMemories, clickedTarget]);
            shuffleCharacters();
            setTimeout(() => {
                setFlip(false);
            }, 1000);
            if (score + 1 > highestScore) {
                setHighestScore((prevHigh) => (prevHigh += 1));
            }
            setScore((prevScore) => (prevScore += 1));
        }
    };
    const retryHandler = () => {
        setMemories([]);
        setScore(0);
        setLose(false);
        shuffleCharacters();
        setTimeout(() => {
            setFlip(false);
        }, 1000);
    };

    return (
        <>
            <header>
                <h1>Genshin Memory Card</h1>
                <div>Highest Score {highestScore}</div>

                <div>Score {score}</div>
            </header>
            <winLoseContext.Provider value={{ lose, retryHandler }}>
                <div
                    className={`card-container ${
                        score < 12 && !lose ? "grid" : ""
                    }`}
                    ref={cardContainerRef}
                >
                    {score < 12 &&
                        !lose &&
                        characters.map((character, index) => (
                            <Card
                                key={index}
                                character={character}
                                onClick={handleClick}
                                flipped={flip}
                                isHovered={character.name === hoveredCard}
                                onMouseEnter={(name) => setHoveredCard(name)}
                                onMouseLeave={() => setHoveredCard(null)}
                            />
                        ))}
                    {score == 12 && <Win />}
                    {lose && <Lose />}
                </div>
            </winLoseContext.Provider>

            <footer>A Fan-made Genshin Impact Memory Card Game</footer>
        </>
    );
}
