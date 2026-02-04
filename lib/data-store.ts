import type { Order, Driver, Store, Stats } from './dispatch-types';

const STORAGE_KEYS = {
  orders: 'mto_orders',
  drivers: 'mto_drivers',
  stores: 'mto_stores',
  stats: 'mto_stats'
} as const;

const INITIAL_STORES: Store[] = [
  { id: '1', name: '綺薇', address: '東京都渋谷区1-1-1', phone: '03-1111-1111' },
  { id: '2', name: 'LAMELA', address: '東京都渋谷区2-2-2', phone: '03-2222-2222' },
  { id: '3', name: '春夏秋冬', address: '東京都渋谷区3-3-3', phone: '03-3333-3333' },
  { id: '4', name: 'blanc', address: '東京都渋谷区4-4-4', phone: '03-4444-4444' },
  { id: '5', name: '4s', address: '東京都渋谷区5-5-5', phone: '03-5555-5555' }
];

const INITIAL_DRIVERS: Driver[] = [
  { id: '1', name: '田中太郎', status: 'available', currentLocation: '渋谷駅前' },
  { id: '2', name: '佐藤花子', status: 'busy', currentLocation: '配送中' },
  { id: '3', name: '鈴木一郎', status: 'available', currentLocation: '新宿駅前' }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    storeId: '1',
    storeName: '綺薇',
    driverId: null,
    driverName: null,
    status: 'pending',
    pickupTime: '12:00',
    deliveryAddress: '東京都渋谷区道玄坂1-1-1',
    items: ['商品A', '商品B'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    storeId: '2',
    storeName: 'LAMELA',
    driverId: '2',
    driverName: '佐藤花子',
    status: 'assigned',
    pickupTime: '12:30',
    deliveryAddress: '東京都渋谷区宇田川町2-2-2',
    items: ['商品C'],
    createdAt: new Date().toISOString()
  }
];

const INITIAL_STATS: Stats = {
  totalOrders: 2,
  completedOrders: 0,
  activeDrivers: 2,
  totalStores: 5
};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to set ${key}:`, error);
  }
}

function safeParse<T>(data: string | null, fallback: T): T {
  if (!data) return fallback;
  try {
    const parsed = JSON.parse(data);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function initializeData(): void {
  if (typeof window === 'undefined') return;

  try {
    if (!safeGetItem(STORAGE_KEYS.stores)) {
      safeSetItem(STORAGE_KEYS.stores, JSON.stringify(INITIAL_STORES));
    }
    if (!safeGetItem(STORAGE_KEYS.drivers)) {
      safeSetItem(STORAGE_KEYS.drivers, JSON.stringify(INITIAL_DRIVERS));
    }
    if (!safeGetItem(STORAGE_KEYS.orders)) {
      safeSetItem(STORAGE_KEYS.orders, JSON.stringify(INITIAL_ORDERS));
    }
    if (!safeGetItem(STORAGE_KEYS.stats)) {
      safeSetItem(STORAGE_KEYS.stats, JSON.stringify(INITIAL_STATS));
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

export function getOrders(): Order[] {
  const data = safeGetItem(STORAGE_KEYS.orders);
  return safeParse(data, INITIAL_ORDERS);
}

export function getDrivers(): Driver[] {
  const data = safeGetItem(STORAGE_KEYS.drivers);
  return safeParse(data, INITIAL_DRIVERS);
}

export function getStores(): Store[] {
  const data = safeGetItem(STORAGE_KEYS.stores);
  return safeParse(data, INITIAL_STORES);
}

export function getStats(): Stats {
  const data = safeGetItem(STORAGE_KEYS.stats);
  return safeParse(data, INITIAL_STATS);
}

export function updateOrder(orderId: string, updates: Partial<Order>): void {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    safeSetItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }
}

export function updateDriver(driverId: string, updates: Partial<Driver>): void {
  const drivers = getDrivers();
  const index = drivers.findIndex(d => d.id === driverId);
  if (index !== -1) {
    drivers[index] = { ...drivers[index], ...updates };
    safeSetItem(STORAGE_KEYS.drivers, JSON.stringify(drivers));
  }
}

export function assignOrderToDriver(orderId: string, driverId: string): void {
  const orders = getOrders();
  const drivers = getDrivers();
  const order = orders.find(o => o.id === orderId);
  const driver = drivers.find(d => d.id === driverId);
  
  if (order && driver) {
    updateOrder(orderId, {
      driverId: driver.id,
      driverName: driver.name,
      status: 'assigned'
    });
    updateDriver(driverId, {
      status: 'busy'
    });
  }
}

export function completeOrder(orderId: string): void {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  
  if (order) {
    updateOrder(orderId, { status: 'completed' });
    
    if (order.driverId) {
      updateDriver(order.driverId, { status: 'available' });
    }
    
    const stats = getStats();
    stats.completedOrders += 1;
    safeSetItem(STORAGE_KEYS.stats, JSON.stringify(stats));
  }
}

export function getOrdersByStore(storeId: string): Order[] {
  return getOrders().filter(o => o.storeId === storeId);
}

export function getOrdersByDriver(driverId: string): Order[] {
  return getOrders().filter(o => o.driverId === driverId);
}
