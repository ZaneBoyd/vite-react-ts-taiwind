import { ProductList } from '@/components/ProductList';
import { CartPanel } from '@/components/CartPanel';

export default function ShopPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      {/* 列表区 - 占据 7 份 */}
      <div className="lg:col-span-7">
        <ProductList />
      </div>
      {/* 购物车区 - 占据 3 份 */}
      <div className="lg:col-span-3">
        <CartPanel />
      </div>
    </div>
  );
}
