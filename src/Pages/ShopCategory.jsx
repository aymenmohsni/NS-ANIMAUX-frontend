import React, { useContext, useState, useMemo, useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import Item from '../Components/Item/Item'

const subcategories = [
    'Alimentation', 'Friandises', 'Litière', 'Accessoires',
    'Hygiène & Soins', 'Jouets', 'Cages & Habitat', 'Colliers & Laisses',
    'Gamelles & Distributeurs', 'Transport', 'Santé', 'Autre'
];

const priceRanges = [
    { label: 'Tous les prix', min: 0, max: Infinity },
    { label: 'Moins de 10 DT', min: 0, max: 10 },
    { label: '10 - 30 DT', min: 10, max: 30 },
    { label: '30 - 60 DT', min: 30, max: 60 },
    { label: '60 - 100 DT', min: 60, max: 100 },
    { label: 'Plus de 100 DT', min: 100, max: Infinity },
];

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const [selectedSubs, setSelectedSubs] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Read ?sub= from URL on mount / category change
    useEffect(() => {
        const subParam = searchParams.get('sub');
        if (subParam) {
            setSelectedSubs([subParam]);
        } else {
            setSelectedSubs([]);
        }
    }, [searchParams, props.category]);

    // Products in this category
    const categoryProducts = all_product.filter(item => item.category === props.category);

    // Extract unique brands from this category
    const brands = useMemo(() => {
        const b = new Set();
        categoryProducts.forEach(p => { if (p.brand) b.add(p.brand); });
        return Array.from(b).sort();
    }, [categoryProducts]);

    // Extract which subcategories exist in this category
    const availableSubs = useMemo(() => {
        const s = new Set();
        categoryProducts.forEach(p => { if (p.subcategory) s.add(p.subcategory); });
        return subcategories.filter(sc => s.has(sc));
    }, [categoryProducts]);

    // Toggle subcategory
    const toggleSub = (sub) => {
        setSelectedSubs(prev =>
            prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
        );
    };

    // Filter & sort
    const filteredProducts = useMemo(() => {
        let result = categoryProducts;

        if (selectedSubs.length > 0) {
            result = result.filter(p => selectedSubs.includes(p.subcategory));
        }

        const range = priceRanges[selectedPrice];
        if (range) {
            result = result.filter(p => p.new_price >= range.min && p.new_price < range.max);
        }

        if (selectedBrand) {
            result = result.filter(p => p.brand === selectedBrand);
        }

        if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.new_price - b.new_price);
        else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.new_price - a.new_price);
        else if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === 'newest') result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));

        return result;
    }, [categoryProducts, selectedSubs, selectedPrice, selectedBrand, sortBy]);

    const hasActiveFilters = selectedSubs.length > 0 || selectedPrice !== 0 || selectedBrand !== '';

    const clearFilters = () => {
        setSelectedSubs([]);
        setSelectedPrice(0);
        setSelectedBrand('');
    };

    const categoryNames = { chat: 'Chat', chien: 'Chien', Poissons: 'Poissons', oiseaux: 'Oiseaux' };

    return (
        <div className='shop-category'>
            <div className="sc-header">
                <h1>{categoryNames[props.category] || props.category}</h1>
                <div className="sc-header-right">
                    <span className="sc-count">{filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}</span>
                    <select className="sc-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="default">Trier par</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                        <option value="name">Nom A-Z</option>
                        <option value="newest">Plus récent</option>
                    </select>
                    <button className="sc-filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>
                        Filtres
                    </button>
                </div>
            </div>

            <div className="sc-content">
                {/* Sidebar Filter */}
                <aside className={`sc-sidebar ${filtersOpen ? 'open' : ''}`}>
                    <div className="sc-sidebar-header">
                        <h3>Filtres</h3>
                        {hasActiveFilters && <button className="sc-clear-btn" onClick={clearFilters}>Réinitialiser</button>}
                    </div>

                    {/* Subcategory Filter */}
                    {availableSubs.length > 0 && (
                        <div className="filter-group">
                            <h4>Sous-catégorie</h4>
                            {availableSubs.map(sub => (
                                <label key={sub} className="filter-checkbox">
                                    <input type="checkbox" checked={selectedSubs.includes(sub)} onChange={() => toggleSub(sub)} />
                                    <span>{sub}</span>
                                </label>
                            ))}
                            {/* Show all subcategories if none exist yet in this category */}
                        </div>
                    )}
                    {availableSubs.length === 0 && (
                        <div className="filter-group">
                            <h4>Sous-catégorie</h4>
                            <p className="filter-empty">Aucune sous-catégorie définie pour cette catégorie</p>
                        </div>
                    )}

                    {/* Price Filter */}
                    <div className="filter-group">
                        <h4>Prix</h4>
                        {priceRanges.map((range, i) => (
                            <label key={i} className="filter-radio">
                                <input type="radio" name="price" checked={selectedPrice === i} onChange={() => setSelectedPrice(i)} />
                                <span>{range.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Brand Filter */}
                    {brands.length > 0 && (
                        <div className="filter-group">
                            <h4>Marque</h4>
                            <label className="filter-radio">
                                <input type="radio" name="brand" checked={selectedBrand === ''} onChange={() => setSelectedBrand('')} />
                                <span>Toutes les marques</span>
                            </label>
                            {brands.map(b => (
                                <label key={b} className="filter-radio">
                                    <input type="radio" name="brand" checked={selectedBrand === b} onChange={() => setSelectedBrand(b)} />
                                    <span>{b}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </aside>

                {/* Product Grid */}
                <div className="sc-products-area">
                    {hasActiveFilters && (
                        <div className="sc-active-filters">
                            {selectedSubs.map(s => (
                                <span key={s} className="filter-tag" onClick={() => toggleSub(s)}>{s} ×</span>
                            ))}
                            {selectedPrice !== 0 && (
                                <span className="filter-tag" onClick={() => setSelectedPrice(0)}>{priceRanges[selectedPrice].label} ×</span>
                            )}
                            {selectedBrand && (
                                <span className="filter-tag" onClick={() => setSelectedBrand('')}>{selectedBrand} ×</span>
                            )}
                        </div>
                    )}

                    {filteredProducts.length === 0 ? (
                        <div className="sc-no-results">
                            <p>Aucun produit trouvé avec ces filtres</p>
                            <button onClick={clearFilters}>Réinitialiser les filtres</button>
                        </div>
                    ) : (
                        <div className="sc-products-grid">
                            {filteredProducts.map((item, i) => (
                                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShopCategory
