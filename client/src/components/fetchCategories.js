export const fetchCategories = async () => {
    const apiRes = await fetch(`http://localhost:2611/api/v1/getAll`);
    if (!apiRes.ok) {
    throw new Error(`Product fetch not ok`);
    }

    return await apiRes.json();
}