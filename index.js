import "dotenv/config"
class ProductService {
    constructor(connectionString){
        this.connectionString = connectionString;
    }

    async getProducts() {
        try {
          const response = await fetch(`${this.connectionString}/products`);
          if (!response.ok) {
            throw new Error('Something wrong with network. Please check your internet connection!');
          }
          return await response.json();
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }

      async getProductById(id){
        try{
            const response = await fetch(`${this.connectionString}/products/${id}`);
            if (!response.ok) {
                throw new Error('Something wrong with network. Please check your internet connection!');
            }
            return await response.json();
        }
        catch(error){
            console.error('Error fetching product by id:', error);
        }
      }

      async createProduct(product) {
        try {
          const response = await fetch(`${this.connectionString}/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
          if (!response.ok) {
            throw new Error('Something wrong with network. Please check your internet connection!');
          }
          return await response.json();
        } catch (error) {
          console.error('Error creating product:', error);
        }
      }

      async updateProduct(id, product) {
        try {
          const response = await fetch(`${this.connectionString}/products/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
          if (!response.ok) {
             throw new Error('Something wrong with network. Please check your internet connection!');
          }
          return await response.json();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }

      async deleteProduct(id) {
        try {
          const response = await fetch(`${this.connectionString}/products/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Something wrong with network. Please check your internet connection!');
          }
          return await response.json();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
}

const productService = new ProductService(`http://localhost:${process.env.PORT}`);//! Я смотрел записи пар!

//productService.getProducts().then(res => console.table(res));

//productService.createProduct({ name: 'New Product', price: 100 });

//productService.deleteProduct("dd5e");

productService.updateProduct("5cfe", {name : "SUPER_PALKA", price: 536363552});

setImmediate(() =>{ //Нужно, чтобы данные в таблице в консоли были актуальные, а то без этого выходит получить только старую инфу
    productService.getProducts().then(res => console.table(res));
})
