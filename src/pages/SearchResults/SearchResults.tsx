import type { CartItem, Product } from "@/types/custom";
import { useSearchParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDebounce } from "@/helpers/useDebounce";
import SearchProductCard from "./SearchProductCard";
import { Button } from "@/components";
import { CartContext } from "@/contexts/shopping";

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const debouncedQuery = useDebounce(query, 500);

    const {addToCart} = useContext(CartContext);

    const page = Number(searchParams.get('page')) || 1;
    const handlePageChange = (newPage: number) => {
        setSearchParams({
            query: query || '',
            page: newPage.toString(),
        });
    };
    const [searchResults, setSearchResults] = useState<Product[]>([])


    const cartAction = (product: Product) => {
        const cartItem: CartItem = {
            productId: product.id,
            name: product.name,
            imageSrc: product.image,
            modelId: product.models[0]?.name || '',
            modelPrice: product.models[0]?.price || 0,
            memorySizeId: product.memorySizes[0]?.id || '',
            memorySize: product.memorySizes[0]?.name || '',
            memorySizePrice: product.memorySizes[0]?.price || 0,
            color: product.colors[0] || '',
            model: product.models[0]?.name || '',
            qty: 1,
        }
        addToCart(cartItem);
    }
    const handleAddToCart = useCallback(cartAction, []);

    const searchAction = async (signal: AbortSignal) => {
        try {
            const response = await fetch(
                `http://152.136.182.210:12231/api/products?keyword=${debouncedQuery}`,
                {
                    signal,
                }
            )
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        searchAction(controller.signal);
        return () => {
            controller.abort();
        }
    }, [debouncedQuery]);


    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto mb-12">
                <input 
                type="text"
                value={query || ''}
                onChange={(e) => setSearchParams({ query: e.target.value, page: page.toString() })}
                placeholder="请输入搜索关键词"
                className="w-full px-6 py-4 bg-apple-white dark:bg-apple-dark rounded-xl text-lg
                border border-apple-gray-300 dark:border-apple-gray-600
                focus:outline-none focus:ring-1 focus:ring-apple-blue dark:focus:ring-apple 
                transition-all
                "
                />
                <p>搜索关键词：{query}</p>
            </div>
            {/* 搜索结果 */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {searchResults.map((product) => (
                    <SearchProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center mt-8 gap-6">
                <h2 className="text-xl font-medium text-apple-text dark:text-apple-text-dark">
                    当前页 <span className="font-semibold">{page}</span>
                </h2>
                <Button title="上一页" onClick={() => handlePageChange(page -1)} />
                <Button title="下一页" onClick={() => handlePageChange(page +1)} />
            </div>
        </div>
    );
};

export default SearchResults;