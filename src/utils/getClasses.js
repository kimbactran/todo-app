export const getClasses = (classes) => classes.filter((item) => item !== '').join(' ').trim();
// filter lặp qua từng phần tử
// join nối chuỗi qua mảng rỗng
// trim loại bỏ các khoảng trắng dư thừa.