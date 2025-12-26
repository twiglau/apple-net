
import styles from './withSoldOut'

function withSoldOut(WrappedComponent) {
    return ({ soldOut, ...props }) => {
        return soldOut ?(
            <div className={styles.grayOverlay}>
                <WrappedComponent {...props} />
            </div> 
        ) : (
            <WrappedComponent {...props} />
        )
    }
}

export default withSoldOut