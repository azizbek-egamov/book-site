import { BookOpen, Tag, Users, Clock, Home, Settings, Search, Bell } from 'lucide-react';

export function formatPrice(price) {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'reading':
      return 'status-reading';
    case 'returned':
      return 'status-returned';
    case 'overdue':
      return 'status-overdue';
    default:
      return 'status-default';
  }
}

export function getCategoryIcon(iconName) {
  const icons = {
    BookOpen,
    Tag,
    Users,
    Clock,
    Home,
    Settings,
    Search,
    Bell
  };
  return icons[iconName] || BookOpen;
}
