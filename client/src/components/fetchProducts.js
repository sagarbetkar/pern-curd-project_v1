const fetchProducts = async (page = 1) => {
    const apiRes = await fetch(`http://localhost:2611/api/v1/getAllProducts?page=${page}`);

    if (!apiRes.ok) {
      throw new Error(`Product fetch not ok`);
    }
  
    return await apiRes.json();
  };
  
  export default fetchProducts;