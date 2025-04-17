import React from 'react'
import styles from './Hero.module.css';
import Logotipo from '../../assets/images/Logo.png'
import Mujer from '../../assets/images/Mujer.png'
import Productos from '../../assets/images/Productos.png'

interface HeroProps {
    myRef: React.Ref<HTMLDivElement | null>
  }
  
const Hero = (({myRef} : HeroProps) => {
    return(<>
        <main className={styles.heroContainer}>
            <div className={styles.heroGrid}>
                <div className={styles.heroInfo}>
                    <div className={styles.heroInfoLogotipo}>
                        <img src={Logotipo} alt='Logo FakeStore'></img>
                        <h1>FakeStore</h1>
                    </div>
                    <h3 className={styles.heroInfoSub}>No vas a creer todas nuestras ofertas</h3>
                    <p className={styles.heroInfoText}>100% real, no fake</p>
                    <button
                        onClick={ () => {
                            (myRef as React.RefObject<HTMLDivElement>)?.current.scrollIntoView( { behavior: 'smooth' } );
                        }} 
                        className={styles.heroInfoButton}
                    >COMPRA AHORA</button>
                </div>
                <div className={styles.heroImages}>
                    <img className={styles.productImage} src={Productos} alt='Imagen de productos varios'></img>
                    <img className={styles.productCostumer} src={Mujer} alt='Imagen de cliente alegre'></img>
                </div>
            </div>
        </main>
    </>)
})

export default Hero;