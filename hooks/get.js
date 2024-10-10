import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../apis/me'; 
import { fetchDevices } from '../apis/device';
// Hook để fetch thông tin người dùng hiện tại
export const useMe = () => {
  return useQuery({
    queryKey: ['me'], // Key xác định unique query
    queryFn: fetchMe, // Sử dụng hàm fetchMe để lấy dữ liệu
    enabled: true, // Luôn kích hoạt query
  });
};
export const useDevices = () => {
  return useQuery({
    queryKey: ['devices'], // Key xác định unique query cho danh sách thiết bị
    queryFn: fetchDevices, // Sử dụng hàm fetchDevices để lấy dữ liệu
    enabled: true, // Luôn kích hoạt query
  });
};
