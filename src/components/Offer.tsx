import styles from "./Offer.module.css";


export interface OfferProps {
  type: string;
  title: string;
  detail: string;
  image: string;
  soldOut?:boolean;
}

export default function Offer({type, title, detail,image }: OfferProps) {
    return (
        <div className={styles.container}>
            <img src={image} alt={type} className={styles.image} />
            <div className={styles.content}>
                <div className={styles.type}>{type}</div>
                <div className={styles.title}>{title}</div>
                <div className={styles.detail}>{detail}</div>
            </div>
        </div>
    );
}