import { useTranslation } from 'react-i18next';

export default function Footer() {
    const {t} = useTranslation();
    return (
        <footer className='text-center py-4 text-apple-text-light dark:text-apple-text-dark'>{t('footer.copyright')}</footer>
    )
}