// src/types/product.types.ts

const ProductTypes = {
 TCreateProductReq: {} as { body: { name: string; price: number; category: string; stock: number } },
 TCreateProductRes: {} as { status: (arg0: number) => { json: (arg0: { message: string }) => void } },
 TFindProductReq: {} as { params: { id: string }; body?: { name: string; price: number; category: string; stock: number } },
 TFindProductRes: {} as { status: (arg0: number) => { json: (arg0: { message: string }) => void } },
};

module.exports = ProductTypes;
