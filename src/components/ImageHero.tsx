import hero_small_image from '~img/hero_small.jpg';
import hero_image from '~img/hero.jpg';
import IconButton from './IconButton';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function ImageHero() {
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
            <div className='text-4xl md:text-6xl font-bold'>iPhone 14 Pro</div>
            <div className='mt-4 flex space-x-4'>
                <IconButton
                icon={<MdOutlineNavigateNext />}
                iconPosition='right'
                title="进一步了解"
                variant='primary'
                />
                <IconButton
                icon={<AiOutlineShoppingCart />}
                title="购买"
                variant='outline'
                />
            </div>
        </div>
    </div>
    )
}