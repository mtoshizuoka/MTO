export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  driverId: string | null;
  driverName: string | null;
  status: 'pending' | 'assigned' | 'completed';
  pickupTime: string;
  deliveryAddress: string;
  items: string[];
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  currentLocation: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Stats {
  totalOrders: number;
  completedOrders: number;
  activeDrivers: number;
  totalStores: number;
}
