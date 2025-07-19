const token = sessionStorage.getItem("baron:token") || "";
export const submitProduct = async ({
  eImages,
  eamount,
  ebrand,
  ecategory,
  edescription,
  ediscount,
  ekeyword,
  ename,
}: {
  eImages: File[];
  ename: string;
  edescription: string;
  eamount: number;
  ecategory: string;
  ebrand: string;
  ekeyword: string[];
  ediscount: number;
}) => {
  let obj = {
    categories: ecategory,
    image: eImages,
    name: ename,
    description: edescription,
    price: eamount,
    brand: ebrand,
    keyword: ekeyword,
    discount: ediscount,
  };
  console.log(obj);
  try {
    const response = await fetch(
      "https://baronde.onrender.com/image/v1/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(obj),
      }
    );

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert("Product uploaded successfully!");
      localStorage.removeItem("baron:img");
    } else {
      alert(`Error: ${result.message || "Failed to upload product"}`);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload product. Please try again.");
  } finally {
    alert("Upload done!");
  }
};
