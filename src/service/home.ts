import request from '@/config/http';
export function getCarouselList() {
    return request({
        url: 'mock/10/carousel',
        method: 'get',
    });
}

