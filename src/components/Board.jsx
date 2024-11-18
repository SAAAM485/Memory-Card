import { useState, useEffect } from "react";
import Card from "./Card";

export default function Board() {
    const [characters, setCharacters] = useState([]);
    const [memories, setMemories] = useState([]);
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
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
        console.log(clickedTarget);

        if (memories.includes(clickedTarget)) {
            setMemories([]);
            setScore(0);
        } else {
            setMemories((prevMemories) => [...prevMemories, clickedTarget]);
            shuffleCharacters();
            if (score + 1 > highestScore) {
                setHighestScore((prevHigh) => (prevHigh += 1));
            }
            setScore((prevScore) => (prevScore += 1));
        }
    };

    return (
        <>
            <header>
                <h1>Genshin Memory Card</h1>
                <div>Highest Score {highestScore}</div>
                {highestScore >= 12 && <div>You win</div>}
                <div>Score {score}</div>
            </header>
            <div className="card-container">
                {characters.map((character, index) => (
                    <Card
                        key={index}
                        character={character}
                        onClick={handleClick}
                    />
                ))}
            </div>
            <footer>A Fan-made Genshin Impact Memory Card Game</footer>
        </>
    );
}
