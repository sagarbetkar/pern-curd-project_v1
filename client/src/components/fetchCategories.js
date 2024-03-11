export const fetchCategories = async () => {
    const apiRes = await fetch(`http://https://pern-curd-project-v1.onrender.com/api/v1/getAll`);
    if (!apiRes.ok) {
    throw new Error(`Product fetch not ok`);
    }

    return await apiRes.json();
}