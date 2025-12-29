
import { NEW_ARRIVALS_LIST, OFFER_LIST, SUGGESTED_PROUDCT } from "@/assets/data"; // 引入数据文件
import {ProductList} from "@components/index";
import NewArrival, { type NewArrivalProps } from "@components/NewArrival";
import Offer from "@components/Offer";
import withSoldOut from "@/HOCs/withSoldOut";
import withBanner from "@/HOCs/withBanner";
import ImageHero from "@components/ImageHero";
import ProductHero from "@components/ProductHero";

const NewArrivalWithSoldOutCheck = withSoldOut((props: NewArrivalProps) => {
    return <NewArrival {...props} />
})
const NewArrivalWithBannerAndSoldOutCheck = withBanner(
    NewArrivalWithSoldOutCheck, 
    "已售罄！"
)

const OfferWithSoldOutCheck = withSoldOut(Offer)

const OfferWithBannerAndSoldOutCheck = withBanner(
    OfferWithSoldOutCheck, 
    "手慢无！"
)


export default function Home() {
    return (
        <>
            <ImageHero />
            <ProductHero 
            product={SUGGESTED_PROUDCT.product}
            imageUrl={SUGGESTED_PROUDCT.imageSrc}
             />
            <ProductList title="新品上架" total={NEW_ARRIVALS_LIST.length}>
                {NEW_ARRIVALS_LIST.map((product) => (
                    <NewArrivalWithBannerAndSoldOutCheck 
                    soldOut={false} 
                    key={product.title} 
                    {...product} />
                ))}
            </ProductList>
            <ProductList title="限时折扣" total={OFFER_LIST.length}>
                {OFFER_LIST.map((product) => (
                    <OfferWithBannerAndSoldOutCheck key={product.title} {...product} />
                ))}
            </ProductList>
        </>
    )
}