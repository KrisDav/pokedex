import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPokemon } from '../api/fetchPokemon';
import PokeballImg from "../assets/pokeball.png";
import Footer from "../components/Footer";
import { PokemonDetails } from '../types/types';
import styles from "./pokemon.module.css"
import LoadingScreen from '../components/LoadingScreen';
import { waitFor } from '../utils/utils';

function Pokemon() {
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState<PokemonDetails>()
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect (() => {
        async function getPokemon() {
        setIsLoading(true);
        await waitFor(500);
        const fetchedPokemon = await fetchPokemon(name as string);
        setPokemon(fetchedPokemon); 
        setIsLoading(false);
        }
        getPokemon()
    }, [name])

    if (isLoading || !pokemon) return <LoadingScreen />
  
    return (
    console.log(pokemon),
    <div className={styles.bgWrap}>
        <img src="https://i.pinimg.com/736x/d6/7c/3c/d67c3cbce4d7e9355e8522e10434d76c.jpg" className={styles.bg}/>
        <div className={styles.bgContent} >
            <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
                <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />{" "} 
                Volver
            </button>
            <div className={styles.pokemon}>
                <main className={styles.pokemonInfo}>
                    <div className={styles.pokemonTitle}>
                        {pokemon?.name?.toUpperCase()}
                    </div>
                    <div>No. {pokemon?.id} </div>
                    <div>
                        <img
                            className={styles.pokemonInfoImg}
                            src={pokemon?.imgSrc}
                            alt={pokemon?.name}
                        />
                    </div>
                    <div>HP: {pokemon.hp} </div>
                    <div>Ataque: {pokemon.attack}</div>
                    <div>Defensa: {pokemon.defense}</div>
                    <div>Atq. Especial: {pokemon.special_attack}</div>
                    <div>Def. Especial: {pokemon.special_defense}</div>
                    <div>Velocidad: {pokemon.speed}</div>
                </main>
            </div>
            <Footer />
        </div>
    </div>
    );
};

    export default Pokemon; 