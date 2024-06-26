import { Link } from "react-router-dom"
import styles from "./footer.module.css";

//Assets
import PokemonPic from '../assets/pikachu.png';
import ItemPic from '../assets/pokeball.png';
import LocationPic from '../assets/pointer.png';

function Footer() {
  return ( 
  <footer className={styles.footer}>
     <Link className={styles.footerLink} to="/pokemons">
     <img className={styles.footerIcon} src={PokemonPic} alt="Pokeball" />
     Pokemones
     </Link>
     <Link className={styles.footerLink} to="/items">
     <img className={styles.footerIcon} src={ItemPic} alt="Pokeball" />
     Objetos
     </Link> 
     <Link className={styles.footerLink} to="/mapa">
     <img className={styles.footerIcon} src={LocationPic} alt="Pokeball" />
     Mapa
    </Link>
    </footer>
  );
};

export default Footer;