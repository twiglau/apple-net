import hero_small_image from '~img/hero_small.jpg';
import hero_image from '~img/hero.jpg';
import IconButton from './IconButton';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useTranslation } from 'react-i18next';

export default function ImageHero() {
    const {t} = useTranslation();
    return (
    <div className="relative bg-black text-white mb-2">
        <img 
            src={hero_small_image} 
            className="w-full h-120 object-cover block md:hidden" 
        />
        <img 
            src={hero_image} 
            className='w-full h-120 object-cover hidden md:block'
        />
        <div className='absolute inset-4 flex flex-col p-2 items-center justify-end text-center md:justify-start'>
            <div className='text-4xl md:text-6xl font-bold'>
              {t(`home_page.image_hero.product_name`)}
            </div>
            <div className='mt-4 flex space-x-4'>
                <IconButton
                icon={<MdOutlineNavigateNext />}
                iconPosition='right'
                title={t(`home_page.image_hero.learn_more`)}
                variant='primary'
                />
                <IconButton
                icon={<AiOutlineShoppingCart />}
            title={t(`home_page.image_hero.buy`)}
                variant='outline'
                />
            </div>
        </div>
    </div>
    )
}