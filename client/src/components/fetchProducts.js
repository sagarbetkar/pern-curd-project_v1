const fetchProducts = async (page = 1) => {
    const apiRes = await fetch(`http://https://pern-curd-project-v1.onrender.com/api/v1/getAllProducts?page=${page}`);

    if (!apiRes.ok) {
      throw new Error(`Product fetch not ok`);
    }
  
    return await apiRes.json();
  };
  
  export default fetchProducts;